<script setup lang="ts">
import type { Sky, SkyConstellation, SkyFrame } from '~/lib/riso-sky'

// Our own products and commissioned work, charted on the night sky. The line of light the hero closed
// into becomes the horizon, the stars come out above it, and the camera turns from one constellation
// to the next as its case passes: each project a constellation of the parts it is built from.
const contactDialog = useContactDialog()

interface Case {
  name: string
  to: string
  domain: string
  meta: string[]
  problem: string
  solution: string
  facts: { value: string, label: string }[]
}

const cases: Case[] = [
  {
    ...PROJECT_LINKS.motoq,
    meta: ['System obiegu faktur', '2025', '.NET', 'Wolverine', 'SQL Server', 'Nuxt'],
    problem: '„Systemów do obiegu faktur jest dużo. Żaden nie pasuje do tego, jak pracuje salon i serwis.”',
    solution: 'Obieg faktur zakupowych zbudowany tylko dla salonów i serwisów. Nie zastępuje ich programów, tylko się do nich dopina. Pobiera faktury z AutoStacji, prowadzi je przez akceptację i przygotowuje dane dla Symfonii.',
    facts: [
      { value: '1 zł', label: 'netto za fakturę, bez abonamentu' },
      { value: '4', label: 'kroki wdrożenia na serwerze klienta' },
    ],
  },
  {
    ...PROJECT_LINKS.hack4krak,
    meta: ['Platforma CTF', '2025', 'Rust', 'Actix Web', 'PostgreSQL', 'Nuxt'],
    problem: '„Konkursy CTF są, ale każdy zakłada, że już coś umiesz. Nie ma gdzie zacząć.”',
    solution: 'Platforma CTF dla uczniów szkół podstawowych i średnich, z zadaniami dopasowanymi do ich poziomu. Wokół niej wyrosła społeczność i baza pod większe projekty z cyberbezpieczeństwa. Kod platformy jest otwarty.',
    facts: [
      { value: '300+', label: 'uczestników trzech edycji' },
      { value: '30+', label: 'wolontariuszy przy ostatniej edycji' },
      { value: '4', label: 'kraje w edycji 2027' },
    ],
  },
]

// Commissioned work, as opposed to the products above which are our own
const services = [
  {
    title: 'Procesy, które wyrosły z gotowca',
    body: 'Za specyficzne na Excela albo pudełkowy system. Budujemy software pod Twój realny proces, z wyjątkami i wszystkim.',
  },
  {
    title: 'Systemy, które nie gadają ze sobą',
    body: 'KSeF, DMS, ERP, CMS, pliki, API. Łączymy to, co dziś ktoś przepisuje ręcznie, w jeden obieg.',
  },
  {
    title: 'Produkty od MVP do produkcji',
    body: 'Pomysł albo kod po kimś, który nie wytrzymuje realnych użytkowników. Doprowadzamy do stanu, w którym po prostu działa.',
  },
]

// One constellation per case, then one not charted yet for whoever writes to us next.
// Each is laid out like the system it stands for; the main star is the product itself.
const constellations: SkyConstellation[] = [
  {
    name: 'MOTOQ',
    az: 172,
    alt: 32,
    stars: [
      { x: -11, y: 3, label: 'AutoStacja' },
      { x: -3, y: 0, label: 'MOTOQ', main: true },
      { x: 3, y: 6, label: 'Salon' },
      { x: 4, y: -5, label: 'Serwis' },
      { x: 9, y: 1, label: 'Akceptacja' },
      { x: 15, y: -3, label: 'Symfonia' },
    ],
    edges: [[0, 1], [1, 2], [1, 3], [2, 4], [3, 4], [4, 5]],
  },
  {
    name: 'Hack4Krak',
    az: 212,
    alt: 48,
    stars: [
      { x: -13, y: -7, label: 'Pierwsze zadanie' },
      { x: -8, y: -2 },
      { x: -3, y: -5, label: 'Hack4Krak', main: true },
      { x: 1, y: 1 },
      { x: 6, y: -2, label: 'Społeczność' },
      { x: 10, y: 4, label: 'Wolontariusze' },
      { x: 2, y: 7, label: 'Open source' },
      { x: 12, y: 10, label: 'flag{...}' },
    ],
    edges: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [3, 6], [5, 7]],
  },
  {
    name: 'Nienazwany',
    az: 248,
    alt: 64,
    uncharted: true,
    stars: [
      { x: -8, y: -3 },
      { x: -2, y: 4 },
      { x: 5, y: 1 },
      { x: 9, y: -5, label: 'Twój problem?' },
    ],
    edges: [[0, 1], [1, 2], [2, 3]],
  },
]

