import type { Link } from './types'

export interface SocialLink {
  label: string
  href: string
}

export const FEATURED_LINK: Link = {
  label: 'Hack4Krak',
  to: 'https://hack4krak.pl',
  external: true,
}

export const SOCIAL_LINKS: SocialLink[] = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/zerya-foundation/' },
  { label: 'GitHub', href: 'https://github.com/Zerya-Dev' },
]

export const FOOTER = {
  description: 'Edukacja przez praktykę, rywalizację i współpracę.',
  organization: 'Fundacja Zerya · Kraków, Polska · KRS 0001257372 · NIP 9452333696 · REGON 54535439700000',
  legalLinks: [
    { label: 'Statut', to: '/statut' },
    { label: 'Polityka prywatności', to: '/polityka-prywatnosci' },
  ] satisfies Link[],
}
