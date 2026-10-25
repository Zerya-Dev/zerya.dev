<script setup lang="ts">
// The way down to the ruins. The gate opens high above a sea of clouds; the reader falls through it,
// the clouds stream up past and settle high in the sky, and the land rises to meet the ruins: a gród
// on a hill, a kurhan, an oak. Once down, a skein of cranes crosses the sky, once each time the
// reader lands. Printed in the same run as the ruins, so the bitmaps are shown at their baked sizes.
// Phones get no ruins, so there the land itself is the scene.
const DIR = '/img/sky'

interface Cloud {
  name: string
  width: number
  height: number
  // Where it rests once the reader has landed, and how far below that it starts: near clouds fall past fastest
  left: string
  top: string
  depth: number
  // Slow drift across the sky
  drift: number
  // Where it rests on a phone, above the text; the rest are too big for one
  phone?: { left: string, top: string }
}

const clouds: Cloud[] = [
  { name: 'cloud-3', width: 440, height: 260, left: '42%', top: '-2svh', depth: 40, drift: 70, phone: { left: '-40%', top: '0svh' } },
  { name: 'cloud-1', width: 720, height: 360, left: '-6%', top: '-10svh', depth: 60, drift: 110 },
  { name: 'cloud-4', width: 420, height: 190, left: '70%', top: '-8svh', depth: 50, drift: 80, phone: { left: '40%', top: '12svh' } },
]

// The skein: each crane's place behind the leader, in px, and its own beat
const cranes = [
  { x: 0, y: 0 },
  { x: -84, y: -34 },
  { x: -84, y: 38 },
  { x: -170, y: -66 },
  { x: -168, y: 74 },
]

const root = useTemplateRef('root')
const flying = ref(false)
let landed = false

// Screens scrolled into the team section, as useScrollScenes counts them
function check() {
  const scene = root.value?.closest('[data-scene]')
  if (!scene)
    return
  const v = -scene.getBoundingClientRect().top / window.innerHeight
  const down = v > 1.35 && v < 2.7
  if (down && !landed && !flying.value)
    flying.value = true
  landed = down
}

useEventListener('scroll', check, { passive: true })
onMounted(check)

function cloudStyle(cloud: Cloud, i: number) {
  return {
    '--left': cloud.left,
    '--top': cloud.top,
    '--phone-left': cloud.phone?.left,
    '--phone-top': cloud.phone?.top,
    'width': `${cloud.width}px`,
    'height': `${cloud.height}px`,
    '--depth': `${cloud.depth}svh`,
    '--drift': `${cloud.drift}s`,
    '--delay': `${-i * 23}s`,
    'backgroundImage': `image-set(url('${DIR}/${cloud.name}.webp') 1x, url('${DIR}/${cloud.name}@2x.webp') 2x)`,
  }
}
</script>

<template>
  <div ref="root" class="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
    <div class="sky-land absolute inset-x-0 bottom-0 h-[320px]" />
    <span v-for="(cloud, i) in clouds" :key="cloud.name" :class="{ 'max-md:hidden': !cloud.phone }" class="sky-cloud absolute" :style="cloudStyle(cloud, i)" />

    <div v-if="flying" class="sky-skein absolute top-[16svh] left-0" @animationend.self="flying = false">
      <span
        v-for="(crane, i) in cranes" :key="i" class="sky-crane absolute"
        :style="{ left: `${crane.x}px`, top: `${crane.y}px`, animationDelay: `${-i * 130}ms` }"
      />
    </div>

    <!-- The sea of clouds, in front of the ruins until the reader is through it. Its print is opaque from
         a third of the way down, so the halves sit either side of a screen of plain page. -->
    <div class="sky-bank absolute inset-x-0 z-10 flex flex-col">
      <div class="sky-bank-edge h-[360px]" />
      <div class="h-svh bg-paper" />
      <div class="sky-bank-edge sky-bank-under h-[360px]" />
    </div>
  </div>
</template>

<style scoped>
.sky-land {
  background: image-set(url('/img/sky/far-land.webp') 1x, url('/img/sky/far-land@2x.webp') 2x) center bottom / 1920px
    320px repeat-x;
}

/* Phones have no ruins: the land is a quiet accent along the bottom, the gród on its hill in the middle */
@media (max-width: 767px) {
  .sky-land {
    background-position-x: calc(50vw - 980px);
  }
}

@media (max-width: 767px) {
  .sky-cloud {
    top: var(--phone-top);
    left: var(--phone-left);
  }
}

.sky-bank {
  display: none;
}

.sky-bank-edge {
  background: image-set(url('/img/sky/cloudbank.webp') 1x, url('/img/sky/cloudbank@2x.webp') 2x) center top / 1920px
    720px repeat-x;
}

.sky-bank-under {
  background-position-y: bottom;
}

.sky-crane {
  width: 96px;
  height: 64px;
  background-image: image-set(
    url('/img/sky/crane-flight-right.webp') 1x,
    url('/img/sky/crane-flight-right@2x.webp') 2x
  );
  background-size: 768px 64px;
  animation: flap 680ms steps(8) infinite;
}

/* `--v` comes from the team scene around. The fall waits for the gate to show the clouds, then
   eases in and out, so the reader settles onto the ground as the ruins finish rising. */
@media (prefers-reduced-motion: no-preference) {
  .sky-land,
  .sky-cloud,
  .sky-bank {
    --f: clamp(0, (var(--v, 10) - 0.2) / 0.5, 1);
    --fall: calc(var(--f) * var(--f) * (3 - 2 * var(--f)));
  }

  .sky-land {
    transform: translateY(calc((1 - var(--fall)) * 40%));
  }

  .sky-cloud {
    transform: translateY(calc((1 - var(--fall)) * var(--depth)));
    animation: drift var(--drift) ease-in-out var(--delay) infinite alternate;
  }

  /* Its tops start just under the line the gate opens from, and it leaves through the top */
  .sky-bank {
    display: flex;
    top: 40svh;
    transform: translateY(calc(var(--fall) * (-100% - 100svh)));
  }

  .sky-skein {
    animation: cross 16s linear both;
  }
}

/* Once the people come in on a phone, where their text spans the screen, the land and sky step back */
.sky-land,
.sky-cloud {
  --back: clamp(0, (var(--v, 0) - 1.05) / 0.3, 1);
}

@media (max-width: 1023px) {
  .sky-land {
    opacity: calc(1 - 0.75 * var(--back));
  }

  .sky-cloud {
    opacity: calc(0.7 * (1 - 0.75 * var(--back)));
  }
}

@media (prefers-reduced-motion: reduce) {
  .sky-crane {
    display: none;
  }
}

@keyframes drift {
  from {
    translate: -3vw 0;
  }

  to {
    translate: 3vw 0;
  }
}

@keyframes flap {
  to {
    background-position-x: -768px;
  }
}

/* In from beyond the left edge, a slow climb, and out past the right */
@keyframes cross {
  from {
    transform: translate(-20vw, 6svh);
  }

  to {
    transform: translate(calc(100vw + 300px), -4svh);
  }
}
</style>
