<script setup lang="ts">
import { navigation, socialLinks } from '~/data/site'
</script>

<template>
  <footer class="bg-space pt-16 pb-6 text-white">
    <div class="mx-auto grid w-full max-w-7xl grid-cols-3 gap-16 px-6 pb-14 max-md:grid-cols-1 max-md:gap-10 max-md:px-4">
      <div>
        <NuxtLink to="/" class="inline-flex" aria-label="Fundacja Zerya — strona główna">
          <ZeryaLogo />
        </NuxtLink>
        <p class="mt-4 max-w-xs text-sm text-slate-400">
          Edukacja przez praktykę, rywalizację i współpracę.
        </p>
      </div>

      <nav class="grid grid-cols-2 content-start gap-x-6 gap-y-4" aria-label="Nawigacja w stopce">
        <NuxtLink v-for="link in navigation" :key="link.to" :to="link.to" class="text-sm font-semibold text-slate-300 transition-colors hover:text-zerya-400">
          {{ link.label }}
        </NuxtLink>
      </nav>

      <div class="grid content-start justify-items-end gap-4 max-md:justify-items-start">
        <a v-for="link in socialLinks" :key="link.label" :href="link.href" class="text-sm font-semibold text-slate-300 transition-colors hover:text-zerya-400" target="_blank" rel="noopener noreferrer">
          {{ link.label }} <UIcon name="i-lucide-arrow-up-right" class="size-4" aria-hidden="true" />
          <span class="sr-only">(otwiera się w nowej karcie)</span>
        </a>
      </div>
    </div>

    <div class="mx-auto w-full max-w-7xl items-center flex flex-col gap-4 border-t border-white/15 px-6 pt-6 text-xs text-slate-500 max-md:grid-cols-1 max-md:items-start max-md:gap-4 max-md:px-4">
      <p>Fundacja Zerya · Kraków, Polska · KRS 0001257372 · NIP 9452333696 · REGON 54535439700000</p>
      <div class="flex gap-4">
        <NuxtLink class="transition-colors hover:text-zerya-400" to="/statut">
          Statut
        </NuxtLink>
        <NuxtLink class="transition-colors hover:text-zerya-400" to="/polityka-prywatnosci">
          Polityka prywatności
        </NuxtLink>
        <p>© {{ new Date().getFullYear() }} Fundacja Zerya</p>
      </div>
    </div>
  </footer>
</template>
