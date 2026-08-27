import type { Hero, Seo } from '../types'

export interface ContactPath {
  title: string
  description: string
  person: string
  email: string
  icon: string
}

export const CONTACT_SEO: Seo = {
  title: 'Kontakt',
  description: 'Kontakt dla partnerów, mediów i osób zainteresowanych działaniami Fundacji Zerya.',
}

export const CONTACT_HERO: Hero = {
  label: 'Kontakt',
  title: 'Skontaktuj sie z nami',
  description: 'Wybierz temat lub skorzystaj z formularza. Wiadomość skierujemy do osoby odpowiedzialnej za dany obszar.',
}

export const CONTACT_FORM = {
  label: 'Formularz',
  title: 'Opisz krótko, czego dotyczy wiadomość',
  description: 'Prosty formularz pomaga nam zebrać potrzebny kontekst. Nie wysyłaj w nim danych wrażliwych.',
}

export const CONTACT_PATHS: ContactPath[] = [
  {
    title: 'Partnerstwa i sponsoring',
    description: 'Współpraca projektowa, sponsoring i wsparcie rzeczowe.',
    person: 'Osoba odpowiedzialna — do uzupełnienia',
    email: 'foundation@zerya.dev',
    icon: 'i-lucide-handshake',
  },
  {
    title: 'Kontakt ogólny',
    description: 'Pytania o fundację, wydarzenia i udział w działaniach.',
    person: 'Zespół Fundacji Zerya',
    email: 'foundation@zerya.dev',
    icon: 'i-lucide-mail',
  },
  {
    title: 'Media i patronaty',
    description: 'Materiały prasowe, patronaty i zapytania medialne.',
    person: 'Osoba odpowiedzialna — do uzupełnienia',
    email: 'foundation@zerya.dev',
    icon: 'i-lucide-megaphone',
  },
]
