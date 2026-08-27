import type { FoundationContent, FoundationData } from '~/types/content'

export const foundationContentRoutes = {
  aktualnosci: { collection: 'news', page: 'pages/news' },
  projekty: { collection: 'projects', page: 'pages/projects' },
} as const

export type FoundationContentRoute = keyof typeof foundationContentRoutes

export function isFoundationContentRoute(route: string): route is FoundationContentRoute {
  return route in foundationContentRoutes
}

export function getFoundationContentRoute(route: FoundationContentRoute) {
  return foundationContentRoutes[route]
}

export function useFoundationData<T extends keyof FoundationData>(path: T, key = `foundation-data-${path}`) {
  return useAsyncData(key, () => $fetch<FoundationData[T]>(`/api/foundation/data/${path}`))
}

export function useFoundationContentCollection<T extends keyof FoundationContent>(collection: T) {
  return useAsyncData(`foundation-content-${collection}`, () => $fetch<FoundationContent[T][]>(`/api/foundation/content/${collection}`))
}

export function useFoundationContent<T extends keyof FoundationContent>(collection: T, slug: string) {
  return useAsyncData(`foundation-content-${collection}-${slug}`, () => $fetch<FoundationContent[T]>(`/api/foundation/content/${collection}/${slug}`))
}
