<script setup lang="ts">
import type { GalleryItem } from '~/types/content'

const { data: galleryContent } = await useFoundationData('site/gallery', 'foundation-gallery')

if (!galleryContent.value) {
  throw createError({ statusCode: 500, statusMessage: 'Brak wymaganej treści galerii' })
}

const content = galleryContent.value
const galleryItems = content.items

useSeoMeta({
  title: content.hero.title,
  description: content.hero.description,
})

const filters = content.filters
const activeFilter = ref('Wszystkie')
const selectedItem = ref<GalleryItem>()
const isLightboxOpen = ref(false)

const filteredItems = computed(() => {
  if (activeFilter.value === 'Wszystkie') {
    return galleryItems
  }
  return galleryItems.filter(item => item.project === activeFilter.value || item.year === activeFilter.value)
})

function openItem(item: GalleryItem) {
  selectedItem.value = item
  isLightboxOpen.value = true
}
</script>

<template>
  <main id="main-content">
    <PageHero :label="content.hero.label" :title="content.hero.title" :description="content.hero.description" />

    <PageSection color="bg-canvas" label="gallery-title">
      <div class="flex flex-wrap gap-2" aria-label="Filtry galerii">
        <UButton
          v-for="filter in filters"
          :key="filter"
          :color="activeFilter === filter ? 'primary' : 'neutral'"
          :variant="activeFilter === filter ? 'solid' : 'outline'"
          class="rounded-md px-5 font-bold"
          :aria-pressed="activeFilter === filter"
          @click="activeFilter = filter"
        >
          {{ filter }}
        </UButton>
      </div>

      <h2 id="gallery-title" class="sr-only">
        Fotografie
      </h2>
      <div class="mt-8 flex flex-wrap gap-4">
        <UButton
          v-for="item in filteredItems"
          :key="item.id"
          type="button"
          color="neutral"
          variant="ghost"
          class="group block h-72 w-full min-w-0 overflow-hidden rounded-sm p-0 text-left font-normal whitespace-normal sm:h-80 sm:w-[calc((100%-1rem)/2)]"
          :class="item.featured ? 'lg:w-[calc((200%-1rem)/3)]' : 'lg:w-[calc((100%-2rem)/3)]'"
          :aria-label="`Otwórz zdjęcie: ${item.label}`"
          @click="openItem(item)"
        >
          <div class="relative h-full overflow-hidden">
            <ImagePlaceholder :label="item.label" :tone="item.tone" class="transition-transform duration-300 group-hover:scale-105" />
            <div class="absolute inset-x-0 bottom-0 bg-space/90 p-6 text-white">
              <strong class="block text-sm">{{ item.project }}</strong>
              <span class="mt-1 block text-xs text-slate-300">{{ item.date }} · {{ item.place }}</span>
            </div>
          </div>
        </UButton>
      </div>

      <p v-if="!filteredItems.length" class="mt-8 rounded-md bg-white p-8 text-slate-500" role="status">
        Brak zdjęć dla wybranego filtra.
      </p>
    </PageSection>

    <GalleryLightbox :open="isLightboxOpen" :item="selectedItem" @update:open="isLightboxOpen = $event" />
  </main>
</template>
