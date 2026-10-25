import { z } from 'zod'

export const contactSchema = z.object({
  email: z.string().trim().max(254).pipe(z.email('Podaj poprawny adres e-mail.')),
  message: z.string().trim().min(10, 'Napisz nam chociaż jedno zdanie.').max(5000),
  source: z.enum(['website', 'hero', 'cases', 'footer']).default('website'),
  // Honeypot: hidden from people, filled in by naive bots
  url: z.string().max(254).optional(),
  turnstileToken: z.string().min(1).max(2048),
})

export const contactFormSchema = contactSchema.pick({ email: true, message: true })

export type ContactForm = z.output<typeof contactFormSchema>
export type ContactSource = z.output<typeof contactSchema>['source']
