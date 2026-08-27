<script setup lang="ts">
import type { NewsArticle } from '~/data/site'

defineProps<{
  article: NewsArticle
}>()
</script>

<template>
  <article class="group relative flex h-full flex-col overflow-hidden rounded-md border border-slate-200 bg-white">
    <div class="aspect-4/3 overflow-hidden">
      <ImagePlaceholder :label="`Ilustracja wpisu: ${article.title}`" tone="light" class="transition-transform duration-300 group-hover:scale-105" />
    </div>
    <div class="flex flex-1 flex-col p-6 md:p-8">
      <div class="flex flex-wrap gap-2 text-xs font-bold text-slate-500">
        <span class="text-zerya-700">{{ article.category }}</span>
        <span aria-hidden="true">·</span>
        <time :datetime="article.date">{{ article.displayDate }}</time>
      </div>
      <h2 class="mt-4 text-xl leading-7 font-extrabold tracking-tight">
        <NuxtLink :to="`/aktualnosci/${article.slug}`" class="after:absolute after:inset-0">
          {{ article.title }}
        </NuxtLink>
      </h2>
      <p class="mt-3 line-clamp-3 text-sm leading-6 text-slate-500">
        {{ article.lead }}
      </p>
      <span class="mt-auto pt-6 text-sm font-extrabold text-zerya-700">
        Czytaj <UIcon name="i-lucide-arrow-right" class="size-4 align-text-bottom" aria-hidden="true" />
      </span>
    </div>
  </article>
</template>
