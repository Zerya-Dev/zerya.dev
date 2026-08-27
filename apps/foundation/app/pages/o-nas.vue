<script setup lang="ts">
import {
  ABOUT_COMMUNITY,
  ABOUT_HERO,
  ABOUT_NEXT,
  ABOUT_ORIGIN,
  ABOUT_SEO,
  ABOUT_TEAM_SECTION,
} from '~~/content/pages/about'
import { SUPPORTING_TEAM_MEMBERS, TEAM_MEMBERS } from '~~/content/team'

useSeoMeta({
  title: ABOUT_SEO.title,
  description: ABOUT_SEO.description,
})
</script>

<template>
  <div>
    <PageHero :label="ABOUT_HERO.label" :title="ABOUT_HERO.title" :description="ABOUT_HERO.description" />

    <PageSection color="bg-white" label="origin-title" spacing="bottom">
      <div class="flex flex-col gap-8 lg:flex-row lg:gap-16 lg:items-center">
        <div class="min-w-0 overflow-hidden rounded-sm lg:flex-1">
          <NuxtImg :src="ABOUT_ORIGIN.image.src" :alt="ABOUT_ORIGIN.image.alt" tone="dark" class="size-full min-h-96 object-cover" />
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
          <NuxtLink :to="ABOUT_ORIGIN.link.to" class="mt-6 flex items-center gap-1 font-bold text-zerya-700">
            {{ ABOUT_ORIGIN.link.label }}<UIcon name="i-lucide-arrow-right" class="size-4" aria-hidden="true" />
          </NuxtLink>
        </div>
      </div>
    </PageSection>

    <PageSection color="bg-canvas" label="community-title">
      <div class="flex flex-col-reverse gap-8 lg:flex-row lg:gap-16">
        <div class="min-w-0 self-center py-4 lg:flex-1">
          <p class="text-sm font-extrabold tracking-widest text-zerya-700 uppercase">
            {{ ABOUT_COMMUNITY.label }}
          </p>
          <h2 id="community-title" class="mt-4 text-4xl font-extrabold tracking-tighter md:text-5xl">
            {{ ABOUT_COMMUNITY.title }}
          </h2>
          <div class="mt-6 space-y-4 leading-7 text-slate-500">
            <p v-for="paragraph in ABOUT_COMMUNITY.paragraphs" :key="paragraph">
              {{ paragraph }}
            </p>
          </div>
        </div>
        <div class="min-w-0 overflow-hidden rounded-sm lg:flex-1">
          <NuxtImg :src="ABOUT_COMMUNITY.image.src" :alt="ABOUT_COMMUNITY.image.alt" class="size-full min-h-96 object-cover" loading="lazy" />
        </div>
      </div>
    </PageSection>

    <PageSection id="zespol" color="bg-white" label="team-title">
      <SectionHeader :label="ABOUT_TEAM_SECTION.label" :title="ABOUT_TEAM_SECTION.title" :description="ABOUT_TEAM_SECTION.description" title-id="team-title" />
      <div class="border-t border-slate-200">
        <div class="flex flex-col gap-8 border-b border-slate-200 py-12 md:flex-row md:gap-6">
          <div class="md:w-1/3 md:shrink-0">
            <h3 class="text-2xl font-extrabold tracking-tight">
              {{ ABOUT_TEAM_SECTION.groups.coordinators.title }}
            </h3>
            <p class="mt-2 max-w-[32ch] text-sm leading-6 text-slate-500">
              {{ ABOUT_TEAM_SECTION.groups.coordinators.description }}
            </p>
          </div>
          <ul class="grid min-w-0 flex-1 gap-x-6 gap-y-10 sm:grid-cols-2">
            <li v-for="person in TEAM_MEMBERS" :key="person.name" class="flex items-start gap-4">
              <UAvatar v-if="person.img" :src="person.img" :alt="person.name" size="3xl" class="size-16 shrink-0 bg-mint text-zerya-700" />
              <div class="min-w-0">
                <p class="font-bold">
                  {{ person.name }}
                </p>
                <p class="text-sm text-slate-500">
                  {{ person.role }}
                </p>
                <TeamMemberSocials v-if="person.socials" :name="person.name" :socials="person.socials" size="sm" class="mt-3" />
              </div>
            </li>
          </ul>
        </div>
        <div class="flex flex-col gap-8 border-b border-slate-200 py-12 md:flex-row md:gap-6">
          <div class="md:w-1/3 md:shrink-0">
            <h3 class="text-2xl font-extrabold tracking-tight">
              {{ ABOUT_TEAM_SECTION.groups.team.title }}
            </h3>
            <p class="mt-2 max-w-[32ch] text-sm leading-6 text-slate-500">
              {{ ABOUT_TEAM_SECTION.groups.team.description }}
            </p>
          </div>
          <ul class="grid min-w-0 flex-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            <li v-for="person in SUPPORTING_TEAM_MEMBERS" :key="person.name">
              <p class="font-bold">
                {{ person.name }}
              </p>
              <p class="text-sm text-slate-500">
                {{ person.role }}
              </p>
              <TeamMemberSocials v-if="person.socials" :name="person.name" :socials="person.socials" size="sm" class="mt-3" />
            </li>
          </ul>
        </div>
      </div>
    </PageSection>

    <PageSection color="bg-canvas" label="next-title">
      <h2 id="next-title" class="sr-only">
        Kolejne kroki
      </h2>
      <div class="flex flex-col gap-4 lg:flex-row">
        <UCard class="min-w-0 rounded-md bg-white ring-0 lg:flex-1" :ui="{ body: 'p-8 sm:p-8 md:p-12' }">
          <p class="text-sm font-extrabold text-zerya-700">
            {{ ABOUT_NEXT.joinLabel }}
          </p>
          <h3 class="mt-4 text-3xl font-extrabold tracking-tighter">
            {{ ABOUT_NEXT.joinTitle }}
          </h3>
          <p class="mt-4 leading-7 text-slate-500">
            {{ ABOUT_NEXT.joinDescription }}
          </p>
          <UButton :to="ABOUT_NEXT.joinButton.to" target="_blank" rel="noopener noreferrer" color="primary" size="xl" class="mt-8 rounded-md px-6 font-bold">
            {{ ABOUT_NEXT.joinButton.label }} <UIcon name="i-lucide-arrow-up-right" class="size-4" aria-hidden="true" />
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
  </div>
</template>
