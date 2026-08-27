<script setup lang="ts">
interface Slide {
  src?: string
  alt: string
  caption: string
  tone?: 'dark' | 'green' | 'mint' | 'light'
}

const props = defineProps<{
  slides: Slide[]
}>()

const activeIndex = ref(0)

const activeSlide = computed(() => props.slides[activeIndex.value])

function showSlide(index: number) {
  activeIndex.value = (index + props.slides.length) % props.slides.length
}

function nextSlide() {
  showSlide(activeIndex.value + 1)
}

function previousSlide() {
  showSlide(activeIndex.value - 1)
}
</script>

<template>
  <div
    class="relative z-1 min-w-0"
    role="region"
    aria-roledescription="karuzela"
    aria-label="Zdjęcia z wydarzeń Fundacji Zerya"
    tabindex="0"
    @keydown.left.prevent="previousSlide"
    @keydown.right.prevent="nextSlide"
  >
    <figure v-if="activeSlide" class="relative m-0 h-128 overflow-hidden rounded-sm bg-space-2 after:pointer-events-none after:absolute after:inset-0 after:bg-linear-to-b after:from-transparent after:from-1/2 after:to-black/80 max-lg:h-auto max-lg:aspect-3/2 max-md:aspect-square max-md:max-h-140 max-md:rounded-sm">
      <Transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="scale-105 opacity-0"
        leave-active-class="transition duration-200 ease-in"
        leave-to-class="opacity-0"
        mode="out-in"
      >
        <img
          v-if="activeSlide.src"
          :key="activeSlide.src"
          :src="activeSlide.src"
          :alt="activeSlide.alt"
          class="h-full w-full object-cover"
          width="1200"
          height="850"
          fetchpriority="high"
        >
        <ImagePlaceholder v-else :key="activeSlide.alt" :label="activeSlide.alt" :tone="activeSlide.tone || 'green'" />
      </Transition>
      <figcaption class="absolute right-6 bottom-6 left-6 z-1 flex items-end justify-between gap-4 text-sm font-semibold text-white max-md:right-4 max-md:bottom-4 max-md:left-4">
        <span class="max-md:max-w-3/4">{{ activeSlide.caption }}</span>
        <span class="text-xs tracking-widest text-slate-300">{{ String(activeIndex + 1).padStart(2, '0') }} / {{ String(slides.length).padStart(2, '0') }}</span>
      </figcaption>
    </figure>

    <div class="mt-4 flex items-center justify-end gap-4">
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
