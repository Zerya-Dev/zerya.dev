<script setup lang="ts">
import { CONTACT_FORM, CONTACT_HERO, CONTACT_PATHS, CONTACT_SEO } from '~~/content/pages/contact'

useSeoMeta({
  title: CONTACT_SEO.title,
  description: CONTACT_SEO.description,
})
</script>

<template>
  <main id="main-content">
    <PageHero :label="CONTACT_HERO.label" :title="CONTACT_HERO.title" :description="CONTACT_HERO.description" />

    <PageSection color="bg-canvas" label="form-title">
      <div class="flex flex-col gap-12 lg:flex-row lg:gap-20">
        <div class="min-w-0 lg:flex-1">
          <p class="text-sm font-extrabold tracking-widest text-zerya-700 uppercase">
            {{ CONTACT_FORM.label }}
          </p>
          <h2 id="form-title" class="mt-4 text-4xl font-extrabold tracking-tighter md:text-5xl">
            {{ CONTACT_FORM.title }}
          </h2>
          <p class="mt-6 max-w-xl leading-7 text-slate-500">
            {{ CONTACT_FORM.description }}
          </p>
        </div>
        <UCard class="min-w-0 rounded-md bg-white ring-0 lg:flex-1" :ui="{ body: 'p-6 sm:p-6 md:p-10' }">
          <ContactForm />
        </UCard>
      </div>
    </PageSection>

    <PageSection color="bg-white" label="contact-paths-title" spacing="default">
      <h2 id="contact-paths-title" class="sr-only">
        Rodzaje kontaktu
      </h2>
      <div class="flex flex-col gap-4 md:flex-row">
        <UCard v-for="path in CONTACT_PATHS" :key="path.title" class="min-w-0 rounded-md ring-slate-200 md:flex-1" :ui="{ body: 'flex h-full flex-col justify-between p-8 sm:p-8' }">
          <UIcon :name="path.icon" class="size-8 text-zerya-600" aria-hidden="true" />
          <h3 class="mt-6 text-2xl font-extrabold tracking-tight">
            {{ path.title }}
          </h3>
          <p class="mt-3 text-sm leading-6 text-slate-500">
            {{ path.description }}
          </p>
          <p class="mt-6 text-xs font-bold text-slate-500">
            {{ path.person }}
          </p>
          <ULink :to="`mailto:${path.email}`" class="mt-2 inline-block font-extrabold break-all text-zerya-700">
            {{ path.email }}
          </ULink>
        </UCard>
      </div>
    </PageSection>
  </main>
</template>
