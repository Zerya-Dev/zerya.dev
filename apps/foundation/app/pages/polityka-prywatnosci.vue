<script setup lang="ts">
const { data: document } = await useFoundationContent('pages', 'privacy-policy')

if (!document.value) {
  throw createError({ statusCode: 500, statusMessage: 'Brak wymaganej treści polityki prywatności' })
}

const privacyDocument = document.value

useSeoMeta({
  title: privacyDocument.title,
  description: privacyDocument.description,
})
</script>

<template>
  <main id="main-content">
    <PageHero :label="privacyDocument.label" :title="privacyDocument.title" :description="privacyDocument.description" />
    <PageSection color="bg-canvas" width="narrow">
      <UCard class="rounded-md bg-white ring-slate-200" :ui="{ body: 'p-8 sm:p-8 md:p-12' }">
        <DocumentNotice :icon="privacyDocument.notice.icon" :title="privacyDocument.notice.title" :description="privacyDocument.notice.description" />
        <RichContent :value="privacyDocument" class="rich-content mt-10" />
        <UButton :to="privacyDocument.cta.to" color="primary" size="xl" class="mt-10 rounded-md px-6 font-bold text-space">
          {{ privacyDocument.cta.label }}
        </UButton>
      </UCard>
    </PageSection>
  </main>
</template>
