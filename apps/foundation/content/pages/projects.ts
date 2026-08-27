import type { Cta, Hero, Section, Seo } from '../types'

export const PROJECTS_SEO: Seo = {
  title: 'Projekty',
  description: 'Realizacje Fundacji Zerya: zakres odpowiedzialności, wyniki, partnerzy i materiały dowodowe.',
}

export const PROJECTS_HERO: Hero = {
  label: 'Projekty',
  title: 'Nasze inicjatywy',
  description: 'Każdy projekt odpowiada na trzy pytania: co zrobiliśmy, dla kogo i z jakim efektem.',
}

export const PROJECTS_ARCHIVE: Section = {
  label: 'Pozostałe działania',
  title: 'Projekty i formaty edukacyjne',
}

export const PROJECTS_CTA: Cta = {
  title: 'Porozmawiajmy o wspólnej realizacji',
  description: 'Możemy połączyć cel edukacyjny, doświadczenie organizacyjne i zasoby partnera w jeden konkretny projekt.',
  button: { label: 'Kontakt', to: '/kontakt' },
}

export const PROJECTS_DETAIL_CTA: Cta = {
  title: 'Zobacz pozostałe realizacje',
  description: 'Każdy projekt pokazujemy przez zakres odpowiedzialności, wyniki i materiały dowodowe.',
  button: { label: 'Wszystkie projekty', to: '/projekty' },
}
