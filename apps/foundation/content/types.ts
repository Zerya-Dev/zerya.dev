export type Tone = 'dark' | 'green' | 'mint' | 'light'

export interface Link {
  label: string
  to: string
  external?: boolean
}

export interface Metric {
  value: string
  label: string
}

export interface Seo {
  title: string
  description: string
  ogTitle?: string
  ogDescription?: string
}

export interface Hero {
  label: string
  title: string
  description: string
}

export interface Section {
  label: string
  title: string
  description?: string
}

export interface Cta {
  title: string
  description: string
  button: Link
}

export interface Image {
  alt: string
  caption: string
  src?: string
  tone?: Tone
}
