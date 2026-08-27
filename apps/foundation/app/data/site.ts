export interface Metric {
  value: string
  label: string
}

export interface Project {
  slug: string
  name: string
  category: string
  year: string
  description: string
  summary: string
  result: string
  featured?: boolean
  externalUrl?: string
  metrics: Metric[]
  challenge: string[]
  scope: string[]
}

export interface NewsArticle {
  slug: string
  title: string
  date: string
  displayDate: string
  category: string
  lead: string
  featured?: boolean
  sections: Array<{
    title: string
    paragraphs: string[]
  }>
}

export interface GalleryItem {
  id: number
  label: string
  project: string
  year: string
  date: string
  place: string
  tone: 'dark' | 'green' | 'mint' | 'light'
  featured?: boolean
}

export const navigation = [
  { label: 'Start', to: '/' },
  { label: 'O nas', to: '/o-nas' },
  { label: 'Projekty', to: '/projekty' },
  { label: 'Aktualności', to: '/aktualnosci' },
  { label: 'Galeria', to: '/galeria' },
  { label: 'Wsparcie', to: '/wsparcie' },
  { label: 'Kontakt', to: '/kontakt' },
]

export const socialLinks = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/zerya-foundation/' },
  { label: 'GitHub', href: 'https://github.com/Zerya-Dev' },
]

export const foundationDetails = [
  { label: 'KRS', value: 'do uzupełnienia' },
  { label: 'NIP', value: 'do uzupełnienia' },
  { label: 'REGON', value: 'do uzupełnienia' },
  { label: 'Adres', value: 'Kraków, Polska — pełny adres do uzupełnienia' },
]

export const organizationMetrics: Metric[] = [
  { value: '300+', label: 'uczestników wszystkich działań' },
  { value: '30+', label: 'wolontariuszy zaangażowanych w działania' },
  { value: '10+', label: 'partnerstw' },
]

export const teamMembers = [
  { name: 'Imię i nazwisko', role: 'Koordynacja', description: 'Odpowiedzialność za przebieg projektów i współpracę zespołu.' },
  { name: 'Imię i nazwisko', role: 'Operacje', description: 'Zaplanowanie programu wydarzeń i doświadczenia uczestników' },
  { name: 'Imię i nazwisko', role: 'Partnerstwa', description: 'Relacje ze sponsorami, instytucjami i patronami.' },
  { name: 'Imię i nazwisko', role: 'Promocja', description: 'Docieranie z naszym projektem do młodych ludzi z różnych miast i krajów.' },
  { name: 'Imię i nazwisko', role: 'Technologia', description: 'Zaplecze techniczne i narzędzia.' },
]

export const supportingTeamMembers = [
  { name: 'Imię i nazwisko', role: 'Wolontariat' },
  { name: 'Imię i nazwisko', role: 'Komunikacja' },
  { name: 'Imię i nazwisko', role: 'Opieka nad uczestnikami' },
  { name: 'Imię i nazwisko', role: 'Wsparcie techniczne' },
  { name: 'Imię i nazwisko', role: 'Dokumentacja' },
  { name: 'Imię i nazwisko', role: 'Produkcja wydarzeń' },
]

export const projects: Project[] = [
  {
    slug: 'hack4krak',
    name: 'Hack4Krak',
    category: 'Cyberbezpieczeństwo',
    year: '2026',
    description: 'CTF dla młodzieży realizowany z partnerami i pełną oprawą organizacyjną.',
    summary: 'Praktyczne wydarzenie CTF dla młodzieży, które łączy edukację, rywalizację i budowanie społeczności.',
    result: '100+ uczestników trzeciej edycji',
    featured: true,
    externalUrl: 'https://hack4krak.pl',
    metrics: [
      { value: '100+', label: 'uczestników trzeciej edycji' },
      { value: '30 h', label: 'programu wydarzenia' },
      { value: '10+', label: 'partnerów' },
      { value: '5', label: 'obszarów organizacji' },
    ],
    challenge: ['Zauważylismy, że nie istnieje żadno wydarzenie w formule CTF w większej skali, które kierowane byłoby do uczniów szkół średnich. Inne CTFy tej skali, zwłaszcza stacjonarne zdominowane są przez studentów i dorosłych, przez to próg wejścia dla osób w wieku szkolnym jest bardzo wysoki.', 'Poprzez przeprowadzenie 2 pilotaży, rozmowy z uczestnikami poprzednich edycji i własne doświadczenia, byliśmy w stanie stworzyć wydarzenie na poziomie, który pozwala świeżym adeptom cyberbezpieczeństwa poznać jego podstawy, a bardziej doświadczonym zawalczyć o ciekawe nagrody, poznać się ze sobą i wymieniać się wiedzą.'],
    scope: [
      'przygotowanie programu i zadań na wydarzeniu',
      'promocja i komunikacja z uczestnikami',
      'partnerstwa i współpraca instytucjonalna',
      'logistyka oraz opieka nad uczestnikami',
      'technologia i obsługa wydarzenia',
    ],
  },
]

