<script setup lang="ts">
// The hero is pinned for a while. As the reader scrolls, the headline goes, the problem dissolves,
// and the aurora closes down to a single line of light: the line every later section opens from.
const contactDialog = useContactDialog()
const video = useTemplateRef('video')
const reducedMotion = usePreferredReducedMotion()
const hero = useTemplateRef('hero')
const visible = useElementVisibility(hero)

const POSTER = '/img/aurora-poster.webp'

const LAND = '/img/land/aurora-land'
// The land in three planes; the nearer a plane, the further it travels as the hero scrolls
const LAYERS = [
  { name: 'far', depth: 0.2 },
  { name: 'mid', depth: 0.45 },
  { name: 'near', depth: 1.1 },
]

// The intro waits for its pictures: a poster still loading paints in strips from the top. Once the sky
// and the land have decoded, the sky comes first, then the headline line by line, then everything else.
// Shared with the axis, which arrives last.
const ready = useState('hero-ready', () => false)
// Without scripts nothing would ever say the pictures are in
useHead({
  noscript: [{ innerHTML: '<style>.hero-sky video,.site-axis {opacity:1!important} .intro-line,.intro-fade,.hero-land,.dissolve {animation-play-state:running!important} .hero-loader {display:none}</style>' }],
})
const land = useTemplateRef<HTMLImageElement[]>('land')
onMounted(() => {
  const poster = new Image()
  poster.src = POSTER
  const pictures = [poster, ...(land.value ?? [])].map(image => image.decode().catch(() => {}))
  Promise.race([Promise.all(pictures), new Promise(resolve => setTimeout(resolve, 4000))])
    .finally(() => ready.value = true)
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

const links = [
  { label: 'Projekty', to: '#projekty' },
  { label: 'Zespół', to: '#zespol' },
  { label: 'Kontakt', to: '#napisz' },
]
</script>

<template>
  <section ref="hero" data-scene class="relative h-[220svh] bg-night [--p:0]" :class="{ 'is-ready': ready }">
    <div class="sticky top-0 h-svh overflow-hidden">
      <div class="hero-sky absolute inset-0" aria-hidden="true">
        <video
          ref="video"
          class="absolute inset-0 size-full object-cover object-[72%_100%] transition-opacity duration-[1400ms]"
          :class="ready ? 'opacity-100' : 'opacity-0'"
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
        <!-- A soft shade behind the centred text, where the aurora is brightest -->
        <div class="absolute inset-0 bg-[radial-gradient(ellipse_55%_50%_at_50%_42%,rgb(10_10_10/0.45),transparent)]" />
        <!-- The horizon in the aurora loop's own dark, its edge printed: starved of ink below, spattered above -->
        <div class="absolute bottom-0 left-0 aspect-video w-[260%] max-w-none -translate-x-[55%] translate-y-[8%] md:w-full md:translate-x-0 md:translate-y-[14%]">
          <img
            v-for="(layer, i) in LAYERS"
            ref="land"
            :key="layer.name"
            :src="`${LAND}-${layer.name}.webp`"
            :srcset="`${LAND}-${layer.name}.webp 1920w, ${LAND}-${layer.name}@2x.webp 3840w`"
            sizes="(min-width: 768px) 100vw, 260vw"
            alt=""
            width="1920"
            height="1080"
            class="hero-land absolute inset-0 size-full"
            :style="{ '--depth': layer.depth, '--i': i }"
          >
        </div>
      </div>
      <!-- Only while the pictures are still on their way: the logo's spark turning, shown if the wait is long enough to notice -->
      <svg class="hero-loader pointer-events-none absolute top-1/2 left-1/2 size-5 -translate-1/2 text-paper" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
        <path d="M8 0 9.3 6.7 16 8 9.3 9.3 8 16 6.7 9.3 0 8 6.7 6.7Z" />
      </svg>
      <!-- What is left of the aurora once it has closed, and the projects heading waiting under it -->
      <div class="hero-line absolute inset-x-0 top-1/2 h-px bg-linear-to-r from-transparent via-aurora to-transparent" aria-hidden="true" />
      <div class="hero-next absolute inset-x-0 top-[calc(50%+48px)] mx-auto w-full max-w-[1328px] px-6 md:px-16">
        <p class="text-xs font-medium text-paper/55">
          Nasze projekty
        </p>
        <h2 class="mt-4 max-w-[14ch] text-[36px]/[44px] font-semibold tracking-[-0.035em] md:text-[64px]/[68px] xl:text-[80px]/[84px]">
          Problemy, które rozwiązujemy.
        </h2>
      </div>

      <div class="hero-near relative flex h-full flex-col">
        <header class="intro-fade mx-auto flex w-full max-w-[1328px] items-center justify-between gap-6 px-6 pt-6 [--d:2100ms] md:px-16 md:pt-8">
          <NuxtLink to="/" class="shrink-0">
            <img src="/img/logo.svg" alt="Zerya" width="133" height="64" class="h-7 w-auto md:h-8">
          </NuxtLink>
          <nav aria-label="Główna nawigacja">
            <ul class="flex gap-6 md:gap-8">
              <li v-for="(link, i) in links" :key="link.to" :class="{ 'hidden md:block': i < links.length - 1 }">
                <a :href="link.to" class="text-sm text-paper/70 transition-colors hover:text-paper">{{ link.label }}</a>
              </li>
            </ul>
          </nav>
        </header>

        <!-- Centred like the opening page of a novel: a first line, the title, and the spark from the logo as the break before the story -->
        <div class="mx-auto flex w-full max-w-[1328px] flex-1 flex-col items-center justify-center px-6 pb-[18svh] text-center md:px-16 md:pb-[14svh]">
          <p class="intro-fade text-base/6 text-(--color-dimmed) [--d:500ms] md:text-lg/7">
            Software to nie cel.
          </p>
          <h1 class="mt-3 text-[40px]/[48px] font-semibold tracking-[-0.035em] text-paper md:text-[64px]/[68px] xl:text-[80px]/[84px]">
            <span class="reveal"><span class="intro-line block [--d:1100ms]">Liczy się problem,</span></span>
            <span class="reveal"><span class="intro-line block whitespace-nowrap [--d:1350ms]">który <span class="dissolve halftone">znika.</span></span></span>
          </h1>

          <div class="intro-fade mt-10 flex items-center gap-4 text-paper/45 [--d:1700ms]" aria-hidden="true">
            <span class="h-px w-12 bg-linear-to-l from-paper/30 to-transparent" />
            <svg class="size-3" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 0 9.3 6.7 16 8 9.3 9.3 8 16 6.7 9.3 0 8 6.7 6.7Z" />
            </svg>
            <span class="h-px w-12 bg-linear-to-r from-paper/30 to-transparent" />
          </div>

          <p class="intro-fade mt-10 max-w-[32ch] text-base/6 text-paper/75 [--d:1900ms] md:text-lg/7">
            Zerya tworzy własne produkty cyfrowe i&nbsp;oprogramowanie dla firm.
          </p>

          <div class="intro-fade mt-8 w-full [--d:2000ms] md:w-auto">
            <UButton color="neutral" size="xl" label="Porozmawiajmy" trailing-icon="i-lucide-arrow-right" class="w-full bg-night/60 text-aurora ring ring-aurora/50 backdrop-blur-sm hover:bg-night/80 active:bg-night/80 md:w-auto md:bg-paper md:text-ink md:ring-0 md:hover:bg-aurora-light md:active:bg-aurora-light" @click="contactDialog.open('hero')" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* `--p` (0 → 1) is how far the pinned hero has been scrolled, set by useScrollScenes */

@property --ink {
  syntax: '<number>';
  inherits: false;
  initial-value: 1;
}

/* Halftone word: the dots shrink as the reader scrolls, so the problem literally disappears */
.dissolve {
  --fade: clamp(0, var(--p) * 4, 1);
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

.hero-line {
  opacity: 0;
}

/* Without motion the projects open with their own heading */
.hero-next {
  display: none;
}

@media (prefers-reduced-motion: no-preference) {
  /* The headline leaves first */
  .hero-near {
    --out: clamp(0, (var(--p) - 0.12) / 0.3, 1);

    opacity: calc(1 - var(--out));
    translate: 0 calc(var(--out) * -6svh);
  }

  /* Then the aurora closes towards the middle of the screen, leaving two pixels of light */
  .hero-sky {
    --close: clamp(0, (var(--p) - 0.25) / 0.55, 1);

    clip-path: inset(calc(var(--close) * var(--close) * (50% - 1px)) 0);
  }

  .hero-land {
    transform: translateY(calc(clamp(0, var(--p) / 0.4, 1) * var(--depth) * 30svh));
  }

  /* The line takes over from the last of the aurora */
  .hero-line {
    opacity: clamp(0, (var(--p) - 0.7) / 0.15, 1);
  }

  .hero-next {
    --in: clamp(0, (var(--p) - 0.78) / 0.15, 1);

    display: block;
    opacity: var(--in);
    translate: 0 calc((1 - var(--in)) * 3svh);
  }

  .intro-line {
    animation: line-up 1400ms var(--ease-out-expo) var(--d) both;
  }

  .intro-fade {
    animation: fade-up 1400ms var(--ease-out-expo) var(--d) both;
  }

  .hero-land {
    animation: land-up 2600ms var(--ease-out-expo) calc(1800ms + var(--i) * 140ms) both;
  }

  .dissolve {
    animation: ink-in 2400ms var(--ease-out-expo) 1700ms both;
  }

  /* Everything holds on its first frame until the pictures are in; the delays count from there */
  section:not(.is-ready) :is(.intro-line, .intro-fade, .hero-land, .dissolve) {
    animation-play-state: paused;
  }
}

.hero-loader {
  opacity: 0;
  transition: opacity 300ms;
}

section:not(.is-ready) .hero-loader {
  animation:
    loader-in 300ms 250ms both,
    loader-spin 1600ms linear infinite;
}

/* Without scroll animation the hero is a plain screen */
@media (prefers-reduced-motion: reduce) {
  section {
    height: 100svh;
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

@keyframes land-up {
  from {
    opacity: 0;
    transform: translateY(calc(var(--depth) * 40svh));
  }
}

@keyframes loader-in {
  to {
    opacity: 1;
  }
}

@keyframes loader-spin {
  to {
    rotate: 360deg;
  }
}

@keyframes ink-in {
  from {
    --ink: 0;
  }
}
</style>
