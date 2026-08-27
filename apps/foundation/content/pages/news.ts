import type { Cta, Hero, Section, Seo } from '../types'

export const NEWS_SEO: Seo = {
  title: 'Aktualności',
  description: 'Aktualności o projektach, partnerstwach i pracy Fundacji Zerya.',
}

export const NEWS_HERO: Hero = {
  label: 'Aktualności',
  title: 'Co nowego?',
  description: 'Najważniejsze informacje o wydarzeniach, projektach, partnerstwach i pracy zespołu.',
}

export const NEWS_ARCHIVE: Section = {
  label: 'Archiwum',
  title: 'Ostatnie wpisy',
}

export const NEWS_CTA: Cta = {
  title: 'Zobacz projekty stojące za aktualnościami',
  description: 'Najważniejsze informacje uzupełniamy o zakres realizacji, liczby i materiały dowodowe.',
  button: { label: 'Przejdź do projektów', to: '/projekty' },
}
