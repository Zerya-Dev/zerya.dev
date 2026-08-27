<script setup lang="ts">
import { STATUTE_DOCUMENT, STATUTE_HERO, STATUTE_SEO } from '~~/content/pages/statute'

useSeoMeta({
  title: STATUTE_SEO.title,
  description: STATUTE_SEO.description,
})
</script>

<template>
  <main id="main-content">
    <PageHero :label="STATUTE_HERO.label" :title="STATUTE_HERO.title" :description="STATUTE_HERO.description" />
    <PageSection color="bg-canvas" width="wide">
      <UCard class="rounded-md bg-white ring-slate-200" :ui="{ body: 'p-8 sm:p-8 md:p-12' }">
        <DocumentNotice :icon="STATUTE_DOCUMENT.icon" :title="STATUTE_DOCUMENT.noticeTitle" :description="STATUTE_DOCUMENT.noticeDescription" />
        <div class="mt-10 flex flex-col gap-8 sm:flex-row sm:*:min-w-0 sm:*:flex-1">
          <div>
            <h2 class="text-2xl font-extrabold">
              {{ STATUTE_DOCUMENT.versionTitle }}
            </h2>
            <p class="mt-3 text-slate-500">
              {{ STATUTE_DOCUMENT.versionDescription }}
            </p>
          </div>
          <div>
            <h2 class="text-2xl font-extrabold">
              {{ STATUTE_DOCUMENT.fileTitle }}
            </h2>
            <p class="mt-3 text-slate-500">
              {{ STATUTE_DOCUMENT.fileDescription }}
            </p>
          </div>
        </div>
      </UCard>
    </PageSection>
  </main>
</template>
