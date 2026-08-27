import type { Image, Link, Metric, Section, Seo } from '../types'

export interface ContactPath {
  title: string
  description: string
  email: string
  icon: string
}

export interface MissionItem {
  title: string
  description: string
  icon: string
  link: Link
}

export const HOME_SEO: Seo = {
  title: 'Fundacja Zerya',
  description: 'Organizujemy ambitne wydarzenia edukacyjne, od hackathonów po CTF-y, w których wiedzę zdobywa się przede wszystkim w praktyce.',
  ogTitle: 'Fundacja Zerya',
  ogDescription: 'Praktyka, rywalizacja i społeczność. Poznaj projekty Fundacji Zerya.',
}

export const HOME_HERO = {
  title: 'Fundacja Zerya',
  description: 'Społeczność, która rozwija się razem. Od młodych, dla młodych. Organizujemy wydarzenia edukacyjne, od hackathonów, przez gamejamy po CTF-y.',
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
  title: 'Nasza misja',
  items: [
    {
      title: 'Budowa społeczności',
      icon: 'i-lucide-users',
      description: 'Aktywnie tworzymy społeczność złożoną z uczestników wydarzeń, których potem rekrutujemy do naszego zespołu, dając każdemu okazję do rozwoju.',
      link: { label: 'nasz zespół', to: '/o-nas' },
    },
    {
      title: 'Nauka przez praktykę',
      icon: 'i-lucide-laptop',
      description: 'Dajemy uczestnikom platformę do rozwoju przez praktyczne wyzwania, nie tylko teoretyczne prelekcje.',
      link: { label: 'format Hack4Krak', to: 'https://hack4krak.pl', external: true },
    },
  ] satisfies MissionItem[],
}

export const HOME_PARTNERS: Section = {
  label: 'Partnerzy',
  title: 'Partnerzy wydarzeń',
  description: 'Firmy i organizacje, które sprawiają, że nasze projekty są możliwe.',
}

export const HOME_TEAM = {
  label: 'Zespół',
  title: 'Nasz zespół',
  link: { label: 'Poznaj cały zespół', to: '/o-nas#zespol' } satisfies Link,
}

export const HOME_CONTACT = {
  title: 'Porozmawiajmy o wspólnym projekcie',
  description: 'Masz pomysł na wydarzenie, partnerstwo lub chcesz wesprzeć nasze działania? Napisz — skierujemy wiadomość do właściwej osoby.',
  paths: [
    {
      title: 'Partnerstwa i sponsoring',
      description: 'Współpraca projektowa, sponsoring i wsparcie rzeczowe.',
      email: 'partnerstwa@foundation.zerya.dev',
      icon: 'i-lucide-handshake',
    },
    {
      title: 'Kontakt ogólny',
      description: 'Pytania o fundację, wydarzenia i udział w działaniach.',
      email: 'kontakt@foundation.zerya.dev',
      icon: 'i-lucide-mail',
    },
  ] satisfies ContactPath[],
}
