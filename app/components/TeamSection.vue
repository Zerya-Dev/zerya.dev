<script setup lang="ts">
interface Link { label: string, to: string, icon: string }

interface Person {
  name: string
  email?: string
  links?: Link[]
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
const founders: { name: string, description: string, people: Founder[] } = {
  name: 'Founderzy',
  description: 'Założyli Zeryę. Prowadzą projekty ale też nad nimi pracują.',
  people: [
    {
      name: 'Wiktor Popiołek',
      email: 'wiktor@zerya.dev',
      area: 'Produkt i strategia - CEO',
      photo: '/img/team/wikipop.webp',
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
      area: 'Technologia - CTO',
      photo: '/img/team/norbiros.webp',
      bio: 'Ma ostatnie słowo w sprawach technicznych. Dba o architekturę i jakość kodu. Programuje, rozwija open source i platformę Hack4Krak.',
      links: [
        { label: 'LinkedIn', to: 'https://www.linkedin.com/in/norbert-szeremet/', icon: icons.linkedin },
        { label: 'GitHub', to: 'https://github.com/Norbiros', icon: icons.github },
        { label: 'norbiros.dev', to: 'https://norbiros.dev', icon: icons.web },
      ],
    },
  ],
}

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
  <section id="zespol" class="bg-paper text-ink">
    <div class="mx-auto w-full max-w-[1328px] px-6 py-24 md:px-16 md:py-32">
      <p class="text-xs font-medium text-ink/60">
        Zespół
      </p>
      <h2
        class="mt-4 max-w-[20ch] text-[28px]/[36px] font-medium tracking-[-0.02em] md:text-[36px]/[44px] xl:text-[48px]/[56px]"
      >
        Rozmawiasz z tymi, którzy budują.
      </h2>
      <p class="mt-6 max-w-[48ch] text-base text-ink/70">
        Wyrośliśmy z krakowskiego środowiska technologicznego i startupowego. Zawsze rozwiązywaliśmy problemy. Teraz
        robimy to komercyjnie.
      </p>

      <div class="mt-16 border-t border-line md:mt-24">
        <div class="grid gap-8 border-b border-line py-12 md:grid-cols-12 md:gap-6">
          <div class="md:col-span-4">
            <h3 class="text-[22px]/[28px] font-medium tracking-tight">
              {{ founders.name }}
            </h3>
            <p class="mt-2 max-w-[32ch] text-sm text-ink/60">
              {{ founders.description }}
            </p>
          </div>
          <ul class="grid gap-x-6 gap-y-12 sm:grid-cols-2 md:col-span-8">
            <li v-for="founder in founders.people" :key="founder.name">
              <div class="flex items-center gap-4">
                <NuxtImg
                  :src="founder.photo" alt="" width="64" height="64" densities="x1 x2" format="webp" loading="lazy"
                  class="size-16 shrink-0 rounded-full object-cover"
                />
                <div>
                  <p class="text-base font-medium">
                    {{ founder.name }}
                  </p>
                  <p class="text-sm text-ink/60">
                    {{ founder.area }}
                  </p>
                  <a
                    :href="`mailto:${founder.email}`"
                    class="mt-1 block font-mono text-xs text-ink/60 hover:text-ink"
                  >{{ founder.email }}</a>
                </div>
              </div>
              <p class="mt-4 max-w-[44ch] text-base text-ink/70">
                {{ founder.bio }}
              </p>
              <ul class="mt-4 flex gap-3">
                <li v-for="link in founder.links" :key="link.to">
                  <a
                    :href="link.to" target="_blank" :aria-label="`${link.label}: ${founder.name}`"
                    class="text-ink/60 transition-colors hover:text-ink"
                  >
                    <UIcon :name="link.icon" class="size-4" />
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>

        <div
          v-for="tier in tiers" :key="tier.name"
          class="grid gap-8 border-b border-line py-12 md:grid-cols-12 md:gap-6"
        >
          <div class="md:col-span-4">
            <h3 class="text-[22px]/[28px] font-medium tracking-tight">
              {{ tier.name }}
            </h3>
            <p class="mt-2 max-w-[32ch] text-sm text-ink/60">
              {{ tier.description }}
            </p>
          </div>
          <ul class="grid gap-x-6 gap-y-8 sm:grid-cols-2 md:col-span-8 lg:grid-cols-3">
            <li v-for="person in tier.people" :key="person.name">
              <p class="text-base font-medium">
                {{ person.name }}
              </p>
              <a
                v-if="person.email" :href="`mailto:${person.email}`"
                class="mt-1 block font-mono text-xs text-ink/60 hover:text-ink"
              >{{ person.email }}</a>
              <ul v-if="person.links?.length" class="mt-3 flex gap-3">
                <li v-for="link in person.links" :key="link.to">
                  <a
                    :href="link.to" target="_blank" :aria-label="`${link.label}: ${person.name}`"
                    class="text-ink/60 transition-colors hover:text-ink"
                  >
                    <UIcon :name="link.icon" class="size-4" />
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
