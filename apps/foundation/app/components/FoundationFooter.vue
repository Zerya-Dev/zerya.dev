<script setup lang="ts">
import { NAVIGATION_ITEMS } from '~~/content/navigation'
import { FOOTER, SOCIAL_LINKS } from '~~/content/settings'
</script>

<template>
  <UFooter class="bg-space pt-16 pb-6 text-white" :ui="{ top: 'py-0 lg:py-0', container: 'flex flex-col max-w-7xl border-t border-white/15 px-6 pt-6 pb-0 lg:flex-col lg:pt-6 lg:pb-0 max-md:items-start max-md:px-4', center: 'mt-0 flex-col gap-4 text-xs max-md:items-start text-slate-300', left: 'hidden', right: 'hidden' }">
    <template #top>
      <UContainer class="flex max-w-7xl gap-16 px-6 pb-14 max-md:flex-col max-md:gap-10 max-md:px-4">
        <div class="min-w-0 flex-1">
          <NuxtLink to="/" class="inline-flex" aria-label="Fundacja Zerya — strona główna">
            <FoundationLogo />
          </NuxtLink>
          <p class="mt-4 max-w-xs text-sm text-slate-300">
            {{ FOOTER.description }}
          </p>
        </div>

        <nav class="flex min-w-0 flex-1 flex-wrap content-start gap-x-6 gap-y-4" aria-label="Nawigacja w stopce">
          <ULink v-for="link in NAVIGATION_ITEMS" :key="link.to" :to="link.to" class="basis-[calc(50%-0.75rem)] text-sm font-semibold text-slate-300 transition-colors hover:text-zerya-400">
            {{ link.label }}
          </ULink>
        </nav>

        <div class="flex min-w-0 flex-1 flex-col items-end gap-4 max-md:items-start">
          <ULink v-for="link in SOCIAL_LINKS" :key="link.label" :to="link.href" class="text-sm font-semibold text-slate-300 transition-colors hover:text-zerya-400" target="_blank" rel="noopener noreferrer">
            {{ link.label }} <UIcon name="i-lucide-arrow-up-right" class="size-4" aria-hidden="true" />
            <span class="sr-only">(otwiera się w nowej karcie)</span>
          </ULink>
        </div>
      </UContainer>
    </template>

    <p>{{ FOOTER.organization }}</p>
    <div class="flex flex-wrap gap-4">
      <NuxtLink v-for="link in FOOTER.legalLinks" :key="link.to" class="transition-colors hover:text-zerya-400" :to="link.to">
        {{ link.label }}
      </NuxtLink>
      <p>© {{ new Date().getFullYear() }} Fundacja Zerya</p>
    </div>
  </UFooter>
</template>
