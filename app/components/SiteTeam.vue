<script setup lang="ts">
// The team as one scene. A gate of light opens out of the night high above the clouds, the reader
// falls through them down to the ruins, the ruins stay behind everything that follows, and the people
// pass in the open sky beside them: the founders, then everyone else as the stones of a wall, the
// foundations the company stands on. The wall settles onto the ground for the last gate to open over.
interface SocialLink { label: string, to: string, icon: string }
interface Person {
  name: string
  email?: string
  links?: SocialLink[]
}
interface Founder extends Person {
  email: string
  area: string
  photo: string
  bio: string
}
interface Tier { name: string, description: string, people: Person[] }

const icons = {
  github: 'i-lucide-github',
  linkedin: 'i-lucide-linkedin',
  instagram: 'i-lucide-instagram',
  web: 'i-lucide-globe',
}

// Both founders build hands-on; the bio says who has the final word where
const founders: Founder[] = [
  {
    name: 'Wiktor Popiołek',
    email: 'wiktor@zerya.dev',
    area: 'Produkt i strategia, CEO',
    photo: '/img/team/wikipop-riso.webp',
    bio: 'Odpowiada za produkt i strategię. Rozmawia z klientami i decyduje, co budujemy. Programuje i jest głównym autorem MOTOQ.',
    links: [
      { label: 'LinkedIn', to: 'https://www.linkedin.com/in/wiktor-popio%C5%82ek', icon: icons.linkedin },
      { label: 'GitHub', to: 'https://github.com/wikipop', icon: icons.github },
      { label: 'Instagram', to: 'https://www.instagram.com/wiktor_popiolek/', icon: icons.instagram },
    ],
  },
  {
    name: 'Norbert Szeremet',
    email: 'norbert@zerya.dev',
    area: 'Technologia, CTO',
    photo: '/img/team/norbiros-riso.webp',
    bio: 'Ma ostatnie słowo w sprawach technicznych. Dba o architekturę i jakość kodu. Programuje, rozwija open source i platformę Hack4Krak.',
    links: [
      { label: 'LinkedIn', to: 'https://www.linkedin.com/in/norbert-szeremet/', icon: icons.linkedin },
      { label: 'GitHub', to: 'https://github.com/Norbiros', icon: icons.github },
      { label: 'norbiros.dev', to: 'https://norbiros.dev', icon: icons.web },
    ],
  },
]

// The wall is pinned once its foundations reach the bottom of the screen, which needs its height
const wall = useTemplateRef('wall')
const { height: wallHeight } = useElementSize(wall, undefined, { box: 'border-box' })

const tiers: Tier[] = [
  {
    name: 'Atlas',
    description: 'Główny zespół. Trzymają nasze projekty na swoich barkach.',
    people: [
      { name: 'Aniela Starzyk', email: 'aniela.starzyk@zerya.dev', links: [{ label: 'GitHub', to: 'https://github.com/Sanielia', icon: icons.github }, { label: 'sanielia.dev', to: 'https://sanielia.dev/', icon: icons.web }] },
      { name: 'Maja' },
    ],
  },
  {
    name: 'Maskonurek',
    description: 'Stażyści i osoby na część etatu. Uczą się u nas na prawdziwych projektach.',
    people: [
      { name: 'Danylo „Dannov” Seleznov', email: 'danylo.seleznov@zerya.dev', links: [{ label: 'GitHub', to: 'https://github.com/Dannov', icon: icons.github }, { label: 'LinkedIn', to: 'https://pl.linkedin.com/in/danylo-seleznov-988622419', icon: icons.linkedin }] },
      { name: 'Kacper Oberwan', email: 'kacper.oberwan@zerya.dev', links: [{ label: 'GitHub', to: 'https://github.com/P0m1d00r', icon: icons.github }] },
      { name: 'Ola „Japko” Jabłonowska', email: 'ola.japko@zerya.dev', links: [{ label: 'LinkedIn', to: 'https://www.linkedin.com/in/aleksandra-jab%C5%82o%C5%84ska-a91ab72aa', icon: icons.linkedin }] },
      { name: 'Barmalei', links: [{ label: 'GitHub', to: 'https://github.com/YeliseiBarmalei', icon: icons.github }, { label: 'itch.io', to: 'https://artelqq.itch.io/', icon: icons.web }] },
    ],
  },
  {
    name: 'Przyjaciele',
    description: 'Osoby spoza zespołu, które nam pomogły albo współpracują z nami przy konkretnych rzeczach.',
    people: [
      { name: 'Wojciech Piech', email: 'wojciech.w.piech@gmail.com', links: [{ label: 'GitHub', to: 'https://github.com/wojpo', icon: icons.github }, { label: 'LinkedIn', to: 'https://www.linkedin.com/in/wojciech-piech-059276325/', icon: icons.linkedin }] },
      { name: 'Oskiks' },
    ],
  },
]
</script>

