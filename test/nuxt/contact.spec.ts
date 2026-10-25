import { describe, expect, it } from 'vitest'
import { contactFormSchema, contactSchema } from '../../shared/utils/contact'

const validForm = {
  email: 'hello@example.com',
  message: 'A message long enough to send.',
  source: 'website',
  url: '',
  turnstileToken: 'valid-test-token',
}

describe('contact form validation', () => {
  it('accepts a valid message and normalizes whitespace', () => {
    const result = contactSchema.safeParse({ ...validForm, email: '  hello@example.com  ', message: '  A message long enough to send.  ' })
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.message).toBe('A message long enough to send.')
      expect(result.data.email).toBe('hello@example.com')
    }
  })

  it.each([
    { email: 'invalid' },
    { message: 'short' },
    { url: 'x'.repeat(255) },
    { source: '../admin' },
    { source: 'unrecognized-source' },
    { turnstileToken: '' },
  ])('rejects invalid input: %j', (change) => {
    expect(contactSchema.safeParse({ ...validForm, ...change }).success).toBe(false)
  })

  it('allows the server to silently handle a filled honeypot', () => {
    expect(contactSchema.parse({ ...validForm, url: 'spam.example' }).url).toBe('spam.example')
  })
})

describe('contact form schema', () => {
  it('validates visible fields before a captcha token is available', () => {
    expect(contactFormSchema.parse({
      email: validForm.email,
      message: `  ${validForm.message}  `,
    })).toEqual({ email: validForm.email, message: validForm.message })
  })

  it.each([{ email: 'invalid' }, { message: 'short' }])(
    'shares server validation constraints: %j',
    change => expect(contactFormSchema.safeParse({ ...validForm, ...change }).success).toBe(false),
  )
})
