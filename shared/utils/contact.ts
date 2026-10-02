import { z } from 'zod'

export const contactSchema = z.object({
  email: z.email('Podaj poprawny adres e-mail.').trim().max(254),
  message: z.string().trim().min(10, 'Napisz nam chociaż jedno zdanie.').max(5000),
  source: z.string().regex(/^[a-z0-9-]{1,32}$/).default('website'),
  website: z.string().max(0).optional(),
  startedAt: z.number().int().positive(),
  turnstileToken: z.string().min(1).max(2048),
})

export const contactFormSchema = contactSchema.pick({ email: true, message: true, website: true })

export type ContactForm = z.output<typeof contactFormSchema>
export type ContactPayload = z.input<typeof contactSchema>
