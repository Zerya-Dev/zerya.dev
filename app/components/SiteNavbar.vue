<script setup lang="ts">
// In-page only: external projects and socials live in the footer
const links = [
  { label: 'Projekty', to: '#projekty' },
  { label: 'Zespół', to: '#zespol' },
  { label: 'Kontakt', to: '#napisz' },
]
</script>

<template>
  <header class="mx-auto flex w-full max-w-[1328px] items-center justify-between gap-4 px-6 pt-6 md:gap-8 md:px-16 md:pt-8">
    <NuxtLink to="/" class="shrink-0">
      <img src="/img/logo.svg" alt="Zerya" width="133" height="64" class="h-7 w-auto md:h-8">
    </NuxtLink>

    <nav aria-label="Główna nawigacja">
      <ul class="flex gap-4 sm:gap-8">
        <li v-for="link in links" :key="link.to">
          <a :href="link.to" class="text-sm text-paper/65 transition-colors hover:text-paper">{{ link.label }}</a>
        </li>
      </ul>
    </nav>
  </header>
</template>
