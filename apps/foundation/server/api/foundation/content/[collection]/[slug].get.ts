export default defineEventHandler((event) => {
  const collection = getRouterParam(event, 'collection')
  const slug = getRouterParam(event, 'slug')

  if (!collection || !slug) {
    throw createError({ statusCode: 400, statusMessage: 'Brak ścieżki treści' })
  }

  return readFoundationContent(collection, slug)
})
