<script setup lang="ts">
const { data: page } = await useFoundationData('pages/statute', 'foundation-page-statute')

if (!page.value) {
  throw createError({ statusCode: 500, statusMessage: 'Brak wymaganej treści strony Statut' })
}

const content = page.value
const document = content.document!

useSeoMeta({
  title: content.seo.title,
  description: content.seo.description,
})
</script>

<template>
  <main id="main-content">
    <PageHero :label="content.hero.label" :title="content.hero.title" :description="content.hero.description" />
    <PageSection color="bg-canvas" width="wide">
      <UCard class="rounded-md bg-white ring-slate-200" :ui="{ body: 'p-8 sm:p-8 md:p-12' }">
        <DocumentNotice :icon="document.icon" :title="document.noticeTitle" :description="document.noticeDescription" />
        <div class="mt-10 flex flex-col gap-8 sm:flex-row sm:*:min-w-0 sm:*:flex-1">
          <div>
            <h2 class="text-2xl font-extrabold">
              {{ document.versionTitle }}
            </h2>
            <p class="mt-3 text-slate-500">
              {{ document.versionDescription }}
            </p>
          </div>
          <div>
            <h2 class="text-2xl font-extrabold">
              {{ document.fileTitle }}
            </h2>
            <p class="mt-3 text-slate-500">
              {{ document.fileDescription }}
            </p>
          </div>
        </div>
      </UCard>
    </PageSection>
  </main>
</template>
