import type { Hero, Image, Link, Seo } from '../types'

export interface ValueItem {
  title: string
  description: string
  icon: string
}

export const ABOUT_SEO: Seo = {
  title: 'O nas',
  description: 'Poznaj misję, doświadczenie i osoby odpowiedzialne za realizację projektów Fundacji Zerya.',
}

export const ABOUT_HERO: Hero = {
  label: 'O fundacji',
  title: 'Kim jesteśmy',
  description: 'Organizujemy ambitne wydarzenia edukacyjne — od programu po bezpieczeństwo uczestników.',
}

export const ABOUT_ORIGIN = {
  label: 'Nasza geneza',
  title: 'Zaczęliśmy od zauważenia problemu',
  paragraphs: [
    'Fundacja Zerya powstała z inicjatywy młodych ludzi zainteresowanych różnymi tematami, od cyberbezpieczeństwa po przedsiębiorczość, którzy zauważyli brak, niską jakość lub wysoki próg wejścia inicjatyw edukacyjnych skierowanych do młodzieży.',
    'Doświadczenie zdobyliśmy w praktyce: planując pierwsze wydarzenia, zdobywając pierwszych sponsorów i ucząc się jak skutecznie organizować takie wydarzenia.',
  ],
  image: {
    alt: 'Zespół w trakcie pracy podczas wydarzenia',
    caption: 'Zespół w trakcie pracy podczas wydarzenia',
    src: '/img/content/landing/zespol-w-trakcie-pracy-podczas-wydarzenia.webp',
  } satisfies Image,
}

export const ABOUT_VALUES = {
  label: 'Nasze wartości',
  title: 'Nasze wartości',
  items: [
    {
      title: 'Nauka przez praktykę',
      description: 'Uczymy przez działanie i pracę nad realnymi projektami.',
      icon: 'i-lucide-wrench',
    },
    {
      title: 'Współpraca',
      description: 'Budujemy społeczność młodych ludzi o wspólnych zainteresowaniach.',
      icon: 'i-lucide-handshake',
    },
    {
      title: 'Bezpieczna rywalizacja',
      description: 'Wierzymy, że rywalizacja jest dobrym narzędziem do motywacji i rozwoju.',
      icon: 'i-lucide-shield-check',
    },
  ] satisfies ValueItem[],
}

export const ABOUT_TRUST = {
  label: 'Doświadczenie',
  title: 'Dlaczego można nam zaufać',
  description: 'Najważniejsze liczby przechowujemy jako dane, dzięki czemu można je łatwo aktualizować wraz z rozwojem fundacji.',
}

export const ABOUT_TEAM_SECTION = {
  label: 'Zespół',
  title: 'Nasz zespół',
  description: 'Za każdym obszarem stoi konkretna osoba znająca się na temacie.',
  supportingTitle: 'Pozostali członkowie zespołu',
  supportingDescription: 'W realizację projektów angażują się także osoby wspierające konkretne obszary wydarzeń.',
}

export const ABOUT_NEXT = {
  proofLabel: 'Zobacz dowody',
  proofTitle: 'Najlepszy sposób, by nas poznać, to zobaczyć nasze wydarzenia.',
  proofButton: { label: 'Przejdź do projektów', to: '/projekty' } satisfies Link,
  partnerLabel: 'Dla partnerów',
  partnerTitle: 'Chcesz współpracować?',
  partnerDescription: 'Kontakt dla sponsorów, partnerów i instytucji.',
  partnerButton: { label: 'Kontakt', to: '/kontakt' } satisfies Link,
}
