<script setup lang="ts">
// Replaces the browser scrollbar: the spark from the logo travels down a hairline with page progress (`--s`),
// and the axis can be clicked or dragged. Phones go without a scrollbar at all.
const track = useTemplateRef('track')
// Arrives last, after the hero's intro
const ready = useState('hero-ready', () => false)

function scrollToPointer(event: PointerEvent) {
  if (!track.value)
    return
  const rect = track.value.getBoundingClientRect()
  const ratio = Math.min(Math.max((event.clientY - rect.top) / rect.height, 0), 1)
  window.scrollTo({ top: ratio * (document.documentElement.scrollHeight - window.innerHeight), behavior: 'instant' })
}

function onPointerDown(event: PointerEvent) {
  if (event.button !== 0)
    return
  event.preventDefault()
  ;(event.currentTarget as HTMLElement).setPointerCapture(event.pointerId)
  scrollToPointer(event)
}

function onPointerMove(event: PointerEvent) {
  if ((event.currentTarget as HTMLElement).hasPointerCapture(event.pointerId))
    scrollToPointer(event)
}
</script>

<template>
  <div
    class="site-axis fixed inset-y-0 right-0 z-40 hidden w-6 cursor-pointer py-8 mix-blend-difference touch-none select-none transition-opacity delay-[2200ms] duration-700 md:block"
    :class="ready ? 'opacity-100' : 'opacity-0'"
    aria-hidden="true"
    @pointerdown="onPointerDown"
    @pointermove="onPointerMove"
  >
    <div ref="track" class="relative mx-auto h-full w-4">
      <div class="absolute inset-y-0 left-1/2 w-px bg-paper/15" />
      <div class="absolute top-0 left-1/2 h-[calc(var(--s,0)*100%)] w-px bg-paper/70" />
      <svg class="absolute top-[calc(var(--s,0)*100%)] left-1/2 size-4 -translate-1/2 text-paper motion-safe:rotate-[calc(var(--s,0)*360deg)]" viewBox="0 0 16 16" fill="currentColor">
        <path d="M8 0 9.3 6.7 16 8 9.3 9.3 8 16 6.7 9.3 0 8 6.7 6.7Z" />
      </svg>
    </div>
  </div>
</template>
