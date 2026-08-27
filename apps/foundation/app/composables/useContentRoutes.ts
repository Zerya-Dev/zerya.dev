import {
  PROJECTS_ARCHIVE,
  PROJECTS_CTA,
  PROJECTS_DETAIL_CTA,
  PROJECTS_HERO,
  PROJECTS_SEO,
} from '~~/content/pages/projects'

/** Localised URL segment → the collection and page content backing it. */
export const CONTENT_ROUTES = {
  projekty: {
    collection: 'projects',
    seo: PROJECTS_SEO,
    hero: PROJECTS_HERO,
    archive: PROJECTS_ARCHIVE,
    cta: PROJECTS_CTA,
    detailCta: PROJECTS_DETAIL_CTA,
  },
} as const

export type ContentRoute = keyof typeof CONTENT_ROUTES

export function isContentRoute(route: string): route is ContentRoute {
  return route in CONTENT_ROUTES
}
