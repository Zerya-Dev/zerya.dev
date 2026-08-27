<script setup lang="ts">
import { organizationMetrics, supportingTeamMembers, teamMembers } from '~/data/site'

useSeoMeta({
  title: 'O nas',
  description: 'Poznaj misję, doświadczenie i osoby odpowiedzialne za realizację projektów Fundacji Zerya.',
})

const values = [
  { title: 'Nauka przez praktykę', description: 'Uczymy przez działanie i pracę nad realnymi projektami.', icon: 'i-lucide-wrench' },
  { title: 'Współpraca', description: 'Budujemy społeczność młodych ludzi o wspólnych zainteresowaniach.', icon: 'i-lucide-handshake' },
  { title: 'Bezpieczna rywalizacja', description: 'Wierzymy, że rywalizacja jest dobrym narzędziem do motywacji i rozwoju.', icon: 'i-lucide-shield-check' },
]
</script>

<template>
  <main id="main-content">
    <PageHero label="O fundacji" title="Kim jesteśmy" description="Organizujemy ambitne wydarzenia edukacyjne — od programu po bezpieczeństwo uczestników." />

    <PageSection color="bg-white" label="origin-title" spacing="bottom">
      <div class="grid gap-8 lg:grid-cols-2 lg:gap-16">
        <div class="overflow-hidden rounded-sm">
          <ImagePlaceholder label="Zespół Fundacji Zerya podczas realizacji wydarzenia" tone="dark" class="min-h-96" />
        </div>
        <div class="self-center py-4">
          <p class="text-sm font-extrabold tracking-widest text-zerya-700 uppercase">
            Nasza geneza
          </p>
          <h2 id="origin-title" class="mt-4 text-4xl font-extrabold tracking-tighter md:text-5xl">
            Zaczęliśmy od zauważenia problemu
          </h2>
          <div class="mt-6 space-y-4 leading-7 text-slate-500">
            <p>Fundacja Zerya powstała z inicjatywy młodych ludzi zainteresowanych różnymi tematami, od cyberbezpieczeństwa po przedsiębiorczość, którzy zauważyli brak, niską jakość lub wysoki próg wejścia inicjatyw edukacyjnych skierowanych do młodzieży.</p>
            <p>Doświadczenie zdobyliśmy w praktyce: planując pierwsze wydarzenia, zdobywając pierwszych sponsorów i ucząc się jak skutecznie organizować takie wydarzenia.</p>
          </div>
        </div>
      </div>
    </PageSection>

    <PageSection color="bg-mint" label="mission-title">
      <SectionHeader label="Nasze wartości" title="Nasze wartości" title-id="mission-title" />
      <div class="grid gap-4 md:grid-cols-3">
        <InfoCard v-for="value in values" :key="value.title" v-bind="value" />
      </div>
    </PageSection>

    <PageSection color="bg-space text-white" label="trust-title">
      <SectionHeader label="Doświadczenie" title="Dlaczego można nam zaufać" description="Najważniejsze liczby przechowujemy jako dane, dzięki czemu można je łatwo aktualizować wraz z rozwojem fundacji." title-id="trust-title" dark />
      <MetricGrid :metrics="organizationMetrics" dark />
    </PageSection>

    <PageSection id="zespol" color="bg-white" label="team-title">
      <SectionHeader label="Zespół" title="Nasz zespół" description="Za każdym obszarem stoi konkretna osoba znająca się na temacie." title-id="team-title" />
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <TeamMemberCard v-for="person in teamMembers" :key="person.role" v-bind="person" />
      </div>
      <div class="mt-12 border-t border-slate-200 pt-8">
        <h3 class="text-2xl font-extrabold tracking-tighter md:text-3xl">
          Pozostali członkowie zespołu
        </h3>
        <p class="mt-3 max-w-2xl leading-7 text-slate-500">
          W realizację projektów angażują się także osoby wspierające konkretne obszary wydarzeń.
        </p>
        <ul class="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3" aria-label="Pozostali członkowie zespołu">
          <li v-for="person in supportingTeamMembers" :key="`${person.name}-${person.role}`" class="flex items-center justify-between gap-4 border-b border-slate-200 py-3">
            <span class="font-bold">{{ person.name }}</span>
            <span class="text-right text-sm text-slate-500">{{ person.role }}</span>
          </li>
        </ul>
      </div>
    </PageSection>

    <PageSection color="bg-canvas" label="next-title">
      <h2 id="next-title" class="sr-only">
        Kolejne kroki
      </h2>
      <div class="grid gap-4 lg:grid-cols-2">
        <div class="rounded-md bg-white p-8 md:p-12">
          <p class="text-sm font-extrabold text-zerya-700">
            Zobacz dowody
          </p>
          <h3 class="mt-4 text-3xl font-extrabold tracking-tighter">
            Najlepszy sposób, by nas poznać, to zobaczyć nasze wydarzenia.
          </h3>
          <UButton to="/projekty" color="primary" size="xl" class="mt-8 rounded-md px-6 font-bold text-space">
            Przejdź do projektów <UIcon name="i-lucide-arrow-right" class="size-4" aria-hidden="true" />
          </UButton>
        </div>
        <div class="rounded-md bg-space p-8 text-white md:p-12">
          <p class="text-sm font-extrabold text-zerya-400">
            Dla partnerów
          </p>
          <h3 class="mt-4 text-3xl font-extrabold tracking-tighter">
            Chcesz współpracować?
          </h3>
          <p class="mt-4 leading-7 text-slate-300">
            Kontakt dla sponsorów, partnerów i instytucji.
          </p>
          <UButton to="/kontakt" color="primary" size="xl" class="mt-8 rounded-md px-6 font-bold text-space">
            Kontakt <UIcon name="i-lucide-arrow-right" class="size-4" aria-hidden="true" />
          </UButton>
        </div>
      </div>
    </PageSection>
  </main>
</template>
