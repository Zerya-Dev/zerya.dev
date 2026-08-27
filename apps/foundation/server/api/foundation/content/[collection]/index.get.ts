export default defineEventHandler((event) => {
  const collection = getRouterParam(event, 'collection')

  if (!collection) {
    throw createError({ statusCode: 400, statusMessage: 'Brak nazwy kolekcji' })
  }

  return listFoundationContent(collection)
})
