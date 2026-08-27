<script setup lang="ts">
import type { FoundationContentRoute } from '~/composables/useFoundationContent'

const props = defineProps<{ route: FoundationContentRoute }>()
const source = getFoundationContentRoute(props.route)
const { data: page } = await useFoundationData(source.page, `foundation-page-${props.route}`)
const { data: collection } = await useFoundationContentCollection(source.collection)

if (!page.value || !collection.value?.length) {
  throw createError({ statusCode: 500, statusMessage: 'Brak wymaganej treści' })
}

const content = page.value
const items = collection.value.toSorted((first, second) => second.order.localeCompare(first.order))
const featuredItem = items.find(item => item.featured) || items[0]

if (!featuredItem) {
  throw createError({ statusCode: 500, statusMessage: 'Brak wyróżnionej treści' })
}

useSeoMeta({
  title: content.seo.title,
  description: content.seo.description,
})
</script>

<template>
  <main id="main-content">
    <PageHero :label="content.hero.label" :title="content.hero.title" :description="content.hero.description" />

    <PageSection color="bg-white" label="featured-content-title" spacing="bottom">
      <UBlogPost
        class="overflow-hidden rounded-md bg-canvas ring-slate-200"
        :ui="{ root: 'flex flex-col lg:flex-row', header: 'flex h-auto min-h-80 w-full min-w-0 flex-none aspect-auto lg:w-1/2', body: 'block w-full min-w-0 flex-none p-8 sm:p-8 md:p-12 lg:w-1/2 lg:p-16' }"
      >
        <template #header>
          <NuxtImg
            v-if="featuredItem.heroImage.src"
            :src="featuredItem.heroImage.src"
            :alt="featuredItem.heroImage.alt"
            class="h-full w-full object-cover"
          />
        </template>
        <template #body>
          <div class="flex gap-2 text-xs font-bold text-slate-500">
            <span class="text-zerya-700">{{ featuredItem.category }}</span>
            <span aria-hidden="true">·</span>
            <time v-if="featuredItem.date" :datetime="featuredItem.date">{{ featuredItem.meta }}</time>
            <span v-else>{{ featuredItem.meta }}</span>
          </div>
          <h2 id="featured-content-title" class="mt-4 text-4xl font-extrabold tracking-tighter md:text-5xl">
            {{ featuredItem.title }}
          </h2>
          <p class="mt-6 text-lg leading-8 text-slate-500">
            {{ featuredItem.description }}
          </p>
          <UButton :to="`/${props.route}/${featuredItem.slug}`" color="primary" size="xl" class="mt-8 rounded-md px-6 font-bold text-space">
            Zobacz szczegóły <UIcon name="i-lucide-arrow-right" class="size-4" aria-hidden="true" />
          </UButton>
        </template>
      </UBlogPost>
    </PageSection>

    <PageSection color="bg-canvas" label="content-archive-title">
      <SectionHeader :label="content.archive?.label" :title="content.archive?.title || ''" :description="content.archive?.description" title-id="content-archive-title" />
      <div class="flex flex-wrap gap-4">
        <ContentCard v-for="item in items" :key="item.slug" :item="item" :to="`/${props.route}/${item.slug}`" class="w-full min-w-0 md:w-[calc((100%-1rem)/2)] lg:w-[calc((100%-2rem)/3)]" />
      </div>
    </PageSection>

    <CtaSection v-if="content.cta" :title="content.cta.title" :description="content.cta.description" :button-label="content.cta.button.label" :to="content.cta.button.to" />
  </main>
</template>