<template>
  <!-- Lets clicks through to the projects' last screen, which this one starts over; only the people take them back -->
  <section data-scene class="team pointer-events-none relative bg-night text-ink">
    <!-- In-page links land where the gate is already open -->
    <span id="zespol" class="absolute top-[60svh] motion-reduce:top-0" />

    <!-- The scene, pinned behind the whole section -->
    <div class="absolute inset-0" aria-hidden="true">
      <div class="sticky top-0 h-svh overflow-hidden">
        <!-- The section's own night, which only comes in once the projects' sky has closed into the line -->
        <div class="team-night absolute inset-0 bg-night" />
        <div class="team-open absolute inset-0 bg-paper">
          <SiteSky />
          <SiteRuins />
        </div>
        <span class="team-edge top-1/2 -translate-y-px" />
        <span class="team-edge top-1/2" />
      </div>
    </div>

    <div class="team-content relative mx-auto w-full max-w-[1328px] px-6 md:px-16">
      <div class="h-[210svh] motion-reduce:h-auto">
        <div class="team-thesis sticky top-0 flex h-svh flex-col justify-center md:max-lg:justify-start md:max-lg:pt-[14svh]">
          <p class="text-xs font-medium text-ink/55">
            Zespół
          </p>
          <h2 class="mt-4 max-w-[14ch] text-[36px]/[44px] font-semibold tracking-[-0.035em] md:text-[64px]/[68px] xl:text-[80px]/[84px]">
            Rozmawiasz z tymi, którzy budują.
          </h2>
          <p class="mt-8 max-w-[48ch] text-base/6 text-ink/75 md:text-lg/7">
            Wyrośliśmy z krakowskiego środowiska technologicznego i startupowego. Zawsze rozwiązywaliśmy problemy. Teraz
            robimy to komercyjnie.
          </p>
        </div>
      </div>

      <!-- The people keep to the open sky left of the ruins, each group a block of ashlar lit from the upper
           left like the print, so they read on a stone face wherever the scene runs behind them -->
      <div ref="wall" class="team-wall pointer-events-auto lg:max-w-[520px] xl:max-w-[560px] 2xl:max-w-[640px] min-[1900px]:max-w-[720px]" :style="{ '--wall': `${wallHeight}px` }">
        <div class="relative grid gap-2">
          <img src="/img/ruins/moss.webp" alt="" width="640" height="96" loading="lazy" class="pointer-events-none absolute -top-8 -left-2 z-10 w-80" aria-hidden="true">
          <!-- The founders are the cornerstone -->
          <div class="ashlar p-6 pr-10 pb-10 md:p-8 md:pr-12 md:pb-12">
            <p class="relative z-10 text-xs font-medium text-ink/55">
              Founderzy
            </p>
            <ul class="relative z-10 mt-6 grid gap-12">
              <li v-for="founder in founders" :key="founder.name" class="grid gap-6 sm:grid-cols-[160px_1fr]">
                <img :src="founder.photo" alt="" width="320" height="320" loading="lazy" class="size-40">
                <div class="sm:pt-4">
                  <h3 class="text-[28px]/[36px] font-semibold tracking-[-0.02em]">
                    {{ founder.name }}
                  </h3>
                  <p class="mt-1 text-sm text-ink/60">
                    {{ founder.area }}
                  </p>
                  <p class="mt-4 text-base/6 text-ink/80">
                    {{ founder.bio }}
                  </p>
                  <div class="mt-4 flex flex-wrap items-center gap-4">
                    <a :href="`mailto:${founder.email}`" class="text-sm text-ink/70 underline-offset-4 hover:text-ink hover:underline">{{ founder.email }}</a>
                    <a
                      v-for="link in founder.links" :key="link.to" :href="link.to" target="_blank" :aria-label="`${link.label}: ${founder.name}`"
                      class="text-ink/60 transition-colors hover:text-ink"
                    >
                      <UIcon :name="link.icon" class="size-4" />
                    </a>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <!-- Then one block per tier, its people a plain list -->
          <div v-for="tier in tiers" :key="tier.name" class="ashlar p-6 pr-10 pb-10 md:p-8 md:pr-12 md:pb-12">
            <h3 class="text-[22px]/[28px] font-semibold tracking-[-0.01em]">
              {{ tier.name }}
            </h3>
            <p class="mt-2 max-w-[44ch] text-sm text-ink/60">
              {{ tier.description }}
            </p>
            <ul class="relative z-10 mt-6 divide-y divide-stone/40 border-t border-stone/40">
              <li v-for="person in tier.people" :key="person.name" class="flex items-center gap-4 py-3">
                <div class="min-w-0 grow">
                  <p class="text-base font-medium">
                    {{ person.name }}
                  </p>
                  <!-- Long addresses break before the domain, never inside a word -->
                  <a v-if="person.email" :href="`mailto:${person.email}`" class="block text-sm text-ink/60 hover:text-ink">{{ person.email.split('@')[0] }}<wbr>@{{ person.email.split('@')[1] }}</a>
                </div>
                <ul v-if="person.links?.length" class="flex shrink-0 gap-3">
                  <li v-for="link in person.links" :key="link.to">
                    <a :href="link.to" target="_blank" :aria-label="`${link.label}: ${person.name}`" class="flex text-ink/60 transition-colors hover:text-ink">
                      <UIcon :name="link.icon" class="size-4" />
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
        <!-- The wall stands on what is left of older foundations, half sunk in the grass -->
        <div class="foundation relative z-10 -mt-16 h-[240px]" aria-hidden="true" />
      </div>
      <!-- How long the wall stands on the bottom of the screen: a while on its own, then the last gate
           opens over the last 40svh -->
      <div class="h-[100svh] motion-reduce:hidden" />
    </div>
  </section>
