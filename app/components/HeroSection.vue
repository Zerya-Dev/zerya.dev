<template>
  <section :class="$style.hero" class="relative isolate flex min-h-svh flex-col overflow-hidden">
    <!-- Aurora: animated loop with transparent bg and ragged edges, anchored to the bottom and masked into the night. -->
    <picture>
      <source srcset="/img/aurora-still.webp" media="(prefers-reduced-motion: reduce)">
      <img
        :class="$style.aurora"
        class="pointer-events-none absolute bottom-0 left-1/2 -z-10 max-w-none -translate-x-1/2 select-none"
        src="/img/aurora-loop.webp"
        width="1920"
        height="1080"
        alt=""
        fetchpriority="high"
      >
    </picture>
    <div :class="$style.grain" class="pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />

    <div :class="$style.rise" class="[--d:0ms]">
      <SiteNavbar />
    </div>

    <div class="px-6 pt-[10svh] md:px-12 md:pt-[16svh]">
      <h1 :class="$style.title" class="font-heading text-paper">
        <span :class="$style.rise" class="block font-light text-paper/55 [--d:300ms]">Software to nie cel.</span>
        <span :class="$style.rise" class="block [--d:480ms]">
          Liczy się problem,
          <span class="whitespace-nowrap">który <span :class="$style.riso" data-text="znika.">znika.</span></span>
        </span>
      </h1>
    </div>

    <div class="mt-auto grid gap-7 px-6 pb-8 md:grid-cols-[1fr_auto] md:items-end md:px-12 md:pb-10">
      <div :class="$style.rise" class="max-w-md space-y-3 text-base leading-relaxed text-paper/75 [--d:680ms] md:text-lg">
        <p>Zerya<sup class="text-[0.5em]" aria-label="copyright">&copy;</sup> tworzy własne produkty cyfrowe i&nbsp;oprogramowanie dla firm.</p>
      </div>

      <div :class="$style.rise" class="flex items-center justify-between gap-10 [--d:820ms] md:justify-end">
        <span class="hidden font-mono text-[11px] tracking-[0.2em] text-paper/35 uppercase md:inline">
          69°N / ↓
        </span>
        <ContactDialog source="hero">
          <UButton
            type="button"
            :class="$style.cta"
            :ui="{ base: () => 'group inline-flex w-full cursor-pointer items-center justify-center gap-3 border border-mint/60 px-6 py-3.5 font-heading text-base font-medium tracking-tight text-mint transition-colors hover:bg-mint hover:text-ink md:w-auto md:py-3' }"
          >
            Porozmawiajmy
            <span class="transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
          </UButton>
        </ContactDialog>
      </div>
    </div>
  </section>
</template>

<style module>
.hero {
  background: var(--color-ink);
}

.aurora {
  /* Always at least 16:9-tall enough to fill most of the viewport; overflows sideways on narrow screens. */
  width: max(100vw, 160svh);
  height: auto;
  /* Keep the blur proportional to the image: 0.55px at its native 1920px width. */
  filter: blur(max(0.02865vw, 0.04583svh));
  /* Fade the banded top and the hard-cut sides into the background. */
  mask-image:
    linear-gradient(to bottom, transparent 0%, #000 34%),
    linear-gradient(to right, transparent 0%, #000 8%, #000 92%, transparent 100%);
  mask-composite: intersect;
}

/*
 * Mobile: aurora becomes a band between the headline (sky) and the copy (ground).
 * The image's bottom ~21% is transparent silhouette ground, so its horizon sits at a fixed 14.5rem
 * above the fold edge; the copy block always stands on dark ground. Crop right to keep the trees.
 * Longer top fade so short phones don't put the brightest bands behind the headline.
 */
@media (max-width: 767px) {
  .aurora {
    width: 260vw;
    left: -145vw;
    bottom: calc(14.5rem - 30.7vw);
    translate: none;
    filter: blur(0.07448vw);
    mask-image:
      linear-gradient(to bottom, transparent 0%, #000 48%),
      linear-gradient(to right, transparent 0%, #000 8%, #000 92%, transparent 100%);
  }
}

/* Riso paper grain */
.grain {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 .55 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  opacity: 0.09;
  mix-blend-mode: overlay;
}

.title {
  font-size: clamp(2.4rem, 5.6vw, 6rem);
  line-height: 1.02;
  letter-spacing: -0.035em;
  max-width: 18ch;
}

/* Two misregistered ink layers; the word dissolves into halftone dots. */
/* Dot radius as a fraction of the halftone cell; the cell scales with the type so small screens don't get a coarse screen. */
@property --dot {
  syntax: '<number>';
  inherits: true;
  initial-value: 0.5;
}

.riso {
  position: relative;
  display: inline-block;
  color: var(--color-mint);
  --dot: 0.5;
  --cell: max(2.5px, 0.0625em);
  mask-image: radial-gradient(
    circle,
    #000 calc(var(--dot) * var(--cell)),
    transparent calc(var(--dot) * var(--cell) + 0.1 * var(--cell))
  );
  mask-size: var(--cell) var(--cell);
  animation: vanish 7s ease-in-out 1.2s infinite alternate;
}

.riso::before,
.riso::after {
  content: attr(data-text);
  position: absolute;
  inset: 0;
  pointer-events: none;
  mix-blend-mode: screen;
}

.riso::before {
  color: var(--color-riso-yellow);
  transform: translate(0.045em, 0.03em);
  opacity: 0.85;
}

.riso::after {
  color: var(--color-riso-blue);
  transform: translate(-0.035em, -0.02em);
  opacity: 0.45;
}

@keyframes vanish {
  0%,
  20% {
    --dot: 0.5;
  }
  100% {
    --dot: 0.233;
  }
}

/* Staggered entrance */
.rise {
  animation: rise 0.9s cubic-bezier(0.2, 0.7, 0.2, 1) var(--d, 0ms) both;
}

@keyframes rise {
  from {
    opacity: 0;
    transform: translateY(24px);
    filter: blur(6px);
  }
  to {
    opacity: 1;
    transform: none;
    filter: none;
  }
}

/* CTA sweep */
.cta {
  position: relative;
  overflow: hidden;
}

.cta::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(110deg, transparent 30%, rgb(62 230 168 / 0.3) 50%, transparent 70%);
  transform: translateX(-120%);
  animation: sweep 3.6s ease-in-out 2s infinite;
}

@keyframes sweep {
  0%,
  55% {
    transform: translateX(-120%);
  }
  100% {
    transform: translateX(120%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .riso,
  .rise,
  .cta::before {
    animation: none;
  }
}
</style>
