import { isIP } from 'node:net'
import { createError, defineEventHandler, getHeader, getRequestIP, readValidatedBody } from 'h3'
import { contactSchema } from '../../shared/utils/contact'
import { contactRateLimited } from '../utils/contact-rate-limit'

const UPSTREAM_TIMEOUT_MS = 10_000
const CAPTCHA_SERVICE_ERRORS = ['internal-error', 'missing-input-secret', 'invalid-input-secret']

export default defineEventHandler(async (event) => {
  const { resendApiKey, turnstile, contact } = useRuntimeConfig(event)
  if (!resendApiKey || !turnstile.secretKey) {
    throw createError({ statusCode: 500, statusMessage: 'Contact form is not configured' })
  }

  const form = await readValidatedBody(event, contactSchema.parse)
  if (form.url) {
    return { ok: true }
  }

  // Only an explicitly trusted proxy that overwrites X-Forwarded-For may supply the client IP.
  const connectionIP = getRequestIP(event) ?? 'unknown'
  const forwardedIP = getRequestIP(event, { xForwardedFor: contact.trustedProxyIPs.includes(connectionIP) })
  if (contactRateLimited(forwardedIP && isIP(forwardedIP) ? forwardedIP : connectionIP)) {
    throw createError({ statusCode: 429, statusMessage: 'Too many requests' })
  }

  let captcha
  try {
    captcha = await verifyTurnstileToken(form.turnstileToken, event, AbortSignal.timeout(UPSTREAM_TIMEOUT_MS))
  } catch (error) {
    console.error('[contact] Turnstile siteverify failed', error)
  }
  if (!captcha || captcha['error-codes']?.some(code => CAPTCHA_SERVICE_ERRORS.includes(code))) {
    throw createError({ statusCode: 503, statusMessage: 'Captcha service unavailable' })
  }
  const hostnames = import.meta.dev ? [...contact.allowedHostnames, 'localhost', '127.0.0.1', 'dummy-key-pass'] : contact.allowedHostnames
  // Cloudflare test keys return no action. Accept that only in development.
  const validAction = captcha.action === 'contact' || (import.meta.dev && captcha.hostname === 'dummy-key-pass')
  if (!captcha.success || !validAction || !hostnames.includes(captcha.hostname)) {
    throw createError({ statusCode: 403, statusMessage: 'Captcha verification failed' })
  }

  const text = [
    `Od: ${form.email}`,
    '',
    form.message,
    '',
    '---',
    `Źródło: ${form.source}`,
    `Strona: ${getHeader(event, 'referer') ?? '-'}`,
    `Język: ${getHeader(event, 'accept-language')?.split(',')[0] ?? '-'}`,
    `User-Agent: ${getHeader(event, 'user-agent') ?? '-'}`,
    `Wysłano: ${new Date().toISOString()}`,
  ].join('\n')

  try {
    await $fetch('https://api.resend.com/emails', {
      method: 'POST',
      timeout: UPSTREAM_TIMEOUT_MS,
      retry: 0,
      headers: { Authorization: `Bearer ${resendApiKey}` },
      body: {
        from: contact.from,
        to: [contact.to.replace('{tag}', form.source)],
        reply_to: form.email,
        subject: `[${form.source}] ${form.email}`,
        text,
        tags: [{ name: 'source', value: form.source }],
      },
    })
  } catch (error) {
    console.error('[contact] Resend failed', error)
    throw createError({ statusCode: 502, statusMessage: 'Could not send message' })
  }

  return { ok: true }
})
