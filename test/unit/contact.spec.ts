import { describe, expect, it } from 'vitest'
import { contactFormSchema, contactSchema } from '../../shared/utils/contact'

const validForm = {
  email: 'hello@example.com',
  message: 'A message long enough to send.',
  source: 'website',
  website: '',
  startedAt: 1,
  turnstileToken: 'valid-test-token',
}

describe('contact form validation', () => {
  it('accepts a valid message and normalizes whitespace', () => {
    const result = contactSchema.safeParse({ ...validForm, message: '  A message long enough to send.  ' })
    expect(result.success).toBe(true)
    if (result.success)
      expect(result.data.message).toBe('A message long enough to send.')
  })

  it.each([
    { email: 'invalid' },
    { message: 'short' },
    { website: 'spam.example' },
    { source: '../admin' },
    { startedAt: -1 },
    { turnstileToken: '' },
  ])('rejects invalid input: %j', (change) => {
    expect(contactSchema.safeParse({ ...validForm, ...change }).success).toBe(false)
  })
})

describe('contact form schema', () => {
  it('validates visible fields before a captcha token is available', () => {
    expect(contactFormSchema.parse({
      email: validForm.email,
      message: `  ${validForm.message}  `,
      website: '',
    })).toEqual({ email: validForm.email, message: validForm.message, website: '' })
  })

  it.each([{ email: 'invalid' }, { message: 'short' }, { website: 'spam.example' }])(
    'shares server validation constraints: %j',
    change => expect(contactFormSchema.safeParse({ ...validForm, ...change }).success).toBe(false),
  )
})
