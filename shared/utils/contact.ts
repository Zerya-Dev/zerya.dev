import { z } from 'zod'

export const contactSchema = z.object({
  email: z.email('Podaj poprawny adres e-mail.').trim().max(254),
  message: z.string().trim().min(10, 'Napisz nam chociaż jedno zdanie.').max(5000),
  // Where the form was opened from; becomes the plus-address: contact+<source>@zerya.dev.
  source: z.string().regex(/^[a-z0-9-]{1,32}$/).default('website'),
  // Anti-spam: honeypot must stay empty, `startedAt` is when the form was opened.
  website: z.string().max(0).optional(),
  startedAt: z.number().int().positive(),
})

export type ContactPayload = z.input<typeof contactSchema>