// Where the camera rests: the horizon, then each constellation in turn
const poses = [
  { az: 172, alt: 0, fov: 70, focus: 0 },
  ...constellations.map(c => ({ az: c.az, alt: c.alt, fov: 50, focus: 1 })),
]

// Must match the media query that pins the cases in the styles below
const PINNED = '(min-width: 768px) and (min-height: 720px)'

const section = useTemplateRef('section')
const canvas = useTemplateRef('canvas')
const overlay = useTemplateRef('overlay')
// Each case and the commissioned work hold the camera on their constellation while they are on screen
const caseEls = useTemplateRef<HTMLElement[]>('caseEls')
const servicesEl = useTemplateRef('servicesEl')
const reducedMotion = usePreferredReducedMotion()
const visible = useElementVisibility(section)

// Ranges of scroll into the section, in px, over which the camera rests on each pose
let holds: [number, number][] = []
function measure() {
  if (!section.value || !caseEls.value || !servicesEl.value)
    return
  const vh = window.innerHeight
  const top = section.value.getBoundingClientRect().top
  // The horizon holds until the heading starts to leave
  holds = [[0, 0.35 * vh]]
  // A ref array from v-for is not guaranteed to follow the source order
  const rects = [...caseEls.value, servicesEl.value].map(el => el.getBoundingClientRect()).sort((a, b) => a.top - b.top)
  // Pinned cases hold the camera for exactly as long as they are pinned. On phones a case opens with
  // half a screen of bare sky, so the lock waits until the text above has gone.
  const pinned = window.matchMedia(PINNED).matches
  const narrow = window.innerWidth < 768
  for (const rect of rects) {
    const start = rect.top - top - (pinned ? 0.1 : narrow ? 0.05 : 0.45) * vh
    holds.push([start, Math.max(rect.bottom - top - (pinned ? 1 : 0.75) * vh, start + 0.1 * vh)])
  }
  holds[holds.length - 1]![1] = Infinity
}

const smoother = (t: number) => t * t * t * (t * (t * 6 - 15) + 10)
const clamp = (v: number) => Math.min(Math.max(v, 0), 1)

function target(): SkyFrame {
  // Measured every frame: three rects are cheap, and late fonts or images move the cases
  measure()
  const vh = window.innerHeight
  const scrolled = -(section.value?.getBoundingClientRect().top ?? 0)
  const locks = constellations.map(() => 0)
  // The stars rise from the horizon over the first screen
  const reveal = clamp((scrolled - 0.1 * vh) / (0.8 * vh))
  let k = holds.findIndex(([, end]) => scrolled <= end)
  if (k < 0)
    k = holds.length - 1

  if (reducedMotion.value === 'reduce') {
    // Without motion the camera cuts to the nearest pose instead of travelling
    if (k > 0 && scrolled < holds[k]![0] && scrolled - holds[k - 1]![1] < holds[k]![0] - scrolled)
      k--
    if (k > 0)
      locks[k - 1] = 1
    return { ...poses[k]!, reveal: 1, locks }
  }

  const [start] = holds[k]!
  if (scrolled >= start || k === 0) {
    if (k > 0)
      locks[k - 1] = 1
    return { ...poses[k]!, reveal, locks }
  }
  // Between two poses: the old lock lets go as the camera leaves, the new one takes hold as it arrives
  const t = clamp((scrolled - holds[k - 1]![1]) / (start - holds[k - 1]![1]))
  const e = smoother(t)
  const from = poses[k - 1]!
  const to = poses[k]!
  if (k > 1)
    locks[k - 2] = clamp(1 - t * 4)
  locks[k - 1] = clamp(t * 4 - 3)
  return {
    az: from.az + (to.az - from.az) * e,
    alt: from.alt + (to.alt - from.alt) * e,
    fov: from.fov + (to.fov - from.fov) * e,
    focus: from.focus + (to.focus - from.focus) * e,
    reveal,
    locks,
  }
}

