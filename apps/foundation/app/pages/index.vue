<script setup lang="ts">
import { featuredPartners, heroSlides, missionItems, supportingPartners, team } from '~/data/landing'

useSeoMeta({
  title: 'Edukacja przez rywalizację',
  description: 'Organizujemy ambitne wydarzenia edukacyjne, od hackathonów po CTF-y, w których wiedzę zdobywa się przede wszystkim w praktyce.',
  ogTitle: 'Fundacja Zerya — edukacja przez rywalizację',
  ogDescription: 'Praktyka, rywalizacja i społeczność. Poznaj projekty Fundacji Zerya.',
})
</script>

<template>
  <main id="main-content">
    <section class="relative overflow-hidden bg-space text-white" aria-labelledby="hero-title">
      <div class="relative mx-auto grid min-h-240 w-full max-w-7xl grid-cols-1 items-center gap-12 px-4 py-16 md:gap-16 md:px-6 md:py-20 lg:grid-cols-2 lg:gap-12 xl:gap-20">
        <div class="relative z-1 min-w-0 max-w-3xl lg:-translate-y-8">
          <h1 id="hero-title" class="m-0 max-w-2xl text-5xl leading-none font-bold tracking-tighter uppercase md:text-7xl lg:text-6xl xl:text-7xl">
            Edukacja przez <em class="whitespace-nowrap">rywalizację</em>
          </h1>
          <p class="mt-6 max-w-xl text-base leading-7 text-slate-300">
            Organizujemy wydarzenia, które zamieniają naukę w realne wyzwanie — od hackathonów po CTF-y, gdzie wiedzę zdobywa się przede wszystkim w praktyce.
          </p>
          <div class="mt-8 flex flex-wrap gap-4 max-sm:grid">
            <UButton to="/projekty" color="primary" size="xl" class="min-h-12 justify-center rounded-md px-6 font-bold text-space transition-transform hover:-translate-y-1">
              Zobacz projekty
            </UButton>
            <UButton to="/o-nas" color="neutral" variant="outline" size="xl" class="min-h-12 justify-center rounded-md border-white/45 bg-transparent px-6 font-bold text-white transition-transform hover:-translate-y-1 hover:border-white hover:bg-white/10">
              Poznaj fundację
            </UButton>
          </div>
          <dl class="mt-10 flex gap-8 max-sm:grid max-sm:grid-cols-3 max-sm:gap-4" aria-label="Najważniejsze wyniki">
            <div class="border-l-2 border-zerya-500/70 pl-4 max-md:pl-2">
              <dt class="text-xl font-extrabold tracking-tighter max-md:text-lg">
                300 +
              </dt>
              <dd class="mt-2 text-xs text-slate-400">
                uczestników wydarzeń
              </dd>
            </div>
            <div class="border-l-2 border-zerya-500/70 pl-4 max-md:pl-2">
              <dt class="text-xl font-extrabold tracking-tighter max-md:text-lg">
                30 h
              </dt>
              <dd class="mt-2 text-xs text-slate-400">
                flagowego wydarzenia
              </dd>
            </div>
            <div class="border-l-2 border-zerya-500/70 pl-4 max-md:pl-2">
              <dt class="text-xl font-extrabold tracking-tighter max-md:text-lg">
                30+
              </dt>
              <dd class="mt-2 text-xs text-slate-400">
                wolontariuszy
              </dd>
            </div>
          </dl>
        </div>
        <PhotoCarousel :slides="heroSlides" />
      </div>
    </section>

    <PageSection color="bg-white" label="mission-title">
      <SectionHeader label="Nasza misja" title="Nasza misja i jak ją realizujemy" title-id="mission-title" />
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <UCard
          v-for="item in missionItems"
          :key="item.number"
          class="group min-h-80 rounded-md transition duration-200 hover:-translate-y-1 hover:border-zerya-600/55 hover:shadow-xl hover:shadow-space/8 md:min-h-88 md:last:col-span-2 lg:last:col-span-1"
          :ui="{ body: 'flex h-full min-h-80 flex-col p-10 md:min-h-88 md:p-12' }"
        >
          <span class="text-xs font-extrabold tracking-widest text-zerya-600">{{ item.number }}</span>
          <h3 class="mt-6 text-2xl font-bold tracking-tighter md:text-3xl">
            {{ item.title }}
          </h3>
          <p class="mt-4 leading-7 text-slate-500">
            {{ item.description }}
          </p>
          <div class="mt-auto flex flex-col items-start gap-2 pt-8">
            <strong class="text-xl tracking-tighter">{{ item.proof }}</strong>
            <a v-if="item.external" :href="item.to" target="_blank" rel="noopener noreferrer">
              <span class="text-xs font-extrabold text-zerya-700">{{ item.link }} <UIcon name="i-lucide-arrow-up-right" class="size-4 align-text-bottom" aria-hidden="true" /></span>
              <span class="sr-only">(otwiera się w nowej karcie)</span>
            </a>
            <NuxtLink v-else :to="item.to" class="text-xs font-extrabold text-zerya-700">
              {{ item.link }} <UIcon name="i-lucide-arrow-right" class="size-4 align-text-bottom" aria-hidden="true" />
            </NuxtLink>
          </div>
        </UCard>
      </div>
    </PageSection>

    <PageSection id="partnerzy" color="bg-canvas" label="partners-title">
      <SectionHeader label="Partnerzy" title="Partnerzy naszych wydarzeń" description="Organizacje, które pomagają nam tworzyć ambitne i bezpieczne doświadczenia edukacyjne." title-id="partners-title" />

      <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
        <a
          v-for="partner in featuredPartners"
          :key="partner.name"
          :href="partner.url"
          class="group flex min-h-48 flex-col items-center justify-center gap-4 p-8 text-center transition duration-200 hover:opacity-75"
        >
          <img :src="partner.logo" :alt="partner.logoAlt" class="h-16 w-40 object-contain brightness-0 transition-transform duration-200 group-hover:scale-105" loading="lazy">
          <span class="text-base font-extrabold tracking-widest text-zerya-700">{{ partner.tagline }}</span>
        </a>
      </div>
      <div class="mt-8 flex flex-wrap items-center justify-center gap-8" aria-label="Pozostali partnerzy">
        <a
          v-for="partner in supportingPartners"
          :key="partner.name"
          :href="partner.url"
          class="flex min-h-16 w-32 items-center justify-center p-4 transition hover:opacity-75 sm:w-40"
        >
          <img :src="partner.logo" :alt="partner.logoAlt" class="h-10 w-32 object-contain brightness-0" loading="lazy">
        </a>
      </div>
    </PageSection>

    <PageSection color="bg-white" label="team-title">
      <div class="items-end justify-between gap-8 md:flex">
        <SectionHeader label="Zespół" title="Nasz zespół" title-id="team-title" />
        <NuxtLink class="mb-8 inline-block text-sm font-extrabold text-zerya-700 md:mb-14" to="/o-nas#zespol">
          Poznaj cały zespół <UIcon name="i-lucide-arrow-right" class="size-4 align-text-bottom" aria-hidden="true" />
        </NuxtLink>
      </div>
      <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
        <UCard v-for="person in team" :key="person.role" class="group overflow-hidden rounded-md bg-canvas" :ui="{ body: 'grid grid-cols-3 p-0 sm:p-0 md:block' }">
          <ImagePlaceholder :label="`Portret — ${person.name}`" tone="mint" class="h-36 transition duration-300 group-hover:scale-105 md:h-96" />
          <div class="col-span-2 self-center p-6 md:p-8">
            <h3 class="m-0 text-base font-bold">
              {{ person.name }}
            </h3>
            <p class="mt-1 text-xs text-slate-500 lowercase">
              {{ person.role }}
            </p>
          </div>
        </UCard>
      </div>
    </PageSection>

    <PageSection color="bg-white" label="contact-title">
      <div class="grid grid-cols-1 gap-12 bg-canvas p-10 md:rounded-md md:p-12 lg:grid-cols-2 lg:gap-12 xl:p-16 xl:gap-20">
        <div>
          <h2 id="contact-title" class="mt-4 text-4xl leading-tight font-extrabold tracking-tighter md:text-5xl">
            Porozmawiajmy o wspólnym projekcie
          </h2>
          <p class="mt-6 leading-7 text-slate-500">
            Masz pomysł na wydarzenie, partnerstwo lub chcesz wesprzeć nasze działania? Napisz — skierujemy wiadomość do właściwej osoby.
          </p>
          <a class="mt-6 inline-block font-extrabold text-zerya-700" href="mailto:foundation@zerya.dev">foundation@zerya.dev</a>
        </div>
        <ContactForm />
      </div>
    </PageSection>
  </main>
</template>
