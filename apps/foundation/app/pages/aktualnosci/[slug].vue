<script setup lang="ts">
import { newsArticles } from '~/data/site'

const route = useRoute()
const article = newsArticles.find(item => item.slug === route.params.slug)

if (!article) {
  throw createError({ statusCode: 404, statusMessage: 'Nie znaleziono wpisu' })
}

useSeoMeta({
  title: article.title,
  description: article.lead,
})
</script>

<template>
  <main id="main-content">
    <article>
      <PageHero label="Aktualności" :title="article.title" :description="article.lead" dark>
        <template #label>
          <div class="flex flex-wrap gap-2 text-sm font-bold text-slate-400">
            <span class="text-zerya-400">{{ article.category }}</span>
            <span aria-hidden="true">·</span>
            <time :datetime="article.date">{{ article.displayDate }}</time>
          </div>
        </template>
      </PageHero>

      <PageSection color="bg-space" aria-label="Fotografia wpisu" spacing="bottom">
        <div class="overflow-hidden rounded-sm">
          <ImagePlaceholder :label="`Główna fotografia wpisu: ${article.title}`" tone="green" class="min-h-96 md:min-h-144" />
        </div>
      </PageSection>

      <PageSection color="bg-white">
        <section v-for="section in article.sections" :key="section.title" class="mb-12 last:mb-0">
          <h2 class="text-3xl font-extrabold md:text-4xl">
            {{ section.title }}
          </h2>
          <div class="mt-6 space-y-4 text-lg text-slate-600">
            <p v-for="paragraph in section.paragraphs" :key="paragraph">
              {{ paragraph }}
            </p>
          </div>
        </section>
      </PageSection>
    </article>

    <CtaSection title="Zobacz projekty stojące za aktualnościami" description="Najważniejsze informacje uzupełniamy o zakres realizacji, liczby i materiały dowodowe." button-label="Przejdź do projektów" to="/projekty" :dark="false" />
  </main>
</template>
