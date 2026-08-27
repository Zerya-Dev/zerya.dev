<script setup lang="ts">
import { projects } from '~/data/site'

useSeoMeta({
  title: 'Projekty',
  description: 'Realizacje Fundacji Zerya: zakres odpowiedzialności, wyniki, partnerzy i materiały dowodowe.',
})

const featuredProject = projects.find(project => project.featured)!
const otherProjects = projects.filter(project => !project.featured)
</script>

<template>
  <main id="main-content">
    <PageHero label="Projekty" title="Nasze inicjatywy" description="Każdy projekt odpowiada na trzy pytania: co zrobiliśmy, dla kogo i z jakim efektem." />

    <PageSection color="bg-white" label="featured-title" spacing="bottom">
      <div class="grid overflow-hidden rounded-md bg-space text-white lg:grid-cols-2">
        <ImagePlaceholder :label="`Fotografia projektu ${featuredProject.name}`" tone="green" class="min-h-80 lg:min-h-full" />
        <div class="p-8 md:p-12 lg:p-16">
          <p class="text-sm font-extrabold tracking-widest text-zerya-400 uppercase">
            Flagowy projekt
          </p>
          <h2 id="featured-title" class="mt-4 text-4xl font-extrabold tracking-tighter md:text-6xl">
            {{ featuredProject.name }}
          </h2>
          <p class="mt-6 max-w-xl text-lg leading-8 text-slate-300">
            {{ featuredProject.description }}
          </p>
          <dl class="mt-8 grid gap-4 sm:grid-cols-3">
            <div v-for="metric in featuredProject.metrics.slice(0, 3)" :key="metric.label" class="border-l-2 border-zerya-500 pl-4">
              <dt class="text-xl font-extrabold">
                {{ metric.value }}
              </dt>
              <dd class="mt-1 text-xs leading-5 text-slate-400">
                {{ metric.label }}
              </dd>
            </div>
          </dl>
          <UButton :to="`/projekty/${featuredProject.slug}`" color="primary" size="xl" class="mt-10 rounded-md px-6 font-bold text-space">
            Case study <UIcon name="i-lucide-arrow-right" class="size-4" aria-hidden="true" />
          </UButton>
        </div>
      </div>
    </PageSection>

    <PageSection color="bg-canvas" label="all-projects-title">
      <SectionHeader label="Pozostałe działania" title="Projekty i formaty edukacyjne" title-id="all-projects-title" />
      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <ProjectCard v-for="project in otherProjects" :key="project.slug" :project="project" />
      </div>
    </PageSection>

    <CtaSection title="Porozmawiajmy o wspólnej realizacji" description="Możemy połączyć cel edukacyjny, doświadczenie organizacyjne i zasoby partnera w jeden konkretny projekt." button-label="Kontakt" to="/kontakt" />
  </main>
</template>
