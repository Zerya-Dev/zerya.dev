export const CONTACT_EMAIL = 'kontakt@zerya.dev'
export const SITE_URL = 'https://zerya.dev'

export const SOCIAL_LINKS = {
  github: 'https://github.com/zerya-Dev',
  linkedin: 'https://www.linkedin.com/company/111743895',
}

export const PROJECT_LINKS = {
  motoq: { name: 'MOTOQ', to: 'https://motoq.zerya.dev', domain: 'motoq.zerya.dev' },
  hack4krak: { name: 'Hack4Krak', to: 'https://hack4krak.pl/', domain: 'hack4krak.pl' },
  foundation: { name: 'Zerya Foundation', to: 'https://foundation.zerya.dev/', domain: 'foundation.zerya.dev' },
}

// Where to find us, shared by the footer and the phone menu
export const CONTACT_LINKS = [
  { label: CONTACT_EMAIL, to: `mailto:${CONTACT_EMAIL}` },
  { label: 'GitHub', to: SOCIAL_LINKS.github, target: '_blank' },
  { label: 'LinkedIn', to: SOCIAL_LINKS.linkedin, target: '_blank' },
]
