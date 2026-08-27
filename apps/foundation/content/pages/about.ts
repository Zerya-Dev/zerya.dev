import type { Hero, Image, Link, Seo } from '../types'

export interface StepItem {
  title: string
  description: string
  icon: string
}

export const ABOUT_SEO: Seo = {
  title: 'O nas',
  description: 'Skąd się wzięliśmy, kim jesteśmy i jak w Fundacji Zerya rozwijają się nowe osoby.',
}

export const ABOUT_HERO: Hero = {
  label: 'O nas',
  title: 'Kim jesteśmy',
  description: 'Jesteśmy ekipą młodych ludzi z Krakowa. Robimy wydarzenia z IT i przy okazji uczymy się, ile się da.',
}

export const ABOUT_ORIGIN = {
  label: 'Jak powstała Zerya',
  title: 'Od szkolnego CTF-a do fundacji',
  paragraphs: [
    'W lutym 2025 kilkoro uczniów XXXI LO w Krakowie chciało zrobić konkurs z cyberbezpieczeństwa dla własnej szkoły. Gotowej platformy nie było, więc napisaliśmy ją sami, razem z zadaniami. Tak powstał Hack4Krak — na pierwszą edycję przyszło ponad 60 osób.',
    'Rozwijając projekt Hack4Krak, w maju 2025 zrobiliśmy edycję dla szkół podstawowych a rok później wyszliśmy ze szkoły na UKEN: dwa dni zawodów, 29 drużyn, prelekcje i 15 partnerów, dzięki którym udział był darmowy.',
  ],
  link: { label: 'Zobacz nasze projekty', to: '/projekty' } satisfies Link,
  image: {
    alt: 'Uczestnicy Hack4Krak',
    caption: 'Uczestnicy Hack4Krak',
    src: '/img/content/group-crowd.webp',
  } satisfies Image,
}

export const ABOUT_COMMUNITY = {
  label: 'Nasza misja',
  title: 'Społeczność Zerya',
  paragraphs: [
    'Naszym głównym celem jest zbudowanie społeczności młodych ludzi, którzy chcą się rozwijać w IT - przede wszystkim uczestników wydarzeń takich jak Hack4Krak.',
    'Sami jesteśmy w większości uczniami szkół średnich. Część z nas zajmuje się cyberbezpieczeństwem, inni programują, projektują grafikę albo odpowiadają za logistykę i współpracę z partnerami, dla każdego jest miejsce w zespole.',
    'Nowych członków zespołu szukamy właśnie w tej społeczności. Osobom, które chcą się zaangażować, dobieramy mentora i zadania dopasowane do ich zainteresowań, tak żeby mogły rozwijać się w kierunku, który je naprawdę interesuje.',
  ],
  image: {
    alt: 'Uczestnicy w trakcie pracy',
    caption: 'Uczestnicy w trakcie pracy',
    src: '/img/content/landing/uczestnicy-w-trakcie-pracy.webp',
  } satisfies Image,
}

export const ABOUT_TRUST = {
  label: 'Liczby',
  title: 'Co udało się do tej pory',
  description: 'Kilka liczb z dotychczasowych wydarzeń. Mamy nadzieję, że za rok będą większe.',
}

export const ABOUT_TEAM_SECTION = {
  label: 'Zespół',
  title: 'Nasz zespół',
  description: 'Ludzie, którzy stoją za fundacją i naszymi wydarzeniami.',
  groups: {
    coordinators: {
      title: 'Koordynatorzy',
      description: 'Prowadzą poszczególne obszary fundacji i odpowiadają za nie.',
    },
    team: {
      title: 'Zespół',
      description: 'Pomagają przy technice, zdjęciach i organizacji wydarzeń.',
    },
  },
}

export const ABOUT_NEXT = {
  joinLabel: 'Dla uczniów',
  joinTitle: 'Chcesz do nas dołączyć?',
  joinDescription: 'Napisz do nas albo zagadaj na najbliższym wydarzeniu. Doświadczenie nie jest wymagane, chęci tak.',
  joinButton: { label: 'Wejdź na Discorda', to: 'https://discord.gg/ASPqckzEd8', external: true } satisfies Link,
  partnerLabel: 'Dla partnerów',
  partnerTitle: 'Chcesz współpracować?',
  partnerDescription: 'Szukamy firm i organizacji, które pomogą nam robić kolejne edycje większe i dalej darmowe dla uczestników.',
  partnerButton: { label: 'Kontakt', to: '/#kontakt' } satisfies Link,
}
