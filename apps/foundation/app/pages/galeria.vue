<script setup lang="ts">
import type { GalleryItem } from '~/data/site'
import { galleryItems } from '~/data/site'

useSeoMeta({
  title: 'Galeria',
  description: 'Zdjęcia dokumentujące realizacje i wydarzenia Fundacji Zerya.',
})

const filters = ['Wszystkie', 'Hack4Krak', '2026', '2025']
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
    <PageHero label="Galeria" title="Zdjęcia z realizacji" description="Fotografie są dowodem pracy zespołu, skali wydarzeń i zaangażowania uczestników oraz partnerów." />

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
      <div class="mt-8 grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <button
          v-for="item in filteredItems"
          :key="item.id"
          type="button"
          class="group min-h-72 overflow-hidden rounded-sm text-left sm:min-h-80"
          :class="item.featured ? 'lg:col-span-2' : ''"
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
        </button>
      </div>

      <p v-if="!filteredItems.length" class="mt-8 rounded-md bg-white p-8 text-slate-500" role="status">
        Brak zdjęć dla wybranego filtra.
      </p>
    </PageSection>

    <GalleryLightbox :open="isLightboxOpen" :item="selectedItem" @update:open="isLightboxOpen = $event" />
  </main>
</template>
