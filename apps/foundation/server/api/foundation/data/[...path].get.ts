export default defineEventHandler((event) => {
  const path = getRouterParam(event, 'path')

  if (!path) {
    throw createError({ statusCode: 400, statusMessage: 'Brak ścieżki danych' })
  }

  return readFoundationData(path)
})
