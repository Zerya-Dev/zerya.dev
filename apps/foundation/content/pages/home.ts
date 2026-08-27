import type { Image, Link, Metric, Section, Seo } from '../types'

export interface MissionItem {
  number: string
  title: string
  description: string
  proof: string
  link: Link
}

export const HOME_SEO: Seo = {
  title: 'Edukacja przez rywalizację',
  description: 'Organizujemy ambitne wydarzenia edukacyjne, od hackathonów po CTF-y, w których wiedzę zdobywa się przede wszystkim w praktyce.',
  ogTitle: 'Fundacja Zerya — edukacja przez rywalizację',
  ogDescription: 'Praktyka, rywalizacja i społeczność. Poznaj projekty Fundacji Zerya.',
}

export const HOME_HERO = {
  title: 'Edukacja przez',
  emphasis: 'rywalizację',
  description: 'Organizujemy wydarzenia, które zamieniają naukę w realne wyzwanie — od hackathonów po CTF-y, gdzie wiedzę zdobywa się przede wszystkim w praktyce.',
  slides: [
    {
      alt: 'Prelekcja na wydarzeniu fundacji',
      caption: 'Prelekcja na wydarzeniu fundacji',
      src: '/img/content/landing/prelekcja-na-wydarzeniu-fundacji.webp',
      tone: 'mint',
    },
    {
      alt: 'Zespół w trakcie pracy podczas wydarzenia',
      caption: 'Zespół w trakcie pracy podczas wydarzenia',
      src: '/img/content/landing/zespol-w-trakcie-pracy-podczas-wydarzenia.webp',
      tone: 'green',
    },
    {
      alt: 'Uczestnicy w trakcie pracy na wydarzeniu',
      caption: 'Uczestnicy w trakcie pracy na wydarzeniu',
      src: '/img/content/landing/uczestnicy-w-trakcie-pracy.webp',
      tone: 'dark',
    },
  ] satisfies Image[],
  links: [
    { label: 'Zobacz projekty', to: '/projekty' },
    { label: 'Poznaj fundację', to: '/o-nas' },
  ] satisfies [Link, Link],
  stats: [
    { value: '300+', label: 'uczestników wydarzeń' },
    { value: '30 h', label: 'flagowego wydarzenia' },
    { value: '30+', label: 'wolontariuszy' },
  ] satisfies Metric[],
}

export const HOME_MISSION = {
  label: 'Nasza misja',
  title: 'Nasza misja i jak ją realizujemy',
  items: [
    {
      number: '01',
      title: 'Praktyka',
      description: 'Uczestnicy rozwiązują prawdziwe problemy zamiast tylko słuchać o teorii.',
      proof: '30 h wydarzenia',
      link: { label: 'format Hack4Krak', to: 'https://hack4krak.pl', external: true },
    },
    {
      number: '02',
      title: 'Rywalizacja',
      description: 'Ranking i ograniczony czas motywują do eksperymentowania i szybkiej nauki.',
      proof: '300+ uczestników',
      link: { label: 'zobacz nasze projekty', to: '/projekty' },
    },
    {
      number: '03',
      title: 'Społeczność',
      description: 'Zespoły, wolontariusz i partnerzy tworzą środowisko, w którym można uczyć się od innych.',
      proof: '30+ wolontariuszy',
      link: { label: 'nasz zespół', to: '/o-nas' },
    },
  ] satisfies MissionItem[],
}

export const HOME_PARTNERS: Section = {
  label: 'Partnerzy',
  title: 'Partnerzy naszych wydarzeń',
  description: 'Organizacje, które pomagają nam tworzyć ambitne i bezpieczne doświadczenia edukacyjne.',
}

export const HOME_TEAM = {
  label: 'Zespół',
  title: 'Nasz zespół',
  link: { label: 'Poznaj cały zespół', to: '/o-nas#zespol' } satisfies Link,
}

export const HOME_CONTACT = {
  title: 'Porozmawiajmy o wspólnym projekcie',
  description: 'Masz pomysł na wydarzenie, partnerstwo lub chcesz wesprzeć nasze działania? Napisz — skierujemy wiadomość do właściwej osoby.',
  email: 'foundation@zerya.dev',
}