</template>

<style scoped>
/* `--v` is how many screens have been scrolled into the section, set by useScrollScenes.
   Without it, and without motion, the scene is simply open. */

.team {
  --open: clamp(0, (var(--v, 10) - 0.06) / 0.4, 1);
}

.team-edge {
  position: absolute;
  inset-inline: 0;
  height: 1px;
  background: linear-gradient(to right, transparent, var(--color-paper), transparent);
  opacity: calc(1 - var(--open));
}

@media (prefers-reduced-motion: no-preference) {
  /* The section starts under the projects' last screen, where their sky closes into a line at the
     middle. Until it is pinned it shows nothing, then its night and its line take over from there. */
  .team {
    --here: clamp(0, var(--v, 10) * 50, 1);

    z-index: 20;
    margin-top: -100svh;
    background: transparent;
  }

  /* Gone once the gate is open, so it cannot show through the scene's fractional bottom edge as a seam */
  .team-night {
    opacity: calc(var(--here) * clamp(0, (1 - var(--open)) * 1000, 1));
  }

  .team-edge {
    opacity: calc((1 - var(--open)) * var(--here));
  }

  /* The same gate as everywhere else: slow from the line, fast through the middle, slow into place */
  .team-open {
    --e: calc(var(--open) * var(--open) * (3 - 2 * var(--open)));

    clip-path: inset(calc((1 - var(--e)) * 50%) 0);
  }

  .team-edge:first-of-type {
    translate: 0 calc(var(--open) * var(--open) * (3 - 2 * var(--open)) * -50svh);
  }

  .team-edge:last-of-type {
    translate: 0 calc(var(--open) * var(--open) * (3 - 2 * var(--open)) * 50svh);
  }

  .team-wall {
    position: sticky;
    top: calc(100svh - var(--wall));
  }

  /* The thesis rises once the gate is mostly open */
  .team-thesis {
    --in: clamp(0, (var(--v, 10) - 0.32) / 0.2, 1);

    opacity: var(--in);
    translate: 0 calc((1 - var(--in)) * 4svh);
  }
}

/* The print's foundation band repeats across the column; its stones begin 56px below its top */
.foundation {
  background: image-set(url('/img/ruins/layers/foundation.webp') 1x, url('/img/ruins/layers/foundation@2x.webp') 2x)
    left top / 1920px 240px repeat-x;
}

@media (prefers-reduced-motion: reduce) {
  .team-edge {
    display: none;
  }
}
</style>
