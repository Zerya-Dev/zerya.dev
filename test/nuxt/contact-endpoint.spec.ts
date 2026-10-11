import type { Server } from 'node:http'
import { createServer } from 'node:http'
import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import { createApp, toNodeListener } from 'h3'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

interface ContactConfig {
  resendApiKey: string
  turnstile: { secretKey: string }
  contact: { to: string, from: string, allowedHostnames: string[], trustedProxyIPs: string[] }
}

// The endpoint reads only its own keys; the Nuxt test app still needs the real config.
const runtime = vi.hoisted(() => ({ config: undefined as ContactConfig | undefined }))
mockNuxtImport('useRuntimeConfig', original => () => runtime.config ?? original())

const form = {
  email: 'hello@example.com',
  message: 'A message long enough to send.',
  source: 'hero',
  url: '',
  turnstileToken: 'valid-test-token',
}

describe('contact endpoint', () => {
  let server: Server
  let url: string
  let sendMail: ReturnType<typeof vi.fn>
  let verify: ReturnType<typeof vi.fn>
  let config: ContactConfig

  beforeEach(async () => {
    vi.resetModules()
    config = {
      resendApiKey: 'test-api-key',
      turnstile: { secretKey: 'test-secret' },
      contact: {
        to: 'contact+{tag}@example.com',
        from: 'Contact <contact@example.com>',
        allowedHostnames: ['zerya.dev', 'www.zerya.dev'],
        trustedProxyIPs: [],
      },
    }
    sendMail = vi.fn().mockResolvedValue({ id: 'test-id' })
    verify = vi.fn().mockResolvedValue({ success: true, action: 'contact', hostname: 'zerya.dev' })
    runtime.config = config
    vi.stubGlobal('verifyTurnstileToken', verify)
    vi.stubGlobal('$fetch', sendMail)
    vi.spyOn(console, 'error').mockImplementation(() => {})
    const { default: handler } = await import('../../server/api/contact.post')
    const app = createApp().use('/api/contact', handler)
    server = createServer(toNodeListener(app))
    await new Promise<void>(resolve => server.listen(0, '127.0.0.1', resolve))
    const address = server.address()
    if (!address || typeof address === 'string')
      throw new Error('Missing test server address')
    url = `http://127.0.0.1:${address.port}/api/contact`
  })

  afterEach(async () => {
    runtime.config = undefined
    server.closeAllConnections()
    await new Promise<void>((resolve, reject) => server.close(error => error ? reject(error) : resolve()))
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
  })

  function post(payload: unknown = form, headers: Record<string, string> = {}) {
    return fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json', ...headers },
      body: JSON.stringify(payload),
    })
  }

  it('sends a normalized message to the correct tagged address', async () => {
    const response = await post({ ...form, email: '  hello@example.com ' })
    expect(response.status).toBe(200)
    expect(await response.json()).toEqual({ ok: true })
    expect(verify.mock.calls[0]?.[2]).toBeInstanceOf(AbortSignal)
    expect(sendMail).toHaveBeenCalledExactlyOnceWith('https://api.resend.com/emails', expect.objectContaining({
      timeout: 10_000,
      retry: 0,
      body: expect.objectContaining({
        to: ['contact+hero@example.com'],
        reply_to: 'hello@example.com',
        text: expect.stringContaining(form.message),
      }),
    }))
  })

  it('rejects malformed form data before calling external services', async () => {
    const response = await post({ ...form, email: 'invalid', source: 'custom-tag' })
    expect(response.status).toBe(400)
    expect(verify).not.toHaveBeenCalled()
    expect(sendMail).not.toHaveBeenCalled()
  })

  it('silently discards honeypot submissions without external calls', async () => {
    const response = await post({ ...form, url: 'spam.example' })
    expect(response.status).toBe(200)
    expect(verify).not.toHaveBeenCalled()
    expect(sendMail).not.toHaveBeenCalled()
  })

  it('refuses to accept messages without mail configuration', async () => {
    config.resendApiKey = ''
    const response = await post()
    expect(response.status).toBe(500)
    expect(sendMail).not.toHaveBeenCalled()
  })

  it.each([
    { 'success': false, 'error-codes': ['invalid-input-response'] },
    { success: true, action: 'other-action', hostname: 'zerya.dev' },
    { success: true, action: 'contact', hostname: 'other.example' },
  ])('rejects invalid captcha responses: %j', async (result) => {
    verify.mockResolvedValue(result)
    expect((await post()).status).toBe(403)
    expect(sendMail).not.toHaveBeenCalled()
  })

  it.each(['internal-error', 'invalid-input-secret', 'missing-input-secret'])('reports captcha service failure %s separately', async (code) => {
    verify.mockResolvedValue({ 'success': false, 'error-codes': [code] })
    expect((await post()).status).toBe(503)
    expect(sendMail).not.toHaveBeenCalled()
  })

  it('reports a captcha network timeout as service unavailable', async () => {
    verify.mockRejectedValue(new Error('timeout'))
    expect((await post()).status).toBe(503)
    expect(sendMail).not.toHaveBeenCalled()
  })

  it('reports a mail delivery failure instead of success', async () => {
    sendMail.mockRejectedValue(new Error('Mail unavailable'))
    expect((await post()).status).toBe(502)
  })

  it('does not let forwarded headers bypass the connection rate limit', async () => {
    for (let i = 0; i < 5; i++)
      expect((await post(form, { 'x-forwarded-for': `192.0.2.${i}` })).status).toBe(200)
    expect((await post(form, { 'x-forwarded-for': '203.0.113.1' })).status).toBe(429)
    expect((await post(form, { 'x-forwarded-for': '203.0.113.2' })).status).toBe(429)
    expect(sendMail).toHaveBeenCalledTimes(5)
  })

  it('limits forwarded clients separately only when the connection proxy is allowlisted', async () => {
    config.contact.trustedProxyIPs = ['127.0.0.1']
    for (let i = 0; i < 6; i++)
      expect((await post(form, { 'x-forwarded-for': `192.0.2.${i}, 10.0.0.1` })).status).toBe(200)
    for (let i = 0; i < 4; i++)
      expect((await post(form, { 'x-forwarded-for': '192.0.2.0' })).status).toBe(200)
    expect((await post(form, { 'x-forwarded-for': '192.0.2.0' })).status).toBe(429)
    expect((await post(form, { 'x-forwarded-for': '192.0.2.1' })).status).toBe(200)
  })

  it('falls back to the connection IP for invalid forwarded addresses even with a trusted proxy', async () => {
    config.contact.trustedProxyIPs = ['127.0.0.1']
    for (let i = 0; i < 5; i++)
      expect((await post(form, { 'x-forwarded-for': `invalid-${i}` })).status).toBe(200)
    expect((await post(form, { 'x-forwarded-for': 'another-invalid-address' })).status).toBe(429)
  })

  it('accepts requests again after the rate window expires', async () => {
    let now = 1_000_000
    vi.spyOn(Date, 'now').mockImplementation(() => now)
    for (let i = 0; i < 5; i++)
      expect((await post()).status).toBe(200)
    expect((await post()).status).toBe(429)
    now += 10 * 60_000
    expect((await post()).status).toBe(200)
  })

  it('rejects malformed JSON', async () => {
    const response = await fetch(url, { method: 'POST', headers: { 'content-type': 'application/json' }, body: '{' })
    expect(response.status).toBe(400)
  })
})

describe('contact rate limiter capacity', () => {
  it('bounds clients without evicting active limits and reclaims expired entries', async () => {
    vi.resetModules()
    let now = 1_000_000
    vi.spyOn(Date, 'now').mockImplementation(() => now)
    try {
      const { contactRateLimited } = await import('../../server/utils/contact-rate-limit')
      for (let i = 0; i < 1000; i++)
        expect(contactRateLimited(`client-${i}`)).toBe(false)
      expect(contactRateLimited('overflow')).toBe(true)
      for (let i = 0; i < 4; i++)
        expect(contactRateLimited('client-0')).toBe(false)
      expect(contactRateLimited('client-0')).toBe(true)
      for (let i = 0; i < 100; i++)
        expect(contactRateLimited('client-0')).toBe(true)
      now += 10 * 60_000
      expect(contactRateLimited('overflow')).toBe(false)
    } finally {
      vi.restoreAllMocks()
    }
  })
})
