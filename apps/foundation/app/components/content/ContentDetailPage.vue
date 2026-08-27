<script setup lang="ts">
import type { FoundationContentRoute } from '~/composables/useFoundationContent'

const props = defineProps<{ route: FoundationContentRoute, slug: string }>()
const source = getFoundationContentRoute(props.route)
const { data: page } = await useFoundationData(source.page, `foundation-page-${props.route}-detail`)
const { data: item } = await useFoundationContent(source.collection, props.slug)

if (!item.value || !page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Nie znaleziono treści' })
}

const content = page.value
const detail = item.value
const cta = content.detailCta || content.cta

useSeoMeta({
  title: detail.title,
  description: detail.description,
})
</script>

<template>
  <main id="main-content">
    <article>
      <PageHero :label="content.hero.label" :title="detail.title" :description="detail.description" dark>
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
        <div class="overflow-hidden rounded-sm">
          <NuxtImg
            v-if="detail.heroImage.src"
            :src="detail.heroImage.src"
            :alt="detail.heroImage.alt"
            class="h-full w-full object-cover"
          />
        </div>
      </PageSection>

      <PageSection color="bg-white">
        <RichContent :value="detail" class="rich-content text-lg text-slate-600" />
      </PageSection>
    </article>

    <CtaSection v-if="cta" :title="cta.title" :description="cta.description" :button-label="cta.button.label" :to="cta.button.to" />
  </main>
</template>
