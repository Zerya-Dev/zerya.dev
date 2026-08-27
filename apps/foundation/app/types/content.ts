export interface Metric {
  value: string
  label: string
}

export interface Link {
  label: string
  to: string
  external?: boolean
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
  dark?: boolean
}

export interface Image {
  alt: string
  caption: string
  tone?: 'dark' | 'green' | 'mint' | 'light'
  src?: string
}

export interface MarkdownDocument {
  body: unknown[]
}

export interface ContentItem extends MarkdownDocument {
  slug: string
  title: string
  category: string
  description: string
  meta: string
  order: string
  date?: string
  featured?: boolean
  heroImage: Image
}

export interface Section {
  label?: string
  title?: string
  description?: string
}

export interface Cta {
  title: string
  description: string
  button: Link
}

export interface PageData {
  slug: string
  seo: Seo
  hero: Hero
  archive?: Section
  cta?: Cta
  detailCta?: Cta
  [key: string]: any
}

export interface HomePageData extends Omit<PageData, 'hero'> {
  hero: {
    title: string
    emphasis: string
    description: string
    slides: Array<Image>
    links: Link[]
    stats: Metric[]
  }
}

export interface PrivacyDocument extends MarkdownDocument {
  slug: string
  title: string
  description: string
  label: string
  notice: { icon: string, title: string, description: string }
  cta: Link
}

export interface FoundationContent {
  news: ContentItem
  pages: PrivacyDocument
  projects: ContentItem
}

export interface FoundationData {
  'pages/about': PageData
  'pages/contact': PageData
  'pages/home': HomePageData
  'pages/news': PageData
  'pages/projects': PageData
  'pages/statute': PageData
  'pages/support': PageData
  'site/gallery': { hero: Hero, filters: string[], items: GalleryItem[] }
  'site/metrics': { organization: Metric[] }
  'site/navigation': { items: Link[] }
  'site/partners': any
  'site/settings': any
  'site/team': any
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
  image?: string
}
