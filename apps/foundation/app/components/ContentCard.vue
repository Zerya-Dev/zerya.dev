<script setup lang="ts">
import type { ContentItem } from '~/types/content'

defineProps<{
  item: ContentItem
  to: string
}>()
</script>

<template>
  <UBlogPost
    :title="item.title"
    :to="to"
    class="group rounded-md border border-slate-200 bg-white ring-0 hover:bg-white"
    :ui="{
      header: 'aspect-4/3',
      body: 'p-6 sm:p-6 md:p-8',
      meta: 'flex-wrap mb-0 text-xs font-bold text-slate-500',
      date: 'text-xs text-slate-500',
      title: 'mt-4 text-xl leading-7 font-extrabold tracking-tight text-inherit',
      description: 'mt-3 line-clamp-3 text-sm leading-6 text-slate-500',
      authors: 'pt-6 text-sm font-extrabold text-zerya-700',
    }"
  >
    <template #header>
      <NuxtImg
        v-if="item.heroImage.src"
        :src="item.heroImage.src"
        :alt="item.heroImage.alt"
        class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <ImagePlaceholder v-else :label="`Ilustracja: ${item.title}`" tone="light" class="transition-transform duration-300 group-hover:scale-105" />
    </template>
    <template #badge>
      <span class="text-zerya-700">{{ item.category }}</span>
      <span aria-hidden="true">·</span>
    </template>
    <template #date>
      {{ item.meta }}
    </template>
    <template #description>
      <p>{{ item.description }}</p>
    </template>
    <template #authors>
      <span>
        Zobacz szczegóły <UIcon name="i-lucide-arrow-right" class="size-4 align-text-bottom" aria-hidden="true" />
      </span>
    </template>
  </UBlogPost>
</template>