let sky: Sky | undefined
let current: SkyFrame | undefined
let frame = 0

// The camera eases after the scroll rather than jumping with every wheel step
function tick() {
  frame = 0
  if (!sky)
    return
  const goal = target()
  const ease = reducedMotion.value === 'reduce' || !current ? 1 : 0.12
  const prev = current ?? goal
  const mix = (a: number, b: number) => a + (b - a) * ease
  current = {
    az: mix(prev.az, goal.az),
    alt: mix(prev.alt, goal.alt),
    fov: mix(prev.fov, goal.fov),
    focus: mix(prev.focus, goal.focus),
    reveal: mix(prev.reveal, goal.reveal),
    locks: goal.locks.map((l, i) => mix(prev.locks[i] ?? 0, l)),
  }
  sky.draw(current)
  const moving = Math.abs(goal.az - current.az) + Math.abs(goal.alt - current.alt) + Math.abs(goal.reveal - current.reveal)
    + goal.locks.reduce((sum, l, i) => sum + Math.abs(l - current!.locks[i]!), 0)
  if (moving > 0.002 || sky.flying())
    frame = requestAnimationFrame(tick)
}

function kick() {
  if (!frame && sky && visible.value)
    frame = requestAnimationFrame(tick)
}

// The sky waits until the hero has played its intro, or the reader starts scrolling, whichever is first
let loading = false
async function load() {
  if (loading)
    return
  loading = true
  const { createSky } = await import('~/lib/riso-sky')
  if (!canvas.value || !overlay.value)
    return
  sky = await createSky(canvas.value, overlay.value, constellations)
  kick()
  shoot()
}

// Now and then a meteor crosses whatever part of the sky is on screen, once the stars are out
let shooting = 0
function shoot() {
  shooting = window.setTimeout(() => {
    if (sky && visible.value && !document.hidden && reducedMotion.value !== 'reduce' && (current?.reveal ?? 0) > 0.5) {
      sky.launch()
      kick()
    }
    shoot()
  }, 2000 + Math.random() * 5000)
}

const heroReady = useState('hero-ready', () => false)
onMounted(() => {
  const idle = () => 'requestIdleCallback' in window ? requestIdleCallback(load, { timeout: 2000 }) : setTimeout(load, 200)
  watch(heroReady, ready => ready && setTimeout(idle, 2500), { immediate: true })
})
useEventListener('scroll', load, { passive: true, once: true })
useEventListener('scroll', kick, { passive: true })

// The sky closes over the last screen and a bit before the section ends, while it is still pinned
let closing = 0
function close() {
  closing = 0
  if (!section.value)
    return
  const vh = window.innerHeight
  const bottom = section.value.getBoundingClientRect().bottom
  section.value.style.setProperty('--close', clamp((1.8 * vh - bottom) / (0.8 * vh)).toFixed(4))
}
useEventListener('scroll', () => closing ||= requestAnimationFrame(close), { passive: true })
useResizeObserver(canvas, () => {
  sky?.resize()
  kick()
})
watch(visible, kick)
onBeforeUnmount(() => {
  cancelAnimationFrame(frame)
  clearTimeout(shooting)
  sky?.destroy()
})
</script>

