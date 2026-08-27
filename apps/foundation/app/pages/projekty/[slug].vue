<script setup lang="ts">
import { Markdown } from '@comark/vue'
import reportMarkdown from '~/content/reports/hack4krak.md?raw'
import { galleryItems, projects } from '~/data/site'

const route = useRoute()
const project = projects.find(item => item.slug === route.params.slug)

if (!project) {
  throw createError({ statusCode: 404, statusMessage: 'Nie znaleziono projektu' })
}

useSeoMeta({
  title: `${project.name} — case study`,
  description: project.summary,
})

const projectGallery = galleryItems.filter(item => item.project === project.name).slice(0, 3)
const reportExpanded = ref(false)
</script>

<template>
  <main id="main-content">
    <PageHero label="Case study projektu" :title="project.name" :description="project.summary" dark>
      <template v-if="project.externalUrl" #actions>
        <UButton :href="project.externalUrl" target="_blank" rel="noopener noreferrer" color="primary" size="xl" class="rounded-md px-6 font-bold text-space">
          Strona projektu <UIcon name="i-lucide-arrow-up-right" class="size-4" aria-hidden="true" />
          <span class="sr-only">(otwiera się w nowej karcie)</span>
        </UButton>
      </template>
    </PageHero>

    <PageSection color="bg-space" aria-label="Fotografia projektu" spacing="bottom">
      <div class="overflow-hidden rounded-sm">
        <ImagePlaceholder :label="`Główna fotografia projektu ${project.name}`" tone="green" class="min-h-96 md:min-h-144" />
      </div>
    </PageSection>

    <PageSection color="bg-white" label="numbers-title">
      <SectionHeader label="Skala" title="Projekt w liczbach" title-id="numbers-title" />
      <MetricGrid :metrics="project.metrics" :cols="4" />
    </PageSection>

    <PageSection color="bg-canvas" label="challenge-title">
      <div class="grid gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <p class="text-sm font-extrabold tracking-widest text-zerya-700 uppercase">
            Wyzwanie
          </p>
          <h2 id="challenge-title" class="mt-4 text-4xl font-extrabold tracking-tighter md:text-5xl">
            Adresowny problem
          </h2>
          <div class="mt-6 space-y-4 leading-7 text-slate-500">
            <p v-for="paragraph in project.challenge" :key="paragraph">
              {{ paragraph }}
            </p>
          </div>
        </div>
        <div>
          <p class="text-sm font-extrabold tracking-widest text-zerya-700 uppercase">
            Co zrobiliśmy
          </p>
          <h2 class="mt-4 text-4xl font-extrabold tracking-tighter md:text-5xl">
            Zakres realizacji
          </h2>
          <ul class="mt-6 grid gap-3">
            <li v-for="item in project.scope" :key="item" class="flex items-start gap-3 rounded-md bg-white p-4 font-bold">
              <UIcon name="i-lucide-check" class="mt-1 size-5 shrink-0 text-zerya-600" aria-hidden="true" />
              {{ item }}
            </li>
          </ul>
        </div>
      </div>
    </PageSection>

    <PageSection color="bg-white" label="evidence-title">
      <SectionHeader label="Galeria" title="Dowody wizualne" description="Fotografie dokumentujące realizację projektu." title-id="evidence-title" />
      <div class="grid gap-4 md:grid-cols-3">
        <div v-for="item in projectGallery" :key="item.id" class="overflow-hidden rounded-sm">
          <ImagePlaceholder :label="item.label" :tone="item.tone" class="min-h-72" />
        </div>
        <div v-if="!projectGallery.length" class="overflow-hidden rounded-sm md:col-span-2">
          <ImagePlaceholder :label="`Galeria projektu ${project.name}`" tone="light" class="min-h-72" />
        </div>
      </div>
    </PageSection>

    <PageSection color="bg-canvas" label="report-title">
      <SectionHeader label="Raport" title="Raport z realizacji" description="Przebieg projektu, jego założenia i najważniejsze rezultaty." title-id="report-title" />
      <div class="rounded-md border border-slate-200 bg-white p-6 md:p-10">
        <Markdown
          id="project-report-content"
          class="report-content overflow-hidden"
          :class="{ 'line-clamp-5': !reportExpanded }"
          :components="{}"
        >
          {{ reportMarkdown }}
        </Markdown>
        <button
          type="button"
          class="mt-6 inline-flex items-center gap-2 font-extrabold text-zerya-700"
          :aria-expanded="reportExpanded"
          aria-controls="project-report-content"
          @click="reportExpanded = !reportExpanded"
        >
          {{ reportExpanded ? 'Zwiń raport' : 'Czytaj cały raport' }}
          <UIcon :name="reportExpanded ? 'i-lucide-chevron-up' : 'i-lucide-chevron-down'" class="size-4" aria-hidden="true" />
        </button>
      </div>
    </PageSection>

    <CtaSection title="Zobacz pozostałe realizacje" description="Każdy projekt pokazujemy przez zakres odpowiedzialności, wyniki i materiały dowodowe." button-label="Wszystkie projekty" to="/projekty" />
  </main>
</template>
