<script setup lang="ts">
const contactDialog = useContactDialog()
const hero = useTemplateRef('hero')
const video = useTemplateRef('video')
const reducedMotion = usePreferredReducedMotion()
const visible = useElementVisibility(hero)

// The loop only plays while the hero is on screen
watchEffect(() => {
  if (!video.value)
    return
  if (reducedMotion.value === 'reduce' || !visible.value)
    video.value.pause()
  else
    video.value.play().catch(() => {})
})

// Ticks light up left to right while the axis is being drawn
const ticks = Array.from({ length: 13 }, (_, i) => ({
  class: i % 6 === 0 ? 'h-3 bg-paper/45' : 'h-2 bg-paper/20',
  style: { '--d': `${2100 + i * 60}ms` },
}))
</script>

<template>
  <section ref="hero" class="relative isolate z-10 flex min-h-svh flex-col overflow-hidden bg-night">
    <div class="hero-far pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
      <video
        ref="video"
        class="absolute bottom-[calc(14.5rem-30.7vw)] -left-[145vw] h-auto w-[260vw] max-w-none md:bottom-0 md:left-1/2 md:w-[max(100vw,160svh)] md:-translate-x-1/2 intro-sky select-none [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent),linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] [mask-composite:intersect] md:[mask-image:linear-gradient(to_bottom,transparent,black_15%),linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
        poster="/img/aurora-poster.webp"
        width="1920"
        height="1080"
        preload="none"
        muted
        loop
        playsinline
        disablepictureinpicture
      >
        <source src="/video/aurora-loop-av1.mp4" type="video/mp4; codecs=av01.0.08M.08">
        <source src="/video/aurora-loop.mp4" type="video/mp4">
      </video>
      <div class="absolute inset-0 bg-[linear-gradient(to_right,rgb(10_10_10/0.8)_0%,rgb(10_10_10/0.6)_20%,rgb(10_10_10/0.3)_40%,transparent_64%)]" />
    </div>

    <div class="intro-fade [--d:2400ms]">
      <SiteNavbar />
    </div>

    <div class="hero-near mx-auto w-full max-w-[1328px] px-6 pt-[14svh] md:px-16 md:pt-[18svh]">
      <h1 class="text-[40px]/[48px] font-medium tracking-[-0.03em] text-paper md:text-[56px]/[64px] xl:text-[72px]/[80px]">
        <span class="reveal opacity-50"><span class="intro-line block [--d:200ms]">Software to nie cel.</span></span>
        <span class="reveal"><span class="intro-line block [--d:450ms]">Liczy się problem,</span></span>
        <span class="reveal"><span class="intro-line block whitespace-nowrap [--d:700ms]">który <span class="dissolve halftone">znika.</span></span></span>
      </h1>

      <p class="intro-fade mt-12 max-w-[32ch] text-base text-paper/75 [--d:1700ms] md:text-lg/7">
        Zerya<sup class="text-[0.5em]" aria-label="copyright">&copy;</sup> tworzy własne produkty cyfrowe i&nbsp;oprogramowanie dla firm.
      </p>

      <div class="intro-fade mt-8 flex flex-wrap items-center gap-x-8 gap-y-4 [--d:1900ms]">
        <UButton color="neutral" size="xl" label="Porozmawiajmy" trailing-icon="i-lucide-arrow-right" @click="contactDialog.open('hero')" />
        <UButton :to="`mailto:${CONTACT_EMAIL}`" :label="CONTACT_EMAIL" color="neutral" variant="link" class="p-0" />
      </div>
    </div>

    <!-- Scroll axis: the spark from the logo travels along it with page progress -->
    <div class="mx-auto mt-auto w-full max-w-[1328px] px-6 pt-16 pb-6 md:px-16 md:pb-8" aria-hidden="true">
      <div class="intro-fade flex items-baseline justify-between font-mono text-xs text-dimmed [--d:2600ms]">
        <span>69°N</span>
        <span>↓</span>
      </div>
      <div class="relative mt-2 h-4">
        <div class="absolute inset-0 flex items-center justify-between">
          <span v-for="(tick, i) in ticks" :key="i" class="intro-tick w-px" :class="tick.class" :style="tick.style" />
        </div>
        <div class="intro-draw absolute inset-x-0 top-1/2 h-px bg-paper/15 [--d:2000ms]" />
        <div class="hero-trail absolute top-1/2 left-0 h-px bg-paper/70" />
        <svg class="hero-spark intro-spark absolute top-1/2 size-4 text-paper [--d:2900ms]" viewBox="0 0 16 16" fill="currentColor">
          <path d="M8 0 9.3 6.7 16 8 9.3 9.3 8 16 6.7 9.3 0 8 6.7 6.7Z" />
        </svg>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* `--p` (scroll progress, 0 → 1) is set on <main> by the page */

@property --ink {
  syntax: '<number>';
  inherits: false;
  initial-value: 1;
}

/* Halftone word: the dots shrink as the reader scrolls, so the problem literally disappears */
.dissolve {
  --fade: min(1, calc(var(--p) * 2));
  --dot: calc(0.1 + 0.62 * var(--ink) * (1 - var(--fade)));

  display: inline-block;
  color: transparent;
  background: linear-gradient(135deg, var(--color-aurora), var(--color-aurora-light));
  -webkit-background-clip: text;
  background-clip: text;
}

/* Line mask for the headline; the padding keeps accents and descenders inside the clip */
.reveal {
  display: block;
  overflow: hidden;
  padding: 0.12em 0.08em 0.2em;
  margin: -0.12em -0.08em -0.2em;
}

.hero-trail {
  width: calc(var(--p) * 100%);
}

.hero-spark {
  left: calc(var(--p) * 100%);
  translate: -50% -50%;
}

@media (prefers-reduced-motion: no-preference) {
  .hero-far {
    transform: translate3d(0, calc(var(--p) * 32svh), 0) scale(calc(1 + var(--p) * 0.08));
    transform-origin: 50% 100%;
    will-change: transform;
  }

  .hero-near {
    transform: translate3d(0, calc(var(--p) * -12svh), 0);
    opacity: calc(1 - var(--p) * 1.5);
  }

  .hero-spark {
    rotate: calc(var(--p) * 180deg);
  }

  /* Intro choreography, `--d` is each element's delay */
  section {
    --ease: cubic-bezier(0.16, 1, 0.3, 1);
  }

  .intro-sky {
    animation: sky 3200ms var(--ease) both;
  }

  .intro-line {
    animation: line-up 1400ms var(--ease) var(--d) both;
  }

  .intro-fade {
    animation: fade-up 1400ms var(--ease) var(--d) both;
  }

  .intro-draw {
    transform-origin: left;
    animation: draw 1800ms var(--ease) var(--d) both;
  }

  .intro-tick {
    animation: fade 800ms ease-out var(--d) both;
  }

  .intro-spark {
    animation: spark 1600ms var(--ease) var(--d) both;
  }

  .dissolve {
    animation: ink-in 2400ms var(--ease) 1200ms both;
  }
}

@keyframes sky {
  from {
    opacity: 0;
    transform: scale(1.08) translateY(4%);
  }
}

@keyframes line-up {
  from {
    opacity: 0;
    transform: translateY(105%);
  }
}

@keyframes fade-up {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
}

@keyframes draw {
  from {
    transform: scaleX(0);
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

@keyframes ink-in {
  from {
    --ink: 0;
  }
}
</style>