<template>
  <!-- With motion the section slides under the end of the hero, so the sky takes over from its line of light -->
  <section id="projekty" ref="section" data-scene class="projects relative z-10">
    <!-- Pinned inside a layer the size of the section, so the sky can never stick out past its end -->
    <div class="projects-sky absolute inset-0 bg-night" aria-hidden="true">
      <div class="sticky top-0 h-svh overflow-hidden">
        <div class="projects-sky-clip absolute inset-0">
          <canvas ref="canvas" class="size-full" />
          <!-- The sky stays dark behind the whole text column, and a little quieter behind the charts too -->
          <div class="projects-shade absolute inset-0 hidden md:block" />
          <!-- Labels and readouts are set in plain type over the print, never screened -->
          <canvas ref="overlay" class="absolute inset-0 size-full" />
        </div>
        <!-- What is left of the sky once it has closed, and the line the team's gate opens from -->
        <div class="projects-line absolute inset-x-0 top-1/2 h-px bg-linear-to-r from-transparent via-paper to-transparent" />
      </div>
    </div>

    <div class="projects-content relative mx-auto w-full max-w-[1328px] px-6 pb-32 md:px-16 md:pb-48">
      <!-- With motion it sits exactly where the hero left its copy of the heading -->
      <div class="projects-heading">
        <p class="text-xs font-medium text-paper/55">
          Nasze projekty
        </p>
        <h2 class="mt-4 max-w-[14ch] text-[36px]/[44px] font-semibold tracking-[-0.035em] md:text-[64px]/[68px] xl:text-[80px]/[84px]">
          Problemy, które rozwiązujemy.
        </h2>
      </div>

      <ol class="mt-24 md:mt-[20svh]">
        <!-- On screens tall enough, each case is pinned while the camera holds its constellation -->
        <li v-for="item in cases" ref="caseEls" :key="item.name" class="case pt-[45svh] pb-[20svh] md:pt-0 md:pb-24">
          <div class="case-pin md:grid md:grid-cols-12 md:gap-6">
            <div class="case-text md:col-span-6 xl:col-span-5">
              <h3 class="text-[28px]/[36px] font-semibold tracking-[-0.02em]">
                {{ item.name }}
              </h3>
              <p class="mt-2 max-w-[36ch] text-sm text-paper/55">
                {{ item.meta.join(' · ') }}
              </p>
              <a :href="item.to" target="_blank" class="group mt-4 inline-flex items-center gap-1 text-sm text-paper/70 transition-colors hover:text-paper">
                {{ item.domain }}
                <UIcon name="i-lucide-arrow-up-right" class="size-4 motion-safe:transition-transform motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5" />
              </a>

              <!-- The problem carries the case: the client's voice at full size -->
              <p class="mt-12 font-heading text-[26px]/[34px] font-medium tracking-[-0.02em] text-balance md:mt-10 md:text-[36px]/[44px]">
                <span class="sr-only">Problem: </span>{{ item.problem }}
              </p>
              <p class="mt-10 text-xs font-medium text-paper/55 md:mt-10">
                Co zbudowaliśmy
              </p>
              <p class="mt-2 max-w-[56ch] text-base/6 text-paper/80 md:text-lg/7">
                {{ item.solution }}
              </p>
              <dl class="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 md:mt-10">
                <div v-for="fact in item.facts" :key="fact.label" class="flex flex-col-reverse justify-end gap-2">
                  <dt class="text-sm text-paper/55">
                    {{ fact.label }}
                  </dt>
                  <dd class="font-heading text-[40px]/[44px] font-semibold tracking-[-0.03em] md:text-[48px]/[52px]">
                    {{ fact.value }}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </li>
      </ol>

      <!-- Where tall enough, the last screen pins and closes into the line together with the sky -->
      <div ref="servicesEl" class="services pt-[45svh] md:pt-[10svh]">
        <div class="services-pin md:grid md:grid-cols-12 md:gap-6">
          <div class="case-text md:col-span-6 xl:col-span-5">
            <p class="text-xs font-medium text-paper/55">
              Na zamówienie
            </p>
            <!-- The heading carries the screen like a case's problem does; the rest is set to be read, not shouted -->
            <h3 class="mt-4 max-w-[18ch] text-[28px]/[36px] font-semibold tracking-[-0.02em] text-balance md:text-[36px]/[44px]">
              Inne problemy, które rozwiązujemy
            </h3>
            <p class="mt-6 max-w-[48ch] text-base/6 text-paper/75 md:text-lg/7">
              Najmocniejsi jesteśmy tam, gdzie błąd kosztuje: e-faktury, integracje księgowe, dane co do grosza. Ale spinamy też prostsze rzeczy.
            </p>
            <ol class="mt-10 divide-y divide-paper/10 border-y border-paper/10">
              <li v-for="(service, i) in services" :key="service.title" class="grid grid-cols-[2rem_1fr] gap-x-4 py-5">
                <span class="text-sm text-paper/40 tabular-nums" aria-hidden="true">{{ String(i + 1).padStart(2, '0') }}</span>
                <div>
                  <h4 class="text-base font-medium">
                    {{ service.title }}
                  </h4>
                  <p class="mt-1 max-w-[52ch] text-sm/6 text-paper/60">
                    {{ service.body }}
                  </p>
                </div>
              </li>
            </ol>
            <div class="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <p class="text-lg/7 text-paper/75">
                Masz podobny problem?
              </p>
              <UButton color="neutral" size="xl" label="Porozmawiajmy" trailing-icon="i-lucide-arrow-right" @click="contactDialog.open('cases')" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Held dark until past the text column's right edge, so the print never sits under the copy */
