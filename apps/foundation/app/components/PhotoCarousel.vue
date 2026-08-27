<script setup lang="ts">
interface Slide {
  src?: string
  alt: string
  caption: string
  tone?: 'dark' | 'green' | 'mint' | 'light'
}

defineProps<{
  slides: Slide[]
}>()

const activeIndex = ref(0)
const carousel = useTemplateRef('carousel')

function showSlide(index: number) {
  carousel.value?.emblaApi?.scrollTo(index)
}

function nextSlide() {
  carousel.value?.emblaApi?.scrollNext()
}

function previousSlide() {
  carousel.value?.emblaApi?.scrollPrev()
}
</script>

<template>
  <div class="relative z-1 min-w-0">
    <UCarousel
      ref="carousel"
      v-slot="{ item, index }"
      :items="slides"
      loop
      fade
      :breakpoints="{ '(prefers-reduced-motion: reduce)': { duration: 0 } }"
      aria-roledescription="karuzela"
      aria-label="Zdjęcia z wydarzeń Fundacji Zerya"
      :ui="{ root: 'focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-zerya-500', container: 'flex ms-0', item: 'basis-full ps-0' }"
      @select="activeIndex = $event"
    >
      <figure :aria-hidden="index !== activeIndex" class="relative m-0 h-128 overflow-hidden rounded-sm bg-space-2 after:pointer-events-none after:absolute after:inset-0 after:bg-linear-to-b after:from-transparent after:from-1/2 after:to-black/80 max-lg:h-auto max-lg:aspect-3/2 max-md:aspect-square max-md:max-h-140 max-md:rounded-sm">
        <NuxtImg
          v-if="item.src"
          :src="item.src"
          :alt="item.alt"
          class="h-full w-full object-cover"
          width="1200"
          height="850"
          :fetchpriority="index === 0 ? 'high' : 'auto'"
          :loading="index === 0 ? 'eager' : 'lazy'"
        />
        <ImagePlaceholder v-else :label="item.alt" :tone="item.tone || 'green'" />
        <figcaption class="absolute right-6 bottom-6 left-6 z-1 flex items-end justify-between gap-4 text-sm font-semibold text-white max-md:right-4 max-md:bottom-4 max-md:left-4">
          <span class="max-md:max-w-3/4">{{ item.caption }}</span>
          <span class="text-xs tracking-widest text-slate-300">{{ String(index + 1).padStart(2, '0') }} / {{ String(slides.length).padStart(2, '0') }}</span>
        </figcaption>
      </figure>
    </UCarousel>

    <div v-if="slides.length" class="mt-4 flex items-center justify-end gap-4" @keydown.left.prevent="previousSlide" @keydown.right.prevent="nextSlide">
      <UButton
        type="button"
        aria-label="Poprzednie zdjęcie"
        color="neutral"
        variant="outline"
        class="size-12 justify-center rounded-md border-white/25 bg-transparent p-0 text-white hover:border-zerya-500 hover:bg-zerya-500/10"
        @click="previousSlide"
      >
        <UIcon name="i-lucide-arrow-left" class="size-5" aria-hidden="true" />
      </UButton>
      <div class="mr-auto flex gap-2" aria-label="Wybierz zdjęcie">
        <button
          v-for="(_, index) in slides"
          :key="index"
          type="button"
          class="h-1 w-6 rounded-md border-0 bg-white/30 p-0 transition-all"
          :class="{ 'w-12 bg-zerya-500': index === activeIndex }"
          :aria-label="`Pokaż zdjęcie ${index + 1}`"
          :aria-current="index === activeIndex ? 'true' : undefined"
          @click="showSlide(index)"
        />
      </div>
      <UButton
        type="button"
        aria-label="Następne zdjęcie"
        color="neutral"
        variant="outline"
        class="size-12 justify-center rounded-md border-white/25 bg-transparent p-0 text-white hover:border-zerya-500 hover:bg-zerya-500/10"
        @click="nextSlide"
      >
        <UIcon name="i-lucide-arrow-right" class="size-5" aria-hidden="true" />
      </UButton>
    </div>
  </div>
</template>
