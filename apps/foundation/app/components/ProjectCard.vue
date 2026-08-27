<script setup lang="ts">
import type { Project } from '~/data/site'

defineProps<{
  project: Project
}>()
</script>

<template>
  <UCard class="group h-full overflow-hidden rounded-md" :ui="{ body: 'flex h-full flex-col p-0 sm:p-0' }">
    <div class="aspect-4/3 overflow-hidden">
      <ImagePlaceholder :label="`Fotografia projektu ${project.name}`" :tone="project.slug.length % 2 ? 'mint' : 'light'" class="transition-transform duration-300 group-hover:scale-105" />
    </div>
    <div class="flex flex-1 flex-col p-6 md:p-8 lg:p-10">
      <div class="flex flex-wrap items-center gap-2 text-xs font-bold text-slate-500">
        <span class="text-zerya-700">{{ project.category }}</span>
        <span aria-hidden="true">·</span>
        <span>{{ project.year }}</span>
      </div>
      <h2 class="mt-4 text-2xl font-extrabold tracking-tighter">
        {{ project.name }}
      </h2>
      <p class="mt-3 leading-7 text-slate-500">
        {{ project.description }}
      </p>
      <strong class="mt-6 block text-sm">{{ project.result }}</strong>
      <NuxtLink :to="`/projekty/${project.slug}`" class="mt-auto pt-8 text-sm font-extrabold text-zerya-700">
        Zobacz case study <UIcon name="i-lucide-arrow-right" class="size-4 align-text-bottom" aria-hidden="true" />
      </NuxtLink>
    </div>
  </UCard>
</template>
