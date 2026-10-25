<script setup lang="ts">
// The ground the team stands on: the ruins print, its two groups anchored to the bottom corners.
// Each group is a stack of the print's layers, so the ruins can stay alive behind the text: the ivy
// sways from where it hangs, the light breathes, a dove now and then flies out of it.
// Screened bitmaps must not be resampled, so the layers are baked at the sizes shown on wide screens
// (`-sm`, `-md` and full); only narrow screens scale them.
const DIR = '/img/ruins/layers'

interface Layer {
  name: string
  class?: string
  // Ivy: where the vine is attached, how far it swings and how slowly
  sway?: { origin: string, amp: number, dur: number }
}

// Each bigger bake, from largest, with the screens it is shown on
interface Size { suffix: string, media: string }

const groups: { key: 'left' | 'right', width: number, height: number, sizes: Size[], layers: Layer[] }[] = [
  {
    key: 'left',
    width: 704,
    height: 668,
    sizes: [
      { suffix: '', media: '(min-width: 2400px)' },
      { suffix: '-md', media: '(min-width: 1800px)' },
    ],
    layers: [
      { name: 'left-back' },
      { name: 'left-ivy-1', sway: { origin: '14.77% 73.05%', amp: 0.6, dur: 7 } },
      { name: 'left-ivy-2', sway: { origin: '26.42% 70.06%', amp: 0.5, dur: 8.5 } },
      { name: 'left-ivy-3', sway: { origin: '19.85% 83.65%', amp: 1.4, dur: 6.5 } },
      { name: 'left-front' },
      { name: 'left-dove-perched', class: 'ruins-perched' },
    ],
  },
  {
    key: 'right',
    width: 826,
    height: 913,
    sizes: [
      { suffix: '', media: '(min-width: 2400px) and (min-height: 1200px)' },
      { suffix: '-md', media: '(min-width: 1800px) and (min-height: 940px)' },
    ],
    layers: [
      { name: 'right-back' },
      { name: 'right-light', class: 'ruins-light' },
      { name: 'right-ivy-1', sway: { origin: '85.47% 17.85%', amp: 1.2, dur: 7 } },
      { name: 'right-ivy-2', sway: { origin: '90.07% 19.5%', amp: 1, dur: 8.2 } },
      { name: 'right-ivy-3', sway: { origin: '74.82% 17.85%', amp: 1.4, dur: 6.4 } },
      { name: 'right-ivy-4', sway: { origin: '81.84% 31.54%', amp: 1.6, dur: 5.8 } },
      { name: 'right-ivy-5', sway: { origin: '95.16% 21.14%', amp: 1.1, dur: 7.6 } },
      { name: 'right-ivy-6', sway: { origin: '26.88% 95.62%', amp: 0.4, dur: 9 } },
      { name: 'right-ivy-7', sway: { origin: '24.94% 89.05%', amp: 0.4, dur: 8 } },
      { name: 'right-ivy-8', sway: { origin: '31.6% 18.4%', amp: 1.3, dur: 6.8 } },
      { name: 'right-front' },
      { name: 'right-dove-perched', class: 'ruins-perched' },
    ],
  },
]

function swayStyle(layer: Layer, i: number) {
  if (!layer.sway)
    return undefined
  return {
    '--origin': layer.sway.origin,
    '--amp': `${layer.sway.amp}deg`,
    '--dur': `${layer.sway.dur}s`,
    // Out of step with each other, so the vines never swing together
    '--delay': `${-i * 1.7}s`,
  }
}
</script>

<template>
  <div class="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
    <div v-for="group in groups" :key="group.key" class="absolute bottom-0" :class="`ruins-${group.key}`" :style="{ aspectRatio: `${group.width} / ${group.height}` }">
      <!-- Plain page between the ruins and the land far behind them, so the two never blend; it only
           fades out beyond the ruins' outline -->
      <span class="ruins-haze absolute" />
      <picture v-for="(layer, i) in group.layers" :key="layer.name">
        <source v-for="size in group.sizes" :key="size.suffix" :media="size.media" :srcset="`${DIR}/${layer.name}${size.suffix}.webp 1x, ${DIR}/${layer.name}${size.suffix}@2x.webp 2x`">
        <img
          :src="`${DIR}/${layer.name}-sm.webp`"
          :srcset="`${DIR}/${layer.name}-sm.webp 1x, ${DIR}/${layer.name}-sm@2x.webp 2x`"
          alt=""
          :width="group.width"
          :height="group.height"
          loading="lazy"
          class="absolute inset-0 size-full"
          :class="[layer.class, { 'ruins-ivy': layer.sway }]"
          :style="swayStyle(layer, i)"
        >
      </picture>
      <!-- Now and then a dove flies out of the light and off the page -->
      <span v-if="group.key === 'right'" class="ruins-dove absolute" />
    </div>
  </div>
