import type { Hero, Seo } from '../types'

export interface FoundationDocument {
  /** Anchor on the documents page, used by footer links. */
  id: string
  title: string
  description: string
  file: string
  pages: number
}

export const DOCUMENTS_SEO: Seo = {
  title: 'Dokumenty',
  description: 'Statut Fundacji Zerya, standardy ochrony małoletnich i polityka prywatności.',
}

export const DOCUMENTS_HERO: Hero = {
  label: 'Dokumenty',
  title: 'Dokumenty fundacji',
  description: 'Najważniejsze dokumenty opisujące, jak działa Fundacja Zerya.',
}

export const DOCUMENTS: FoundationDocument[] = [
  {
    id: 'statut',
    title: 'Statut Fundacji Zerya',
    description: 'Cele fundacji, sposób ich realizacji, organy fundacji i zasady ich działania.',
    file: '/docs/statut-fundacji-zerya.pdf',
    pages: 5,
  },
  {
    id: 'standardy-ochrony-maloletnich',
    title: 'Standardy ochrony małoletnich',
    description: 'Większość uczestników naszych wydarzeń jest niepełnoletnia. Dokument opisuje zasady pracy z małoletnimi, procedury reagowania i załączniki.',
    file: '/docs/standardy-ochrony-maloletnich.pdf',
    pages: 36,
  },
  {
    id: 'polityka-prywatnosci',
    title: 'Polityka prywatności',
    description: 'Jak przetwarzamy dane osób, które kontaktują się z fundacją: mailowo, telefonicznie i przez media społecznościowe.',
    file: '/docs/polityka-prywatnosci.pdf',
    pages: 2,
  },
]
