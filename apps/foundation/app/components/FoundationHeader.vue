<script setup lang="ts">
import { navigation } from '~/data/site'

const isMenuOpen = ref(false)
const route = useRoute()

function closeMenu() {
  isMenuOpen.value = false
}

function isActive(to: string) {
  return route.path === to || route.path.startsWith(`${to}/`)
}

watch(() => route.fullPath, closeMenu)
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-space/10 bg-white/93 backdrop-blur-2xl" @keydown.esc="closeMenu">
    <div class="mx-auto flex min-h-20 w-full max-w-7xl items-center gap-6 px-6 max-md:min-h-18 max-md:px-4">
      <NuxtLink to="/" class="inline-flex shrink-0" aria-label="Fundacja Zerya — strona główna" @click="closeMenu">
        <ZeryaLogo dark />
      </NuxtLink>

      <nav class="ml-auto flex items-center justify-center gap-4 max-lg:hidden lg:gap-6" aria-label="Główna nawigacja">
        <NuxtLink
          v-for="item in navigation"
          :key="item.to"
          :to="item.to"
          class="relative py-2 text-sm font-semibold after:absolute after:right-0 after:bottom-0.5 after:left-0 after:h-0.5 after:bg-zerya-600 after:transition-transform"
          :class="isActive(item.to) ? 'text-zerya-700 after:scale-x-100' : 'text-slate-700 after:origin-right after:scale-x-0 hover:after:origin-left hover:after:scale-x-100'"
          :aria-current="isActive(item.to) ? 'page' : undefined"
        >
          {{ item.label }}
        </NuxtLink>
      </nav>

      <UButton
        href="https://hack4krak.pl"
        target="_blank"
        rel="noopener noreferrer"
        color="neutral"
        size="lg"
        class="ml-4 min-h-12 rounded-md bg-space px-6 font-bold text-white hover:bg-space-2 max-lg:hidden"
      >
        Hack4Krak <UIcon name="i-lucide-arrow-up-right" class="size-4" aria-hidden="true" />
        <span class="sr-only">(otwiera się w nowej karcie)</span>
      </UButton>

      <button
        class="ml-auto hidden size-12 rounded-md border border-slate-300 bg-white max-lg:block"
        type="button"
        :aria-expanded="isMenuOpen"
        aria-controls="mobile-navigation"
        :aria-label="isMenuOpen ? 'Zamknij menu' : 'Otwórz menu'"
        @click="isMenuOpen = !isMenuOpen"
      >
        <span class="mx-auto my-1 block h-0.5 w-4 bg-space transition-transform" :class="{ 'translate-y-1 rotate-45': isMenuOpen }" />
        <span class="mx-auto my-1 block h-0.5 w-4 bg-space transition-transform" :class="{ '-translate-y-1 -rotate-45': isMenuOpen }" />
      </button>
    </div>

    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="-translate-y-2 opacity-0"
      leave-active-class="transition duration-150 ease-in"
      leave-to-class="-translate-y-2 opacity-0"
    >
      <nav v-if="isMenuOpen" id="mobile-navigation" class="absolute top-full right-0 left-0 border-b border-slate-300 bg-white lg:hidden" aria-label="Mobilna nawigacja">
        <div class="mx-auto grid w-full max-w-7xl px-4 pt-4 pb-8">
          <NuxtLink v-for="item in navigation" :key="item.to" :to="item.to" class="border-b border-slate-200 py-4 font-bold" :class="isActive(item.to) ? 'text-zerya-700' : ''" :aria-current="isActive(item.to) ? 'page' : undefined" @click="closeMenu">
            {{ item.label }}
          </NuxtLink>
          <a class="mt-4 py-4 font-bold text-zerya-700" href="https://hack4krak.pl" target="_blank" rel="noopener noreferrer" @click="closeMenu">
            Hack4Krak <UIcon name="i-lucide-arrow-up-right" class="size-4" aria-hidden="true" />
            <span class="sr-only">(otwiera się w nowej karcie)</span>
          </a>
        </div>
      </nav>
    </Transition>
  </header>
</template>
