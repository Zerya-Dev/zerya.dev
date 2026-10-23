<script setup lang="ts">
const contactDialog = useContactDialog()
const hero = useTemplateRef('hero')
const video = useTemplateRef('video')
const reducedMotion = usePreferredReducedMotion()
const visible = useElementVisibility(hero)

const POSTER = '/img/aurora-poster.webp'

// The sky fades in once its poster has fully decoded: a poster still loading paints in strips from the top.
// A slow connection gets the fade after a few seconds anyway.
const skyReady = ref(false)

onMounted(() => {
  const poster = new Image()
  poster.src = POSTER
  Promise.race([poster.decode(), new Promise(resolve => setTimeout(resolve, 4000))])
    .catch(() => {})
    .finally(() => skyReady.value = true)
})

// The loop only plays while the hero is on screen
watchEffect(() => {
  if (!video.value)
    return
  if (reducedMotion.value === 'reduce' || !visible.value)
    video.value.pause()
  else
    video.value.play().catch(() => {})
})

// The sky and the land share one 16:9 frame: cropped from the left on phones, anchored to the bottom on wider screens
const frame = 'absolute inset-y-0 left-0 h-full w-auto max-w-none -translate-x-[58%] object-cover md:inset-y-auto md:bottom-0 md:left-1/2 md:h-auto md:w-[max(100vw,160svh)] md:-translate-x-1/2'

// The land is cut out of the sky as a mask, sized and placed from an invisible copy in the same frame.
// It sits 7 % lower than in the print, so the ridge leaves the sky more room.
const sky = useTemplateRef('sky')
const land = useTemplateRef('land')
// The land rises into place with the sky once it has been measured, until then the sky has no cut-out
const landReady = ref(false)

useResizeObserver(hero, () => {
  if (!hero.value || !sky.value || !land.value)
    return
  // The copy moves with the sky layer, so the offset holds whatever transform the layer has at the moment
  const box = sky.value.getBoundingClientRect()
  const rect = land.value.getBoundingClientRect()
  sky.value.style.setProperty('--land-x', `${rect.left - box.left}px`)
  sky.value.style.setProperty('--land-y', `${rect.top - box.top + hero.value.offsetHeight * 0.07}px`)
  sky.value.style.setProperty('--land-w', `${rect.width}px`)
  sky.value.style.setProperty('--land-h', `${rect.height}px`)
  landReady.value = true
})
</script>

<template>
  <section ref="hero" class="relative isolate z-10 flex flex-col overflow-hidden pb-24 md:min-h-svh md:pb-0">
    <!-- The sky with the land cut out: below the ridge the hero is transparent and the page shows through.
         The mask never moves within its layer: the whole layer moves with the land and the sky inside moves back,
         so the rise and the scroll stay on the compositor. It reaches half a screen above the hero for the rise. -->
    <div ref="sky" class="hero-sky pointer-events-none absolute inset-x-0 -top-[50svh] bottom-0 -z-10 bg-night" :class="{ 'intro-land': landReady && skyReady }" aria-hidden="true">
      <div class="absolute inset-x-0 top-[50svh] bottom-0">
        <img ref="land" src="/img/aurora-land.svg" alt="" width="1920" height="1080" :class="frame" class="invisible">
        <div class="hero-far absolute inset-0">
          <video
            ref="video"
            :class="[frame, skyReady ? 'intro-sky' : 'opacity-0']"
            class="select-none [mask-image:linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)] md:[mask-composite:intersect] md:[mask-image:linear-gradient(to_bottom,transparent,black_15%),linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
            :poster="POSTER"
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
      </div>
    </div>

    <div class="intro-fade [--d:2400ms]">
      <SiteNavbar />
    </div>

    <!-- The hero is the first scene of the story, the headline is set like a page of it: a narrator's line, then the
         problem, then the word that dissolves, each stepping further in -->
    <div class="hero-near mx-auto w-full max-w-[1328px] px-6 pt-[8svh] md:px-16 md:pt-[14svh]">
      <p class="intro-fade flex items-center gap-3 font-mono text-xs tracking-[0.2em] text-paper/50 uppercase [--d:100ms]">
        <span>I</span>
        <span class="h-px w-10 bg-paper/30" />
        <span>Problem</span>
      </p>

      <h1 class="mt-8 font-medium tracking-[-0.03em] text-paper md:mt-12">
        <span class="reveal text-lg/7 tracking-normal text-paper/55 md:text-[22px]/8"><span class="intro-line block [--d:200ms]">Software to nie cel.</span></span>
        <span class="reveal mt-3 text-[40px]/[48px] md:mt-4 md:text-[64px]/[72px] xl:text-[88px]/[96px]"><span class="intro-line block md:pl-[6%] [--d:450ms]">Liczy się problem,</span></span>
        <span class="reveal text-[40px]/[48px] md:text-[64px]/[72px] xl:text-[88px]/[96px]"><span class="intro-line block whitespace-nowrap md:pl-[14%] [--d:700ms]">który <span class="dissolve halftone text-[1.4em]/[1]">znika.</span></span></span>
      </h1>

      <div class="mt-10 md:mt-14 md:ml-[14%]">
        <p class="intro-fade max-w-[32ch] border-l border-paper/25 pl-5 text-base text-paper/75 [--d:1700ms] md:text-lg/7">
          Zerya<sup class="text-[0.5em]" aria-label="copyright">&copy;</sup> tworzy własne produkty cyfrowe i&nbsp;oprogramowanie dla firm.
        </p>

        <div class="intro-fade mt-8 flex flex-wrap items-center gap-x-8 gap-y-4 [--d:1900ms]">
          <UButton color="neutral" size="xl" label="Porozmawiajmy" trailing-icon="i-lucide-arrow-right" class="w-full bg-night/60 text-aurora ring ring-aurora/50 backdrop-blur-sm hover:bg-night/80 active:bg-night/80 md:w-auto md:bg-paper md:text-ink md:ring-0 md:hover:bg-aurora-light md:active:bg-aurora-light" @click="contactDialog.open('hero')" />
          <UButton :to="`mailto:${CONTACT_EMAIL}`" :label="CONTACT_EMAIL" color="neutral" variant="link" class="hidden p-0 md:inline-flex" />
        </div>
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

