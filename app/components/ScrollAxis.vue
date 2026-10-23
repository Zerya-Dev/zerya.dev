<script setup lang="ts">
// Replaces the browser scrollbar (hidden in main.css): the spark from the logo travels down the axis
// with page progress, and the axis can be clicked or dragged. Phones go without a scrollbar at all.
const axis = useTemplateRef('axis')
const track = useTemplateRef('track')
const { y } = useWindowScroll()
const { height } = useWindowSize()
const { height: pageHeight } = useElementSize(() => import.meta.client ? document.body : null, undefined, { box: 'border-box' })
const progress = useCssVar('--s', axis)

const maxScroll = computed(() => Math.max(pageHeight.value - height.value, 0))

// Written straight to the DOM so scrolling never re-renders the page
watchEffect(() => {
  progress.value = (maxScroll.value ? Math.min(Math.max(y.value / maxScroll.value, 0), 1) : 0).toFixed(4)
})

function scrollToPointer(event: PointerEvent) {
  if (!track.value)
    return
  const rect = track.value.getBoundingClientRect()
  const ratio = Math.min(Math.max((event.clientY - rect.top) / rect.height, 0), 1)
  window.scrollTo({ top: ratio * maxScroll.value, behavior: 'instant' })
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

// Ticks light up top to bottom while the axis is being drawn
const ticks = Array.from({ length: 13 }, (_, i) => ({
  class: i % 6 === 0 ? 'w-3 bg-paper/45' : 'w-2 bg-paper/20',
  style: { '--d': `${2100 + i * 60}ms` },
}))
</script>

<template>
  <div
    ref="axis"
    class="fixed inset-y-0 right-0 z-40 hidden w-6 cursor-pointer py-8 mix-blend-difference touch-none select-none [--s:0] md:block"
    aria-hidden="true"
    @pointerdown="onPointerDown"
    @pointermove="onPointerMove"
  >
    <div ref="track" class="relative mx-auto h-full w-4">
      <div class="absolute inset-0 flex flex-col items-center justify-between">
        <span v-for="(tick, i) in ticks" :key="i" class="intro-tick h-px" :class="tick.class" :style="tick.style" />
      </div>
      <div class="intro-draw absolute inset-y-0 left-1/2 w-px bg-paper/15 [--d:2000ms]" />
      <div class="axis-trail absolute top-0 left-1/2 w-px bg-paper/70" />
      <svg class="axis-spark intro-spark absolute left-1/2 size-4 text-paper [--d:2900ms]" viewBox="0 0 16 16" fill="currentColor">
        <path d="M8 0 9.3 6.7 16 8 9.3 9.3 8 16 6.7 9.3 0 8 6.7 6.7Z" />
      </svg>
    </div>
  </div>
</template>

<style scoped>
/* `--s` (page scroll progress, 0 → 1) is set on the root by the script */

.axis-trail {
  height: calc(var(--s) * 100%);
}

.axis-spark {
  top: calc(var(--s) * 100%);
  translate: -50% -50%;
}

@media (prefers-reduced-motion: no-preference) {
  .axis-spark {
    rotate: calc(var(--s) * 360deg);
  }

  /* Intro choreography in step with the hero, `--d` is each element's delay */
  div {
    --ease: cubic-bezier(0.16, 1, 0.3, 1);
  }

  .intro-draw {
    transform-origin: top;
    animation: draw 1800ms var(--ease) var(--d) both;
  }

  .intro-tick {
    animation: fade 800ms ease-out var(--d) both;
  }

  .intro-spark {
    animation: spark 1600ms var(--ease) var(--d) both;
  }
}

@keyframes draw {
  from {
    transform: scaleY(0);
  }
}

@keyframes fade {
  from {
    opacity: 0;
  }
}

@keyframes spark {
  from {
    opacity: 0;
    transform: scale(0) rotate(-180deg);
  }
}
</style>
