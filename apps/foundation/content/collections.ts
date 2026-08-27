import type { Image, Link } from './types'

export interface MarkdownDocument {
  slug: string
  body: unknown[]
}

/** Frontmatter shared by every entry of the `news` and `projects` collections. */
export interface ContentEntry extends MarkdownDocument {
  title: string
  description: string
  category: string
  /** Human readable date or year, rendered next to the category. */
  meta: string
  /** ISO date, present only for time-based collections such as `news`. */
  date?: string
  featured?: boolean
  heroImage: Image
}

const sources = {
  news: import.meta.glob('./news/*.md', { query: '?raw', import: 'default' }),
  projects: import.meta.glob('./projects/*.md', { query: '?raw', import: 'default' }),
  docs: import.meta.glob('./docs/*.md', { query: '?raw', import: 'default' }),
} satisfies Record<string, Record<string, () => Promise<unknown>>>

export type ContentCollection = keyof typeof sources

let parser: ReturnType<typeof createParser> | undefined

async function createParser() {
  const { createMarkdownParser } = await import('comark')
  return createMarkdownParser()
}

function slugOf(path: string) {
  return path.slice(path.lastIndexOf('/') + 1, -'.md'.length)
}

async function parseEntry(path: string, load: () => Promise<unknown>) {
  parser ??= createParser()
  const document = await (await parser)(await load() as string)

  return {
    ...document.frontmatter,
    slug: slugOf(path),
    body: document.nodes,
  }
}

/** Parses every markdown file of a collection, newest first. */
export async function loadCollection(collection: 'news' | 'projects'): Promise<ContentEntry[]> {
  const entries = await Promise.all(
    Object.entries(sources[collection]).map(([path, load]) => parseEntry(path, load) as Promise<ContentEntry>),
  )

  return entries.toSorted((first, second) => (second.date ?? second.meta).localeCompare(first.date ?? first.meta))
}

/** Parses a single markdown file, or returns `undefined` when the slug is unknown. */
export async function loadEntry<T extends MarkdownDocument>(collection: ContentCollection, slug: string): Promise<T | undefined> {
  const path = `./${collection}/${slug}.md`
  const load = sources[collection][path]

  return load && await parseEntry(path, load) as T
}

/** Frontmatter of the long-form legal documents in `docs/`. */
export interface DocumentEntry extends MarkdownDocument {
  title: string
  description: string
  label: string
  notice: { icon: string, title: string, description: string }
  cta: Link
}
