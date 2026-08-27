<script setup lang="ts">
const { data: page } = await useFoundationData('pages/about', 'foundation-page-about')
const { data: metrics } = await useFoundationData('site/metrics', 'foundation-metrics')
const { data: teamContent } = await useFoundationData('site/team', 'foundation-team-about')

if (!page.value || !metrics.value || !teamContent.value) {
  throw createError({ statusCode: 500, statusMessage: 'Brak wymaganej treści strony O nas' })
}

const content = page.value
const organizationMetrics = metrics.value.organization
const teamMembers = teamContent.value.members
const supportingTeamMembers = teamContent.value.supporting

useSeoMeta({
  title: content.seo.title,
  description: content.seo.description,
})
</script>

<template>
  <main id="main-content">
    <PageHero :label="content.hero.label" :title="content.hero.title" :description="content.hero.description" />

    <PageSection color="bg-white" label="origin-title" spacing="bottom">
      <div class="flex flex-col gap-8 lg:flex-row lg:gap-16">
        <div class="min-w-0 overflow-hidden rounded-sm lg:flex-1">
          <ImagePlaceholder :label="content.origin?.imageLabel" tone="dark" class="min-h-96" />
        </div>
        <div class="min-w-0 self-center py-4 lg:flex-1">
          <p class="text-sm font-extrabold tracking-widest text-zerya-700 uppercase">
            {{ content.origin?.label }}
          </p>
          <h2 id="origin-title" class="mt-4 text-4xl font-extrabold tracking-tighter md:text-5xl">
            {{ content.origin?.title }}
          </h2>
          <div class="mt-6 space-y-4 leading-7 text-slate-500">
            <p v-for="paragraph in content.origin?.paragraphs" :key="paragraph">
              {{ paragraph }}
            </p>
          </div>
        </div>
      </div>
    </PageSection>

    <PageSection color="bg-mint" label="mission-title">
      <SectionHeader :label="content.values?.label" :title="content.values?.title || ''" title-id="mission-title" />
      <div class="flex flex-col gap-4 md:flex-row">
        <InfoCard v-for="value in content.values?.items" :key="value.title" v-bind="value" class="min-w-0 md:flex-1" />
      </div>
    </PageSection>

    <PageSection color="bg-space text-white" label="trust-title">
      <SectionHeader :label="content.trust?.label" :title="content.trust?.title || ''" :description="content.trust?.description" title-id="trust-title" dark />
      <MetricGrid :metrics="organizationMetrics" dark />
    </PageSection>

    <PageSection id="zespol" color="bg-white" label="team-title">
      <SectionHeader label="Zespół" title="Nasz zespół" description="Za każdym obszarem stoi konkretna osoba znająca się na temacie." title-id="team-title" />
      <div class="flex flex-wrap gap-4">
        <TeamMemberCard v-for="person in teamMembers" :key="person.role" v-bind="person" class="w-full min-w-0 sm:w-[calc((100%-1rem)/2)] lg:w-[calc((100%-2rem)/3)]" />
      </div>
      <div class="mt-12 border-t border-slate-200 pt-8">
        <h3 class="text-2xl font-extrabold tracking-tighter md:text-3xl">
          Pozostali członkowie zespołu
        </h3>
        <p class="mt-3 max-w-2xl leading-7 text-slate-500">
          W realizację projektów angażują się także osoby wspierające konkretne obszary wydarzeń.
        </p>
        <ul class="mt-6 flex flex-wrap gap-x-8 gap-y-3" aria-label="Pozostali członkowie zespołu">
          <li v-for="person in supportingTeamMembers" :key="`${person.name}-${person.role}`" class="flex w-full min-w-0 items-center justify-between gap-4 border-b border-slate-200 py-3 sm:w-[calc((100%-2rem)/2)] lg:w-[calc((100%-4rem)/3)]">
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
            {{ content.next?.proofLabel }}
          </p>
          <h3 class="mt-4 text-3xl font-extrabold tracking-tighter">
            {{ content.next?.proofTitle }}
          </h3>
          <UButton :to="content.next?.proofButton.to" color="primary" size="xl" class="mt-8 rounded-md px-6 font-bold text-space">
            {{ content.next?.proofButton.label }} <UIcon name="i-lucide-arrow-right" class="size-4" aria-hidden="true" />
          </UButton>
        </UCard>
        <UCard class="min-w-0 rounded-md bg-space text-white ring-0 lg:flex-1" :ui="{ body: 'p-8 sm:p-8 md:p-12' }">
          <p class="text-sm font-extrabold text-zerya-400">
            {{ content.next?.partnerLabel }}
          </p>
          <h3 class="mt-4 text-3xl font-extrabold tracking-tighter">
            {{ content.next?.partnerTitle }}
          </h3>
          <p class="mt-4 leading-7 text-slate-300">
            {{ content.next?.partnerDescription }}
          </p>
          <UButton :to="content.next?.partnerButton.to" color="primary" size="xl" class="mt-8 rounded-md px-6 font-bold text-space">
            {{ content.next?.partnerButton.label }} <UIcon name="i-lucide-arrow-right" class="size-4" aria-hidden="true" />
          </UButton>
        </UCard>
      </div>
    </PageSection>
  </main>
</template>
