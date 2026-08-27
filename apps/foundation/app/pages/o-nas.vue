<script setup lang="ts">
import { ORGANIZATION_METRICS } from '~~/content/metrics'
import {
  ABOUT_HERO,
  ABOUT_NEXT,
  ABOUT_ORIGIN,
  ABOUT_SEO,
  ABOUT_TEAM_SECTION,
  ABOUT_TRUST,
  ABOUT_VALUES,
} from '~~/content/pages/about'
import { SUPPORTING_TEAM_MEMBERS, TEAM_MEMBERS } from '~~/content/team'

useSeoMeta({
  title: ABOUT_SEO.title,
  description: ABOUT_SEO.description,
})
</script>

<template>
  <main id="main-content">
    <PageHero :label="ABOUT_HERO.label" :title="ABOUT_HERO.title" :description="ABOUT_HERO.description" />

    <PageSection color="bg-white" label="origin-title" spacing="bottom">
      <div class="flex flex-col gap-8 lg:flex-row lg:gap-16">
        <div class="min-w-0 overflow-hidden rounded-sm lg:flex-1">
          <NuxtImg :src="ABOUT_ORIGIN.image.src" :alt="ABOUT_ORIGIN.image.alt" tone="dark" class="min-h-96" />
        </div>
        <div class="min-w-0 self-center py-4 lg:flex-1">
          <p class="text-sm font-extrabold tracking-widest text-zerya-700 uppercase">
            {{ ABOUT_ORIGIN.label }}
          </p>
          <h2 id="origin-title" class="mt-4 text-4xl font-extrabold tracking-tighter md:text-5xl">
            {{ ABOUT_ORIGIN.title }}
          </h2>
          <div class="mt-6 space-y-4 leading-7 text-slate-500">
            <p v-for="paragraph in ABOUT_ORIGIN.paragraphs" :key="paragraph">
              {{ paragraph }}
            </p>
          </div>
        </div>
      </div>
    </PageSection>

    <PageSection color="bg-mint" label="mission-title">
      <SectionHeader :label="ABOUT_VALUES.label" :title="ABOUT_VALUES.title" title-id="mission-title" />
      <div class="flex flex-col gap-4 md:flex-row">
        <InfoCard v-for="value in ABOUT_VALUES.items" :key="value.title" v-bind="value" class="min-w-0 md:flex-1" />
      </div>
    </PageSection>

    <PageSection color="bg-space text-white" label="trust-title">
      <SectionHeader :label="ABOUT_TRUST.label" :title="ABOUT_TRUST.title" :description="ABOUT_TRUST.description" title-id="trust-title" dark />
      <MetricGrid :metrics="ORGANIZATION_METRICS" dark />
    </PageSection>

    <PageSection id="zespol" color="bg-white" label="team-title">
      <SectionHeader :label="ABOUT_TEAM_SECTION.label" :title="ABOUT_TEAM_SECTION.title" :description="ABOUT_TEAM_SECTION.description" title-id="team-title" />
      <div class="flex flex-wrap gap-4">
        <TeamMemberCard v-for="person in TEAM_MEMBERS" :key="person.role" v-bind="person" class="w-full min-w-0 sm:w-[calc((100%-1rem)/2)] lg:w-[calc((100%-2rem)/3)]" />
      </div>
      <div class="mt-12 border-t border-slate-200 pt-8">
        <h3 class="text-2xl font-extrabold tracking-tighter md:text-3xl">
          {{ ABOUT_TEAM_SECTION.supportingTitle }}
        </h3>
        <p class="mt-3 max-w-2xl leading-7 text-slate-500">
          {{ ABOUT_TEAM_SECTION.supportingDescription }}
        </p>
        <ul class="mt-6 flex flex-wrap gap-x-8 gap-y-3" :aria-label="ABOUT_TEAM_SECTION.supportingTitle">
          <li v-for="person in SUPPORTING_TEAM_MEMBERS" :key="`${person.name}-${person.role}`" class="flex w-full min-w-0 items-center justify-between gap-4 border-b border-slate-200 py-3 sm:w-[calc((100%-2rem)/2)] lg:w-[calc((100%-4rem)/3)]">
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
      <div class="flex flex-col gap-4 lg:flex-row">
        <UCard class="min-w-0 rounded-md bg-white ring-0 lg:flex-1" :ui="{ body: 'p-8 sm:p-8 md:p-12' }">
          <p class="text-sm font-extrabold text-zerya-700">
            {{ ABOUT_NEXT.proofLabel }}
          </p>
          <h3 class="mt-4 text-3xl font-extrabold tracking-tighter">
            {{ ABOUT_NEXT.proofTitle }}
          </h3>
          <UButton :to="ABOUT_NEXT.proofButton.to" color="primary" size="xl" class="mt-8 rounded-md px-6 font-bold">
            {{ ABOUT_NEXT.proofButton.label }} <UIcon name="i-lucide-arrow-right" class="size-4" aria-hidden="true" />
          </UButton>
        </UCard>
        <UCard class="min-w-0 rounded-md bg-space text-white ring-0 lg:flex-1" :ui="{ body: 'p-8 sm:p-8 md:p-12' }">
          <p class="text-sm font-extrabold text-zerya-400">
            {{ ABOUT_NEXT.partnerLabel }}
          </p>
          <h3 class="mt-4 text-3xl font-extrabold tracking-tighter">
            {{ ABOUT_NEXT.partnerTitle }}
          </h3>
          <p class="mt-4 leading-7 text-slate-300">
            {{ ABOUT_NEXT.partnerDescription }}
          </p>
          <UButton :to="ABOUT_NEXT.partnerButton.to" color="primary" size="xl" class="mt-8 rounded-md px-6 font-bold">
            {{ ABOUT_NEXT.partnerButton.label }} <UIcon name="i-lucide-arrow-right" class="size-4" aria-hidden="true" />
          </UButton>
        </UCard>
      </div>
    </PageSection>
  </main>
</template>
