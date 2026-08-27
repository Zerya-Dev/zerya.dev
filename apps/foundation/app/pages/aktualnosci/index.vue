<script setup lang="ts">
import { newsArticles } from '~/data/site'

useSeoMeta({
  title: 'Aktualności',
  description: 'Aktualności o projektach, partnerstwach i pracy Fundacji Zerya.',
})

const featuredArticle = newsArticles.find(article => article.featured)!
const remainingArticles = newsArticles.filter(article => !article.featured)
</script>

<template>
  <main id="main-content">
    <PageHero label="Aktualności" title="Co nowego?" description="Najważniejsze informacje o wydarzeniach, projektach, partnerstwach i pracy zespołu." />

    <PageSection color="bg-white" label="featured-news-title" spacing="bottom">
      <article class="grid overflow-hidden rounded-md border border-slate-200 bg-canvas lg:grid-cols-2">
        <ImagePlaceholder :label="`Ilustracja wpisu: ${featuredArticle.title}`" tone="dark" class="min-h-80" />
        <div class="p-8 md:p-12 lg:p-16">
          <div class="flex gap-2 text-xs font-bold text-slate-500">
            <span class="text-zerya-700">{{ featuredArticle.category }}</span>
            <span aria-hidden="true">·</span>
            <time :datetime="featuredArticle.date">{{ featuredArticle.displayDate }}</time>
          </div>
          <h2 id="featured-news-title" class="mt-4 text-4xl font-extrabold tracking-tighter md:text-5xl">
            {{ featuredArticle.title }}
          </h2>
          <p class="mt-6 text-lg leading-8 text-slate-500">
            {{ featuredArticle.lead }}
          </p>
          <UButton :to="`/aktualnosci/${featuredArticle.slug}`" color="primary" size="xl" class="mt-8 rounded-md px-6 font-bold text-space">
            Czytaj <UIcon name="i-lucide-arrow-right" class="size-4" aria-hidden="true" />
          </UButton>
        </div>
      </article>
    </PageSection>

    <PageSection color="bg-canvas" label="newer-title">
      <SectionHeader label="Archiwum" title="Nowsze wpisy" title-id="newer-title" />
      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <NewsCard v-for="article in remainingArticles" :key="article.slug" :article="article" />
      </div>
    </PageSection>
  </main>
</template>
