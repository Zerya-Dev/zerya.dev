<script setup lang="ts">
import {
  HOME_CONTACT,
  HOME_HERO,
  HOME_MISSION,
  HOME_PARTNERS,
  HOME_SEO,
  HOME_TEAM,
} from '~~/content/pages/home'
import { FEATURED_PARTNERS, SUPPORTING_PARTNERS } from '~~/content/partners'
import { TEAM_MEMBERS } from '~~/content/team'

const [primaryLink, secondaryLink] = HOME_HERO.links

useSeoMeta({
  title: HOME_SEO.title,
  description: HOME_SEO.description,
  ogTitle: HOME_SEO.ogTitle,
  ogDescription: HOME_SEO.ogDescription,
})
</script>

<template>
  <main id="main-content">
    <section class="relative overflow-hidden bg-space text-white" aria-labelledby="hero-title">
      <div class="relative mx-auto flex min-h-240 w-full max-w-7xl flex-col items-center gap-12 px-4 py-16 md:gap-16 md:px-6 md:py-20 lg:flex-row lg:gap-12 xl:gap-20">
        <div class="relative z-1 w-full min-w-0 max-w-3xl lg:flex-1 lg:-translate-y-8">
          <h1 id="hero-title" class="m-0 max-w-2xl text-5xl leading-none font-bold tracking-tighter uppercase md:text-7xl lg:text-6xl xl:text-7xl">
            {{ HOME_HERO.title }} <em class="whitespace-nowrap">{{ HOME_HERO.emphasis }}</em>
          </h1>
          <p class="mt-6 max-w-xl text-base leading-7 text-slate-300">
            {{ HOME_HERO.description }}
          </p>
          <div class="mt-8 flex flex-wrap gap-4 max-sm:flex-col">
            <UButton :to="primaryLink.to" color="primary" size="xl" class="min-h-12 justify-center rounded-md px-6 font-bold transition-transform hover:-translate-y-1">
              {{ primaryLink.label }}
            </UButton>
            <UButton :to="secondaryLink.to" color="secondary" variant="outline" size="xl" class="min-h-12 justify-center rounded-md px-6 font-bold text transition-transform hover:-translate-y-1">
              {{ secondaryLink.label }}
            </UButton>
          </div>
          <dl class="mt-10 flex gap-8 max-sm:gap-4 max-sm:*:min-w-0 max-sm:*:flex-1" aria-label="Najważniejsze wyniki">
            <div v-for="stat in HOME_HERO.stats" :key="`${stat.value}-${stat.label}`" class="border-l-2 border-zerya-500/70 pl-4 max-md:pl-2">
              <dt class="text-xl font-extrabold tracking-tighter max-md:text-lg">
                {{ stat.value }}
              </dt>
              <dd class="mt-2 text-xs text-slate-400">
                {{ stat.label }}
              </dd>
            </div>
          </dl>
        </div>
        <div class="w-full min-w-0 lg:flex-1">
          <PhotoCarousel :slides="HOME_HERO.slides" />
        </div>
      </div>
    </section>

    <PageSection color="bg-white" label="mission-title">
      <SectionHeader :label="HOME_MISSION.label" :title="HOME_MISSION.title" title-id="mission-title" />
      <div class="flex flex-wrap gap-4">
        <UCard
          v-for="item in HOME_MISSION.items"
          :key="item.number"
          class="group min-h-80 w-full min-w-0 rounded-md transition duration-200 hover:-translate-y-1 hover:border-zerya-600/55 hover:shadow-xl hover:shadow-space/8 md:min-h-88 md:w-[calc((100%-1rem)/2)] md:last:w-full lg:w-[calc((100%-2rem)/3)] lg:last:w-[calc((100%-2rem)/3)]"
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
            <a v-if="item.link.external" :href="item.link.to" target="_blank" rel="noopener noreferrer">
              <span class="text-xs font-extrabold text-zerya-700">{{ item.link.label }} <UIcon name="i-lucide-arrow-up-right" class="size-4 align-text-bottom" aria-hidden="true" /></span>
              <span class="sr-only">(otwiera się w nowej karcie)</span>
            </a>
            <NuxtLink v-else :to="item.link.to" class="text-xs font-extrabold text-zerya-700">
              {{ item.link.label }} <UIcon name="i-lucide-arrow-right" class="size-4 align-text-bottom" aria-hidden="true" />
            </NuxtLink>
          </div>
        </UCard>
      </div>
    </PageSection>

    <PageSection id="partnerzy" color="bg-canvas" label="partners-title">
      <SectionHeader :label="HOME_PARTNERS.label" :title="HOME_PARTNERS.title" :description="HOME_PARTNERS.description" title-id="partners-title" />

      <div class="flex flex-col gap-4 md:flex-row">
        <a
          v-for="partner in FEATURED_PARTNERS"
          :key="partner.name"
          :href="partner.url"
          class="group flex min-h-48 min-w-0 flex-col items-center justify-center gap-4 p-8 text-center transition duration-200 hover:opacity-75 md:flex-1"
        >
          <NuxtImg
            :src="partner.logo"
            :alt="partner.logoAlt"
            width="160"
            height="64"
            fit="inside"
            densities="1x 2x"
            class="h-16 w-40 object-contain brightness-0 transition-transform duration-200 group-hover:scale-105"
            loading="lazy"
          />
          <span class="text-base font-extrabold tracking-widest text-zerya-700">{{ partner.tagline }}</span>
        </a>
      </div>
      <div class="mt-8 flex flex-wrap items-center justify-center gap-8" aria-label="Pozostali partnerzy">
        <a
          v-for="partner in SUPPORTING_PARTNERS"
          :key="partner.name"
          :href="partner.url"
          class="flex min-h-16 w-32 items-center justify-center p-4 transition hover:opacity-75 sm:w-40"
        >
          <NuxtImg
            :src="partner.logo"
            :alt="partner.logoAlt"
            width="128"
            height="40"
            fit="inside"
            densities="1x 2x"
            class="h-10 w-32 object-contain brightness-0"
            loading="lazy"
          />x
        </a>
      </div>
    </PageSection>

    <PageSection color="bg-white" label="team-title">
      <div class="items-end justify-between gap-8 md:flex">
        <SectionHeader :label="HOME_TEAM.label" :title="HOME_TEAM.title" title-id="team-title" />
        <NuxtLink class="mb-8 inline-block text-sm font-extrabold text-zerya-700 md:mb-14" :to="HOME_TEAM.link.to">
          {{ HOME_TEAM.link.label }} <UIcon name="i-lucide-arrow-right" class="size-4 align-text-bottom" aria-hidden="true" />
        </NuxtLink>
      </div>
      <div class="flex flex-col gap-4 md:flex-row">
        <UCard v-for="person in TEAM_MEMBERS" :key="person.role" class="group min-w-0 overflow-hidden rounded-md bg-canvas md:flex-1" :ui="{ body: 'flex p-0 sm:p-0 md:flex-col' }">
          <div class="w-1/3 shrink-0 md:w-full">
            <ImagePlaceholder :label="`Portret — ${person.name}`" tone="mint" class="h-36 transition duration-300 group-hover:scale-105 md:h-96" />
          </div>
          <div class="min-w-0 flex-1 self-center p-6 md:w-full md:p-8">
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
      <UCard class="rounded-none bg-canvas ring-0 md:rounded-md" :ui="{ body: 'flex flex-col gap-12 p-10 sm:p-10 md:p-12 lg:flex-row xl:gap-20 xl:p-16' }">
        <div class="min-w-0 lg:flex-1">
          <h2 id="contact-title" class="mt-4 text-4xl leading-tight font-extrabold tracking-tighter md:text-5xl">
            {{ HOME_CONTACT.title }}
          </h2>
          <p class="mt-6 leading-7 text-slate-500">
            {{ HOME_CONTACT.description }}
          </p>
          <a class="mt-6 inline-block font-extrabold text-zerya-700" :href="`mailto:${HOME_CONTACT.email}`">{{ HOME_CONTACT.email }}</a>
        </div>
        <div class="min-w-0 lg:flex-1">
          <ContactForm />
        </div>
      </UCard>
    </PageSection>
  </main>
</template>
