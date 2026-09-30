import { describe, expect, it } from 'vitest'
import { contactSchema } from '../../shared/utils/contact'

const validForm = {
  email: 'hello@example.com',
  message: 'A message long enough to send.',
  source: 'website',
  website: '',
  startedAt: 1,
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
  ])('rejects invalid input: %j', (change) => {
    expect(contactSchema.safeParse({ ...validForm, ...change }).success).toBe(false)
  })
})
