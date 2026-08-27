import type { ContentCollection, ContentEntry, MarkdownDocument } from '~~/content/collections'
import { loadCollection, loadEntry } from '~~/content/collections'

/**
 * Markdown is parsed once while rendering on the server and handed to the client
 * through the payload, so the parser never ships to the browser.
 */
export function useCollection(collection: 'news' | 'projects') {
  return useAsyncData(`collection-${collection}`, () => loadCollection(collection))
}

export function useEntry<T extends MarkdownDocument = ContentEntry>(collection: ContentCollection, slug: string) {
  return useAsyncData(`entry-${collection}-${slug}`, () => loadEntry<T>(collection, slug))
}
