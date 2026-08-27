export type SocialPlatform = 'email' | 'github' | 'linkedin' | 'website' | 'bluesky' | 'twitter' | 'instagram'

export interface TeamMember {
  name: string
  role: string
  img?: string
  socials?: Partial<Record<SocialPlatform, string>>
}

export const SOCIAL_PLATFORMS: Record<SocialPlatform, { label: string, icon: string }> = {
  email: { label: 'E-mail', icon: 'i-lucide-mail' },
  github: { label: 'GitHub', icon: 'i-simple-icons-github' },
  linkedin: { label: 'LinkedIn', icon: 'i-simple-icons-linkedin' },
  website: { label: 'Strona internetowa', icon: 'i-lucide-globe' },
  bluesky: { label: 'Bluesky', icon: 'i-simple-icons-bluesky' },
  twitter: { label: 'X (Twitter)', icon: 'i-simple-icons-x' },
  instagram: { label: 'Instagram', icon: 'i-simple-icons-instagram' },
}

export const LANDING_TEAM: TeamMember[] = [
  {
    name: 'Jakub Starzyk',
    role: 'Prezes Zarządu',
    socials: {
      linkedin: 'https://www.linkedin.com/in/jakub-starzyk-8a37bb331/',
      email: 'jakub.starzyk@foundation.zerya.dev',
    },
  },
  {
    name: 'Oskar Szeremet',
    role: 'Kontakt z partnerami',
    socials: {
      linkedin: 'https://www.linkedin.com/in/oskar-szeremet-76a87b359/',
      email: 'oskar.szeremet@foundation.zerya.dev',
    },
  },
  { name: 'Imię Nazwisko', role: 'Marketing' },
]

export const TEAM_MEMBERS: TeamMember[] = [
  ...LANDING_TEAM,
  {
    name: 'Norbert "Norbiros" Szeremet',
    role: 'Koordynator techniczny',
    socials: {
      linkedin: 'https://www.linkedin.com/in/norbert-szeremet/',
      website: 'https://norbiros.dev',
      bluesky: 'https://bsky.app/profile/norbiros.dev',
      twitter: 'https://x.com/norbiros_dev',
      email: 'norbert.szeremet@foundation.zerya.dev',
      github: 'https://github.com/Norbiros',
    },
  },
  {
    name: 'Marek "Rytui" Zjeżdżałka',
    role: 'Koordynator ds. operacyjnych',
    socials: {
      linkedin: 'https://www.linkedin.com/in/marek-zjezdzalka',
      github: 'https://github.com/zjezdzalka',
    },
  },
]

export const SUPPORTING_TEAM_MEMBERS: TeamMember[] = [
  { name: 'Kacper Oberwan', role: 'Fotografia i video' },
  {
    name: 'Dannylov Seleznov',
    role: 'Marketing i programowanie',
    socials: {
      linkedin: 'https://linkedin.com/in/danylo-seleznov-988622419',
      github: 'https://github.com/Dannov',
    },
  },
]
