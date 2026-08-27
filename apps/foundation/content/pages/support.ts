import type { Hero, Link, Seo } from '../types'

export interface SupportPath {
  title: string
  description: string
  icon: string
}

export const SUPPORT_SEO: Seo = {
  title: 'Wsparcie',
  description: 'Sposoby długotrwałego wsparcia i darowizny dla Fundacji Zerya.',
}

export const SUPPORT_HERO: Hero = {
  label: 'Wsparcie',
  title: 'Jak nas wesprzeć',
  description: 'Wybierz ścieżkę, która odpowiada Ci najbardziej. Każdą współpracę łączymy z konkretnym celem i przejrzystym zakresem.',
}

export const SUPPORT_LONG_TERM_PATH: SupportPath = {
  title: 'Długotrwałe wsparcie',
  description: 'Partnerstwo, sponsoring, wsparcie rzeczowe lub patronat.',
  icon: 'i-lucide-building-2',
}

export const SUPPORT_DONATION_PATH: SupportPath = {
  title: 'Darowizna',
  description: 'Darowizna jednorazowa lub regularne wsparcie działań.',
  icon: 'i-lucide-heart-handshake',
}

export const SUPPORT_LONG_TERM = {
  label: 'Długotrwałe wsparcie',
  title: 'Współpraca z jasnym celem',
  description: 'Najpierw ustalamy efekt dla uczestników, następnie zakres partnerstwa, odpowiedzialności i sposób pokazania wkładu partnera.',
  button: { label: 'Porozmawiajmy', to: '/kontakt' } satisfies Link,
  optionsTitle: 'Możliwe formy współpracy',
  options: [
    'partnerstwo programowe lub technologiczne',
    'sponsoring konkretnego wydarzenia',
    'wsparcie rzeczowe i udostępnienie przestrzeni',
    'patronat oraz wsparcie komunikacyjne',
  ],
}

export const SUPPORT_DONATION = {
  label: 'Darowizna',
  title: 'Regularnie lub jednorazowo',
  description: 'Każde wsparcie pomaga rozwijać program, przygotować bezpieczne wydarzenie i zmniejszać bariery udziału.',
  frequencyTitle: 'Wybierz częstotliwość',
  onceLabel: 'Jednorazowo',
  recurringLabel: 'Cyklicznie',
  notice: 'Moduł płatności i dane do przelewu zostaną podłączone po zatwierdzeniu formalnych danych fundacji.',
  button: { label: 'Wesprzyj', to: '/kontakt' } satisfies Link,
}

export const SUPPORT_AREAS: SupportPath[] = [
  {
    title: 'Program',
    description: 'Zadania, mentoring i materiały edukacyjne.',
    icon: 'i-lucide-blocks',
  },
  {
    title: 'Logistyka',
    description: 'Przestrzeń, organizacja, sprzęt i bezpieczeństwo.',
    icon: 'i-lucide-map-pin',
  },
  {
    title: 'Dostępność',
    description: 'Zmniejszanie barier udziału w wydarzeniach.',
    icon: 'i-lucide-accessibility',
  },
]
