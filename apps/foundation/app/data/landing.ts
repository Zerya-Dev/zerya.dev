import thirtyFirstHighSchoolLogo from '~/assets/images/partners/31lo.webp'
import ambasadaLogo from '~/assets/images/partners/ambasada-spolecznosci.webp'
import arkanetLogo from '~/assets/images/partners/arkanet.webp'
import certLogo from '~/assets/images/partners/cert.webp'
import cyberdotLogo from '~/assets/images/partners/cyberdot.webp'
import cyberfolksLogo from '~/assets/images/partners/cyberfolks.webp'
import fablabLogo from '~/assets/images/partners/fablab.webp'
import infosecLogo from '~/assets/images/partners/infosec.webp'
import kptLogo from '~/assets/images/partners/kpt.webp'
import netwrixLogo from '~/assets/images/partners/netwrix.webp'
import teachForPolandLogo from '~/assets/images/partners/teachforpoland.webp'
import ukenLogo from '~/assets/images/partners/uken.webp'

export const heroSlides = [
  {
    alt: 'Zespół pracujący wspólnie przy stole podczas spotkania projektowego',
    caption: 'Zespół podczas przygotowań do wydarzenia',
    tone: 'green' as const,
  },
  {
    alt: 'Uczestnicy wydarzenia technologicznego pracujący w grupie',
    caption: 'Współpraca uczestników i mentorów',
    tone: 'dark' as const,
  },
  {
    alt: 'Grupa osób omawiająca plan projektu przy tablicy',
    caption: 'Od pomysłu do sprawnej realizacji',
    tone: 'mint' as const,
  },
]

export const missionItems = [
  {
    number: '01',
    title: 'Praktyka',
    description: 'Uczestnicy rozwiązują prawdziwe problemy zamiast tylko słuchać o teorii.',
    proof: '30 h wydarzenia',
    link: 'format Hack4Krak',
    to: 'https://hack4krak.pl',
    external: true,
  },
  {
    number: '02',
    title: 'Rywalizacja',
    description: 'Ranking i ograniczony czas motywują do eksperymentowania i szybkiej nauki.',
    proof: '300+ uczestników',
    link: 'zobacz nasze projekty',
    to: '/projekty',
  },
  {
    number: '03',
    title: 'Społeczność',
    description: 'Zespoły, wolontariusz i partnerzy tworzą środowisko, w którym można uczyć się od innych.',
    proof: '30+ wolontariuszy',
    link: 'nasz zespół',
    to: '/o-nas',
  },
]

export const featuredPartners = [
  {
    name: 'CyberFolks',
    tagline: 'Sponsor główny Hack4Krak',
    url: 'https://cyberfolks.pl',
    logo: cyberfolksLogo,
    logoAlt: 'Logo CyberFolks',
  },
  {
    name: 'UKEN',
    tagline: 'Partner strategiczny',
    url: 'https://www.uken.krakow.pl/',
    logo: ukenLogo,
    logoAlt: 'Logo UKEN',
  },
  {
    name: 'Ambasada Społeczności',
    tagline: 'Partner organizacyjny',
    url: 'https://ambasadaspolecznosci.org.pl/',
    logo: ambasadaLogo,
    logoAlt: 'Logo Ambasada Społeczności',
  },
]

export const supportingPartners = [
  {
    name: 'Arkanet',
    url: 'https://arkanet.pl',
    logo: arkanetLogo,
    logoAlt: 'Logo Arkanet',
  },
  {
    name: 'Netwrix',
    url: 'https://netwrix.com/',
    logo: netwrixLogo,
    logoAlt: 'Logo Netwrix',
  },
  {
    name: 'CERT Polska',
    url: 'https://cert.pl/',
    logo: certLogo,
    logoAlt: 'Logo CERT Polska',
  },
  {
    name: 'Krakowski Park Technologiczny',
    url: 'https://www.kpt.krakow.pl/',
    logo: kptLogo,
    logoAlt: 'Logo Krakowski Park Technologiczny',
  },
  {
    name: '31 Liceum Ogólnokształcące w Krakowie',
    url: 'https://lo31.krakow.pl/',
    logo: thirtyFirstHighSchoolLogo,
    logoAlt: 'Logo 31 LO',
  },
  {
    name: 'Teach for Poland',
    url: 'https://teachforpoland.org/',
    logo: teachForPolandLogo,
    logoAlt: 'Logo Teach for Poland',
  },
  {
    name: 'FABLAB Małopolska',
    url: 'https://www.fablabmalopolska.pl/',
    logo: fablabLogo,
    logoAlt: 'Logo FABLAB Małopolska',
  },
  {
    name: 'INFOSEC',
    url: 'https://infosec.info.pl',
    logo: infosecLogo,
    logoAlt: 'Logo INFOSEC',
  },
  {
    name: 'CyberDot',
    url: 'https://cyberdot.pl/',
    logo: cyberdotLogo,
    logoAlt: 'Logo CyberDot',
  },
]

export const team = [
  {
    name: 'Imię Nazwisko',
    role: 'koordynacja',
  },
  {
    name: 'Imię Nazwisko',
    role: 'partnerstwa',
  },
  {
    name: 'Imię Nazwisko',
    role: 'technologia',
  },
]
