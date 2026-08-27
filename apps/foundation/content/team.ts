export interface TeamMember {
  name: string
  role: string
  img?: string
}

export const TEAM_MEMBERS: TeamMember[] = [
  { name: 'Jakub Starzyk', role: 'Prezes Zarządu', img: '/img/content/team/jakub-starzyk.jpg' },
  { name: 'Oskar Szeremet', role: 'Kontakt z partnerami', img: '/img/content/team/oskar-szeremet.jpg' },
  { name: 'Imię Nazwisko', role: 'Marketing', img: '/img/content/team/imie-nazwisko.jpg' },
]

export const SUPPORTING_TEAM_MEMBERS: TeamMember[] = [
  { name: 'Norbert Szeremet', role: 'Koordynator techniczny' },
  { name: 'Kacper Oberwan', role: 'Fotografia i video' },
  { name: 'Dannylov Seleznov', role: 'Wsparcie organizacyjne' },
]
