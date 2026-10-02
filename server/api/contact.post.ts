import type { H3Event } from 'h3'
import { z } from 'zod'

const MIN_FILL_MS = 3_000
const RATE_WINDOW_MS = 10 * 60_000
const RATE_MAX = 5

// Per-instance rate limit.
const hits = new Map<string, number[]>()

function rateLimited(ip: string) {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter(t => now - t < RATE_WINDOW_MS)
  recent.push(now)
  hits.set(ip, recent)
  return recent.length > RATE_MAX
}

async function verifyTurnstile(token: string, event: H3Event) {
  try {
    const result = await verifyTurnstileToken(token, event)
    if (!result.success)
      console.warn('[contact] Turnstile rejected', result['error-codes'])
    return result.success
  } catch (error) {
    console.error('[contact] Turnstile siteverify failed', error)
    return false
  }
}

const HTML_SPECIAL_CHARACTERS = /[&<>"']/g

function escapeHtml(value: string) {
  return value.replace(HTML_SPECIAL_CHARACTERS, c => `&#${c.charCodeAt(0)};`)
}

export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, contactSchema.safeParse)
  if (!result.success) {
    throw createError({
      statusCode: 422,
      statusMessage: 'Invalid form data',
      data: { fields: z.flattenError(result.error).fieldErrors },
    })
  }
  const form = result.data

  if (form.website || Date.now() - form.startedAt < MIN_FILL_MS) {
    return { ok: true }
  }

  const ip = getRequestIP(event, { xForwardedFor: true }) ?? 'unknown'
  if (rateLimited(ip)) {
    throw createError({ statusCode: 429, statusMessage: 'Too many requests' })
  }

  const { resendApiKey, turnstile, contact } = useRuntimeConfig(event)
  if (!resendApiKey || !turnstile.secretKey) {
    throw createError({ statusCode: 500, statusMessage: 'Contact form is not configured' })
  }

  if (!await verifyTurnstile(form.turnstileToken, event)) {
    throw createError({ statusCode: 403, statusMessage: 'Captcha verification failed' })
  }

  const to = contact.to.replace('{tag}', form.source)
  const meta = {
    'Źródło': form.source,
    'Strona': getHeader(event, 'referer') ?? '-',
    'Język': getHeader(event, 'accept-language')?.split(',')[0] ?? '-',
    'User-Agent': getHeader(event, 'user-agent') ?? '-',
    'Wysłano': new Date().toISOString(),
  }

  const text = [
    `Od: ${form.email}`,
    '',
    form.message,
    '',
    '---',
    ...Object.entries(meta).map(([k, v]) => `${k}: ${v}`),
  ].join('\n')

  const html = `
    <div style="font-family:system-ui,sans-serif;font-size:15px;line-height:1.6;color:#05080a">
      <p style="margin:0 0 16px"><a href="mailto:${escapeHtml(form.email)}">${escapeHtml(form.email)}</a></p>
      <p style="margin:0 0 24px;white-space:pre-wrap">${escapeHtml(form.message)}</p>
      <table style="border-top:1px solid #ddd;padding-top:12px;font-size:12px;color:#666">
        ${Object.entries(meta).map(([k, v]) => `<tr><td style="padding-right:12px">${k}</td><td>${escapeHtml(v)}</td></tr>`).join('')}
      </table>
    </div>`

  try {
    await $fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${resendApiKey}` },
      body: {
        from: contact.from,
        to: [to],
        reply_to: form.email,
        subject: `[${form.source}] ${form.email}`,
        text,
        html,
        tags: [{ name: 'source', value: form.source }],
      },
    })
  } catch (error) {
    console.error('[contact] Resend failed', error)
    throw createError({ statusCode: 502, statusMessage: 'Could not send message' })
  }

  return { ok: true }
})
