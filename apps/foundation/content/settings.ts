import type { Link } from './types'

export interface SocialLink {
  label: string
  href: string
  icon: string
}

export const FEATURED_LINK: Link = {
  label: 'Hack4Krak',
  to: 'https://hack4krak.pl',
  external: true,
}

export const SOCIAL_LINKS: SocialLink[] = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/zerya-foundation/', icon: 'i-simple-icons-linkedin' },
  { label: 'Instagram', href: 'https://www.instagram.com/fundacja.zerya/', icon: 'i-simple-icons-instagram' },
  { label: 'Facebook', href: 'https://www.facebook.com/people/Fundacja-Zerya/61573226541589/', icon: 'i-simple-icons-facebook' },
  { label: 'Tiktok', href: 'https://www.tiktok.com/@fundacja.zerya', icon: 'i-simple-icons-tiktok' },
  { label: 'Discord', href: 'https://discord.gg/ASPqckzEd8', icon: 'i-simple-icons-discord' },
]

export const FOOTER = {
  description: 'Społeczność, która rozwija się razem. Od młodych, dla młodych.',
  organization: 'Fundacja Zerya · Zerya Foundation · KRS 0001257372 · NIP 9452333696 · REGON 545354397',
  legalLinks: [
    { label: 'Statut', to: '/dokumenty#statut' },
    { label: 'Standardy ochrony małoletnich', to: '/dokumenty#standardy-ochrony-maloletnich' },
    { label: 'Polityka prywatności', to: '/dokumenty#polityka-prywatnosci' },
  ] satisfies Link[],
  cityLinks: {
    logo: { href: 'https://www.krakow.pl/', src: '/img/content/partners/krakow.svg', alt: 'Kraków.pl — Miejska Platforma Internetowa Magiczny Kraków' },
    links: [
      { label: 'ngo.krakow.pl', to: 'https://ngo.krakow.pl/' },
      { label: 'dlabiznesu.krakow.pl', to: 'https://www.dlabiznesu.krakow.pl/' },
    ] satisfies Link[],
  },
}
