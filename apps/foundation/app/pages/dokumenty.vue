<script setup lang="ts">
import { DOCUMENTS, DOCUMENTS_HERO, DOCUMENTS_SEO } from '~~/content/pages/documents'

useSeoMeta({
  title: DOCUMENTS_SEO.title,
  description: DOCUMENTS_SEO.description,
})
</script>

<template>
  <div>
    <PageHero :label="DOCUMENTS_HERO.label" :title="DOCUMENTS_HERO.title" :description="DOCUMENTS_HERO.description" />
    <PageSection color="bg-canvas" width="wide">
      <div class="flex flex-col gap-4">
        <DocumentFileCard v-for="document in DOCUMENTS" :id="document.id" :key="document.id" :title="document.title" :description="document.description" :file="document.file" :pages="document.pages" class="scroll-mt-28" />
      </div>
    </PageSection>
  </div>
</template>