</template>

<style scoped>
/* Sizes: native `-sm` from 1280 px, `-md` on full HD, full size on large screens, scaled only below */
.ruins-right {
  right: 0;
  display: none;
}

.ruins-left {
  left: 0;
  display: none;
  width: 528px;
}

.ruins-dove {
  display: none;
}

.ruins-haze {
  inset: 10% -12% -4%;
  background: radial-gradient(closest-side, var(--color-paper) 62%, transparent);
}

/* Too big for a phone, which gets the land up close instead */
@media (min-width: 768px) {
  .ruins-right {
    display: block;
    width: min(43.02vw, 81svh);
  }
}

@media (min-width: 1280px) and (min-height: 760px) {
  .ruins-right {
    width: 620px;
  }
}

@media (min-width: 1680px) {
  .ruins-left {
    display: block;
  }
}

@media (min-width: 1800px) {
  .ruins-left {
    width: 616px;
  }
}

@media (min-width: 1800px) and (min-height: 940px) {
  .ruins-right {
    width: 723px;
  }
}

@media (min-width: 2400px) {
  .ruins-left {
    width: 704px;
  }
}

@media (min-width: 2400px) and (min-height: 1200px) {
  .ruins-right {
    width: 826px;
  }
}

/* `--v` comes from the team scene around: the ruins rise from the ground as the reader comes out under the clouds.
   Then the right group stays for the whole section, while the left one, in the way of the text,
   holds with the thesis for a moment, then sinks back into the ground before the people come. */
@media (prefers-reduced-motion: no-preference) {
  .ruins-left,
  .ruins-right {
    --r: clamp(0, (var(--v, 10) - var(--from)) / 0.36, 1);
    --rise: calc((1 - var(--r) * var(--r) * (3 - 2 * var(--r))) * 45%);
  }

  .ruins-right {
    --from: 0.32;

    transform: translateY(var(--rise));
  }

  .ruins-left {
    --from: 0.38;
    --sink: clamp(0, (var(--v, 0) - 1.05) / 0.42, 1);

    transform: translateY(calc(var(--rise) + var(--sink) * var(--sink) * 100%));
  }

  .ruins-ivy {
    transform-origin: var(--origin);
    animation: sway var(--dur) ease-in-out var(--delay) infinite alternate;
  }

  .ruins-light {
    animation: breathe 7s ease-in-out infinite alternate;
  }

  .ruins-perched {
    animation: hop 13s ease-out infinite;
  }

  .ruins-dove {
    display: block;
    width: 64px;
    height: 56px;
    background-image: image-set(
      url('/img/ruins/layers/dove-flight-right.webp') 1x,
      url('/img/ruins/layers/dove-flight-right@2x.webp') 2x
    );
    background-size: 640px 56px;
    opacity: 0;
    animation:
      flap 560ms steps(8) infinite,
      fly 24s linear 4s infinite;
  }
}

/* Where the text runs over the ruins, they step back behind it */
@media (max-width: 1023px) {
  .ruins-right {
    opacity: calc(1 - 0.75 * clamp(0, (var(--v, 0) - 0.9) / 0.4, 1));
  }
}

@keyframes sway {
  from {
    rotate: calc(var(--amp) * -1);
  }

  to {
    rotate: var(--amp);
  }
}

@keyframes breathe {
  from {
    opacity: 0.65;
  }

  to {
    opacity: 1;
  }
}

/* The perched dove shifts its weight once in a while */
@keyframes hop {
  0%,
  90%,
  100% {
    translate: 0 0;
  }

  92% {
    translate: 0 -3px;
  }

  94% {
    translate: 0 0;
  }
}

@keyframes flap {
  to {
    background-position-x: -512px;
  }
}

/* Out of the light inside the arch, up past the wall and off the right edge */
@keyframes fly {
  0% {
    left: 44%;
    top: 40%;
    opacity: 0;
  }

  2% {
    opacity: 1;
  }

  14% {
    left: 72%;
    top: 22%;
  }

  26% {
    left: 104%;
    top: 6%;
    opacity: 1;
  }

  27%,
  100% {
    left: 104%;
    top: 6%;
    opacity: 0;
  }
}
</style>