export const newsArticles: NewsArticle[] = [
  {
    slug: 'trzecia-edycja-hack4krak',
    title: 'Trzecia edycja Hack4Krak — podsumowanie',
    date: '2026-06-18',
    displayDate: '18 czerwca 2026',
    category: 'Hack4Krak',
    lead: 'Ponad 100 uczestników trzeciej edycji, 30 godzin programu i partnerzy, dzięki którym wydarzenie mogło działać na pełną skalę.',
    featured: true,
    sections: [
      { title: 'Edukacja w praktyce', paragraphs: ['Hack4Krak tworzy warunki, w których wiedza od razu zamienia się w działanie. Uczestnicy pracują zespołowo, podejmują decyzje pod presją czasu i korzystają ze wsparcia mentorów.'] },
      { title: 'Wspólna realizacja', paragraphs: ['Za wydarzeniem stoi praca programowa, techniczna, logistyczna i partnerska. Każdy z tych obszarów wspiera bezpieczne i spójne doświadczenie uczestników.'] },
    ],
  },
  {
    slug: 'jak-projektujemy-zadania',
    title: 'Jak projektujemy zadania, które uczą przez praktykę',
    date: '2026-05-08',
    displayDate: '8 maja 2026',
    category: 'Edukacja',
    lead: 'Dobre zadanie nie tylko sprawdza wynik. Prowadzi uczestnika przez eksperyment, decyzję i informację zwrotną.',
    sections: [{ title: 'Od celu do testów', paragraphs: ['Najpierw określamy umiejętność, którą zadanie ma rozwijać. Następnie budujemy scenariusz, testujemy poziom trudności i sprawdzamy, czy instrukcja jest jednoznaczna.'] }],
  },
  {
    slug: 'rola-mentorow',
    title: 'Rola mentorów podczas wydarzenia technologicznego',
    date: '2026-04-21',
    displayDate: '21 kwietnia 2026',
    category: 'Społeczność',
    lead: 'Mentor nie podaje gotowej odpowiedzi — pomaga zespołowi nazwać problem i wybrać kolejny krok.',
    sections: [{ title: 'Wsparcie, nie skrót', paragraphs: ['Mentoring buduje samodzielność. Wskazówki mają uruchomić myślenie i pozwolić uczestnikom zachować odpowiedzialność za rozwiązanie.'] }],
  },
  {
    slug: 'partnerstwo-z-realnym-wplywem',
    title: 'Partnerstwo z realnym wpływem na edukację',
    date: '2026-03-12',
    displayDate: '12 marca 2026',
    category: 'Partnerstwa',
    lead: 'Wsparcie finansowe to tylko jedna z możliwości. Wiedza ekspertów, przestrzeń i technologia również zmieniają skalę projektu.',
    sections: [{ title: 'Wspólny cel', paragraphs: ['Każdą współpracę zaczynamy od efektu edukacyjnego i jasnego podziału odpowiedzialności. Dzięki temu partner wie, co wspiera i jak jego wkład pracuje dla uczestników.'] }],
  },
  {
    slug: 'bezpieczne-wydarzenie',
    title: 'Co składa się na bezpieczne wydarzenie',
    date: '2026-02-06',
    displayDate: '6 lutego 2026',
    category: 'Organizacja',
    lead: 'Regulamin, opieka, infrastruktura i komunikacja muszą działać razem — jeszcze zanim pojawi się pierwszy uczestnik.',
    sections: [{ title: 'Bezpieczeństwo jako proces', paragraphs: ['Ryzyka identyfikujemy na etapie planowania. Przygotowujemy zasady, role, ścieżki kontaktu i scenariusze reakcji, a następnie komunikujemy je zespołowi.'] }],
  },
  {
    slug: 'wolontariat-od-kulis',
    title: 'Wolontariat od kulis: wiele ról, jeden standard',
    date: '2025-12-14',
    displayDate: '14 grudnia 2025',
    category: 'Zespół',
    lead: 'Sprawna realizacja wymaga osób odpowiedzialnych za uczestników, program, technologię, logistykę i komunikację.',
    sections: [{ title: 'Jasna odpowiedzialność', paragraphs: ['Każda osoba otrzymuje zakres roli, potrzebne informacje i osobę kontaktową. To prosty mechanizm, który zwiększa jakość całego wydarzenia.'] }],
  },
]

export const galleryItems: GalleryItem[] = [
  { id: 1, label: 'Uczestnicy podczas pracy zespołowej', project: 'Hack4Krak', year: '2026', date: 'czerwiec 2026', place: 'Kraków', tone: 'dark', featured: true },
  { id: 2, label: 'Odprawa zespołu organizacyjnego', project: 'Hack4Krak', year: '2026', date: 'czerwiec 2026', place: 'Kraków', tone: 'green' },
  { id: 3, label: 'Mentorzy wspierający uczestników', project: 'Hack4Krak', year: '2026', date: 'czerwiec 2026', place: 'Kraków', tone: 'mint' },
  { id: 4, label: 'Rozpoczęcie wydarzenia', project: 'Hack4Krak', year: '2026', date: 'czerwiec 2026', place: 'Kraków', tone: 'light' },
  { id: 5, label: 'Praca nad zadaniami', project: 'Warsztaty CTF', year: '2026', date: 'maj 2026', place: 'Kraków', tone: 'green' },
  { id: 6, label: 'Spotkanie z partnerami', project: 'Partnerstwa edukacyjne', year: '2025', date: 'listopad 2025', place: 'Kraków', tone: 'dark' },
  { id: 7, label: 'Testowanie programu', project: 'Laboratorium zadań', year: '2025', date: 'październik 2025', place: 'Kraków', tone: 'mint' },
  { id: 8, label: 'Zespół po zakończeniu realizacji', project: 'Hack4Krak', year: '2025', date: 'czerwiec 2025', place: 'Kraków', tone: 'light', featured: true },
]
