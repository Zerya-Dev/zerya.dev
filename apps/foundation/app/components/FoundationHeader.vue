<script setup lang="ts">
const { data: siteNavigation } = await useFoundationNavigation()
const { data: siteSettings } = await useFoundationSettings()

const navigationItems = computed(() => (siteNavigation.value?.items ?? []).map(item => ({ ...item, exact: item.to === '/' })))
const featuredLink = computed(() => siteSettings.value?.featuredLink)
const navigationUi = {
  list: 'gap-4 lg:gap-6',
  link: 'px-0 py-2 text-sm font-semibold text-slate-700 hover:text-zerya-700 data-active:text-zerya-700',
  linkLabel: 'underline-offset-8 group-data-active:underline',
}
</script>

<template>
  <UHeader
    title="Fundacja Zerya — strona główna"
    class="h-24 border-space/10 bg-white/93 backdrop-blur-2xl max-md:h-22"
    :ui="{
      container: 'max-w-7xl gap-6 px-6 max-md:px-4',
      left: 'lg:flex-none',
      center: 'ml-auto',
      right: 'lg:flex-none',
      header: 'h-24 max-md:h-22',
      content: 'flex flex-col bg-white',
    }"
    :menu="{ title: 'Nawigacja', description: 'Główna nawigacja Fundacji Zerya' }"
  >
    <template #title>
      <FoundationLogo dark />
    </template>

    <UNavigationMenu :items="navigationItems" :ui="navigationUi" variant="link" aria-label="Główna nawigacja" />

    <template #right>
      <UButton
        :to="featuredLink?.external ? undefined : featuredLink?.to"
        :href="featuredLink?.external ? featuredLink.to : undefined"
        target="_blank"
        rel="noopener noreferrer"
        color="neutral"
        size="lg"
        trailing-icon="i-lucide-arrow-up-right"
        class="ml-4 min-h-12 rounded-md bg-space px-6 font-bold text-white hover:bg-space-2 max-lg:hidden"
      >
        {{ featuredLink?.label }}
        <span class="sr-only">(otwiera się w nowej karcie)</span>
      </UButton>
    </template>

    <template #toggle="{ open, toggle }">
      <UButton
        :icon="open ? 'i-lucide-x' : 'i-lucide-menu'"
        :aria-label="open ? 'Zamknij menu' : 'Otwórz menu'"
        :aria-expanded="open"
        color="neutral"
        variant="outline"
        class="size-12 justify-center rounded-md lg:hidden"
        @click="toggle"
      />
    </template>

    <template #body>
      <UNavigationMenu
        :items="navigationItems"
        orientation="vertical"
        variant="link"
        :ui="{ ...navigationUi, list: 'flex flex-col', link: 'border-b border-slate-200 py-4 font-bold data-active:text-zerya-700' }"
        aria-label="Mobilna nawigacja"
      />
      <UButton :to="featuredLink?.external ? undefined : featuredLink?.to" :href="featuredLink?.external ? featuredLink.to : undefined" target="_blank" rel="noopener noreferrer" variant="link" trailing-icon="i-lucide-arrow-up-right" class="mt-4 px-0 py-4 font-bold">
        {{ featuredLink?.label }}
        <span class="sr-only">(otwiera się w nowej karcie)</span>
      </UButton>
    </template>
  </UHeader>
</template>