.projects-shade {
  background: linear-gradient(
    to right,
    color-mix(in srgb, var(--color-night) 90%, transparent),
    color-mix(in srgb, var(--color-night) 82%, transparent) 50%,
    color-mix(in srgb, var(--color-night) 30%, transparent) 72%,
    color-mix(in srgb, var(--color-night) 20%, transparent)
  );
}

/* Without motion the sky simply ends */
.projects-line {
  opacity: 0;
}

.projects-heading {
  padding-top: 6rem;
}

/* On phones the text passes over the sky, so it gets the night behind it */
@media (max-width: 767px) {
  .case-text {
    margin-inline: -1.5rem;
    padding: 2rem 1.5rem;
    background: linear-gradient(to bottom, transparent, rgb(10 10 10 / 0.85) 4rem);
  }
}

@media (min-width: 768px) and (min-height: 720px) {
  .case {
    height: 170svh;
    padding-bottom: 0;
  }

  .case-pin {
    position: sticky;
    top: 0;
    height: 100svh;
    align-content: center;
  }
}

@media (prefers-reduced-motion: no-preference) {
  /* The section starts under the hero's last screen and fades in once that screen has settled,
     so the hero's line and heading hand over to identical ones here */
  .projects {
    --swap: clamp(0, (var(--v, 0) - 0.09) / 0.06, 1);

    margin-top: -115svh;
    scroll-margin-top: -15svh;
  }

  .projects-sky,
  .projects-content {
    opacity: var(--swap);
  }

  /* Pinned at the hero's copy until the swap is done, then it scrolls away */
  .projects-heading {
    padding-top: calc(65svh + 48px);
    translate: 0 calc((min(var(--v, 0), 0.15) - 0.15) * 100svh);
  }

  /* Open sky after the last case, which then closes into a line of light like the aurora did,
     the line the team's gate opens from. `--close` is set from the section's end in the script. */
  .projects-content {
    padding-bottom: 170svh;
  }

  /* Phones have no pinned last screen and nothing in that sky, so it starts closing while the last
     words are still on screen, and they are gone up just as the team's night comes in */
  @media (max-width: 767px) {
    .projects-content {
      padding-bottom: 100svh;
    }
  }

  .projects-sky-clip {
    clip-path: inset(calc(var(--close, 0) * var(--close, 0) * (50% - 1px)) 0);
  }

  /* Lit only in the last tenth of the closing, once the sky is down to a slit, so it never cuts across the open sky */
  .projects-line {
    opacity: clamp(0, (var(--close, 0) * var(--close, 0) - 0.9) / 0.1, 1);
  }
}

/* Pinned, the last screen is where the closing starts: it holds for the 80svh the sky takes to close,
   the section ends with it, and its text is clipped by the same closing as the sky behind */
@media (prefers-reduced-motion: no-preference) and (min-width: 768px) and (min-height: 720px) {
  .projects-content {
    padding-bottom: 0;
  }

  .services {
    height: 180svh;
    padding-top: 0;
  }

  .services-pin {
    position: sticky;
    top: 0;
    height: 100svh;
    align-content: center;
    clip-path: inset(calc(var(--close, 0) * var(--close, 0) * (50% - 1px)) 0);
  }
}
</style>
