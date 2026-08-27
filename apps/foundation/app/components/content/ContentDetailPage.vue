<script setup lang="ts">
import type { ContentRoute } from '~/composables/useContentRoutes'

const props = defineProps<{ route: ContentRoute, slug: string }>()
const page = CONTENT_ROUTES[props.route]
const { data: item } = await useEntry(page.collection, props.slug)

if (!item.value) {
  throw createError({ statusCode: 404, statusMessage: 'Nie znaleziono treści' })
}

const detail = item.value

useSeoMeta({
  title: detail.title,
  description: detail.description,
})
</script>

<template>
  <div>
    <article>
      <PageHero :label="page.hero.label" :title="detail.title" :description="detail.description" dark>
        <template #label>
          <div class="flex flex-wrap gap-2 text-sm font-bold text-slate-400">
            <span class="text-zerya-400">{{ detail.category }}</span>
            <span aria-hidden="true">·</span>
            <time v-if="detail.date" :datetime="detail.date">{{ detail.meta }}</time>
            <span v-else>{{ detail.meta }}</span>
          </div>
        </template>
      </PageHero>

      <PageSection color="bg-space" aria-label="Fotografia treści" spacing="bottom">
        <div class="mx-auto max-w-5xl overflow-hidden rounded-sm">
          <NuxtImg
            v-if="detail.heroImage.src"
            :src="detail.heroImage.src"
            :alt="detail.heroImage.alt"
            sizes="100vw lg:1024px"
            class="aspect-video max-h-[36rem] w-full object-cover"
          />
        </div>
      </PageSection>

      <PageSection color="bg-white">
        <RichContent :value="detail" class="rich-content text-lg text-slate-600" />
      </PageSection>
    </article>

    <CtaSection :title="page.detailCta.title" :description="page.detailCta.description" :button-label="page.detailCta.button.label" :to="page.detailCta.button.to" />
  </div>
</template>
