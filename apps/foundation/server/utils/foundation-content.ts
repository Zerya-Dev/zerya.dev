import { createMarkdownParser } from 'comark'
import { load } from 'js-yaml'

const parseMarkdown = createMarkdownParser()
const contentCollections = new Set(['news', 'pages', 'projects'])
const safePathPattern = /^[a-z0-9-/]+$/

async function readAsset(storage: ReturnType<typeof useStorage>, path: string) {
  const value = await storage.getItemRaw(path)

  if (value === null) {
    throw createError({ statusCode: 404, statusMessage: 'Nie znaleziono treści' })
  }

  return typeof value === 'string' ? value : new TextDecoder().decode(value)
}

export async function readFoundationData(path: string) {
  if (!safePathPattern.test(path)) {
    throw createError({ statusCode: 400, statusMessage: 'Nieprawidłowa ścieżka danych' })
  }

  const source = await readAsset(useStorage('assets:foundation-data'), `${path}.yml`)
  return load(source)
}

async function parseFoundationMarkdown(path: string) {
  const source = await readAsset(useStorage('assets:foundation-content'), path)
  const document = await parseMarkdown(source)

  return {
    ...document.frontmatter,
    body: document.nodes,
  }
}

function normalizeFoundationContent(collection: string, document: Record<string, any>) {
  if (collection === 'pages') {
    return document
  }

  const isNews = collection === 'news'

  return {
    ...document,
    title: isNews ? document.title : document.name,
    description: isNews ? document.lead : document.description,
    meta: isNews ? document.displayDate : document.year,
    order: isNews ? document.date : document.year,
    date: isNews ? document.date : undefined,
  }
}

export async function readFoundationContent(collection: string, slug: string) {
  if (!contentCollections.has(collection) || !safePathPattern.test(slug)) {
    throw createError({ statusCode: 404, statusMessage: 'Nie znaleziono treści' })
  }

  return parseFoundationMarkdown(`${collection}/${slug}.md`).then(document => normalizeFoundationContent(collection, document))
}

export async function listFoundationContent(collection: string) {
  if (!contentCollections.has(collection)) {
    throw createError({ statusCode: 404, statusMessage: 'Nie znaleziono kolekcji' })
  }

  const storage = useStorage('assets:foundation-content')
  const keys = await storage.getKeys(collection)

  return Promise.all(
    keys
      .filter(key => key.endsWith('.md'))
      .map(async key => normalizeFoundationContent(collection, await parseFoundationMarkdown(key))),
  )
}