/* Everything but the land, the mask is the frame of the land copy */
.hero-sky {
  --land: url('/img/aurora-land.svg');

  -webkit-mask-image: linear-gradient(#000 0 0), var(--land);
  mask-image: linear-gradient(#000 0 0), var(--land);
  -webkit-mask-size:
    100% 100%,
    var(--land-w, 0) var(--land-h, 0);
  mask-size:
    100% 100%,
    var(--land-w, 0) var(--land-h, 0);
  -webkit-mask-position:
    0 0,
    var(--land-x, 0) var(--land-y, 0);
  mask-position:
    0 0,
    var(--land-x, 0) var(--land-y, 0);
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-composite: source-out;
  mask-composite: subtract;
}

/* Line mask for the headline; the padding keeps accents and descenders inside the clip */
.reveal {
  display: block;
  overflow: hidden;
  padding: 0.12em 0.08em 0.2em;
  margin: -0.12em -0.08em -0.2em;
}

@media (prefers-reduced-motion: no-preference) {
  /* Over the first screen the land sinks by 12svh and the sky inside it by 20svh more, so the land overtakes the sky */
  .hero-sky {
    transform: translate3d(0, calc(var(--p) * 12svh), 0);
    will-change: transform;
  }

  .hero-far {
    transform: translate3d(0, calc(var(--p) * 20svh), 0) scale(calc(1 + var(--p) * 0.08));
    transform-origin: 50% 100%;
    will-change: transform;
  }

  .hero-near {
    transform: translate3d(0, calc(var(--p) * -12svh), 0);
    opacity: calc(1 - var(--p) * 1.5);
  }

  /* Intro choreography, `--d` is each element's delay */
  section {
    --ease: cubic-bezier(0.16, 1, 0.3, 1);
  }

  .intro-sky {
    animation: sky 3200ms var(--ease) both;
  }

  /* The ridge comes up from below the hero while the sky fades in */
  .intro-land {
    animation: land-up 2600ms var(--ease) both;
  }

  .intro-land .hero-far {
    animation: sky-hold 2600ms var(--ease) both;
  }

  .intro-line {
    animation: line-up 1400ms var(--ease) var(--d) both;
  }

  .intro-fade {
    animation: fade-up 1400ms var(--ease) var(--d) both;
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

@keyframes land-up {
  from {
    transform: translate3d(0, 40svh, 0);
  }
}

/* The exact opposite of the rise, so the sky stays put */
@keyframes sky-hold {
  from {
    transform: translate3d(0, -40svh, 0);
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

@keyframes ink-in {
  from {
    --ink: 0;
  }
}
</style>
