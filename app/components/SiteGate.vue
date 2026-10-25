<script setup lang="ts">
// The passage between two sections. In Slavic myth Zorya opens the gates of the sky at dawn:
// here a line of light opens up into the next section's colour, and the next section's thesis
// is waiting inside. The gate is pinned while it opens, so the reader always sees it whole.
defineProps<{
  // Classes of the section behind the gate and of the one it opens onto
  from?: string
  to: string
  // Opens over the last screen of the section before it, which stays pinned behind it the whole time
  over?: boolean
  // In-page links land where the gate is already open
  anchor?: string
  // Colour of the line the gate opens from, aurora on dark sections
  edge?: string
}>()
</script>

<template>
  <!-- Tucked a pixel under the section before it, so a fractional seam never lets the page through -->
  <div data-scene class="gate relative -mt-px h-[140svh]" :class="{ 'gate-over': over }" :style="edge && { '--edge': edge }">
    <span v-if="anchor" :id="anchor" class="absolute top-[40svh] motion-reduce:top-0" />
    <!-- The colour sits on the pinned screen, not the gate, so none of it shows past the screen's fractional end -->
    <div class="sticky top-0 h-svh overflow-hidden" :class="from">
      <!-- Waits above the line while the gate is shut; the opening sweeps it away -->
      <div v-if="$slots.closed" class="absolute inset-x-0 top-0 flex h-1/2 flex-col justify-end pb-12 md:pb-16">
        <div class="mx-auto w-full max-w-[1328px] px-6 md:px-16">
          <slot name="closed" />
        </div>
      </div>
      <div class="gate-open absolute inset-0 flex flex-col" :class="to">
        <slot name="background" />
        <div class="gate-content relative mx-auto flex min-h-0 w-full max-w-[1328px] flex-1 flex-col justify-center px-6 md:px-16">
          <slot />
        </div>
        <!-- Whatever closes the page shares the gate's last screen -->
        <div v-if="$slots.after" class="gate-content relative">
          <slot name="after" />
        </div>
      </div>
      <!-- The edges of the opening, lit like the line the aurora closed into -->
      <span class="gate-edge top-1/2 -translate-y-px" aria-hidden="true" />
      <span class="gate-edge top-1/2" aria-hidden="true" />
    </div>
  </div>
</template>

<style scoped>
/* `--p` (0 → 1) is how far the pinned gate has been scrolled, set by useScrollScenes.
   Without it, and without motion, the gate is simply open. */

.gate {
  --open: clamp(0, (var(--p, 1) - 0.05) / 0.6, 1);
}

.gate-edge {
  position: absolute;
  inset-inline: 0;
  height: 1px;
  background: linear-gradient(to right, transparent, var(--edge, var(--color-aurora)), transparent);
  opacity: calc(1 - var(--open));
}

@media (prefers-reduced-motion: no-preference) {
  /* Eased open: slow from the line, fast through the middle, slow into place */
  .gate-open {
    --e: calc(var(--open) * var(--open) * (3 - 2 * var(--open)));

    clip-path: inset(calc((1 - var(--e)) * 50%) 0);
  }

  .gate-edge:first-of-type {
    translate: 0 calc(var(--open) * var(--open) * (3 - 2 * var(--open)) * -50svh);
  }

  .gate-edge:last-of-type {
    translate: 0 calc(var(--open) * var(--open) * (3 - 2 * var(--open)) * 50svh);
  }

  /* The thesis rises once the gate is mostly open */
  .gate-content {
    --in: clamp(0, (var(--p, 1) - 0.5) / 0.35, 1);

    opacity: var(--in);
    translate: 0 calc((1 - var(--in)) * 4svh);
  }
}

/* Laid over the whole height of the section's end, so that section is still pinned while the gate opens */
@media (prefers-reduced-motion: no-preference) {
  .gate-over {
    z-index: 30;
    margin-top: -140svh;
  }

  /* Its line would otherwise ride up across that section; it appears in place once the gate is pinned */
  .gate-over .gate-edge {
    opacity: calc((1 - var(--open)) * clamp(0, var(--p, 1) * 1000, 1));
  }
}

@media (prefers-reduced-motion: reduce) {
  .gate {
    height: 100svh;
  }

  .gate-edge {
    display: none;
  }
}
</style>
