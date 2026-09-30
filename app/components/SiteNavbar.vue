<script setup lang="ts">
import { onKeyStroke, useClipboard, useMediaQuery } from '@vueuse/core'

const EMAIL = 'kontakt@zerya.dev'

const links = [
  { label: 'MOTOQ', href: 'https://motoq.zerya.dev' },
  { label: 'Hack4Krak', href: 'https://hack4krak.pl/' },
  { label: 'Zerya Foundation', href: 'https://foundation.zerya.dev/' },
]

const socials = [
  { label: 'GitHub', href: 'https://github.com/zerya-Dev', path: 'M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.25 3.35.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.16 1.18a10.9 10.9 0 0 1 5.76 0c2.19-1.49 3.15-1.18 3.15-1.18.63 1.59.23 2.76.11 3.05.74.81 1.18 1.83 1.18 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/111743895', path: 'M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z' },
]

const { copy, copied } = useClipboard({ copiedDuring: 2000 })

function copyEmail() {
  copy(EMAIL)
}

// Mobile menu: full-screen sheet, locks page scroll, closes on Escape or when crossing into desktop.
const menuOpen = ref(false)
const openButton = useTemplateRef('openButton')
const closeButton = useTemplateRef('closeButton')

function openMenu() {
  menuOpen.value = true
}

function closeMenu() {
  menuOpen.value = false
}

watch(menuOpen, async (open) => {
  document.documentElement.style.overflow = open ? 'hidden' : ''
  await nextTick()
  ;(open ? closeButton : openButton).value?.focus()
})

onKeyStroke('Escape', closeMenu)

const isDesktop = useMediaQuery('(min-width: 768px)')
watch(isDesktop, desktop => desktop && closeMenu())

onBeforeUnmount(() => {
  document.documentElement.style.overflow = ''
})
</script>

<template>
  <header class="flex items-center justify-between px-6 pt-6 md:px-12 md:pt-9">
    <a data-raw href="/" aria-label="Zerya strona główna" class="shrink-0">
      <img src="/img/logo.svg" alt="Zerya" class="h-7 w-auto md:h-8">
    </a>

    <nav class="hidden items-center gap-8 text-sm text-paper/65 md:flex" aria-label="Główna nawigacja">
      <ul class="flex gap-8">
        <li v-for="link in links" :key="link.href">
          <a
            data-raw
            :href="link.href"
            target="_blank"
            rel="noopener noreferrer"
            class="group relative inline-block py-1 transition-colors hover:text-mint"
          >{{ link.label }}<span class="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-mint transition-transform duration-300 group-hover:scale-x-100" /></a>
        </li>
      </ul>
      <ul class="flex items-center gap-5 border-l border-paper/20 pl-8">
        <li v-for="social in socials" :key="social.href">
          <a
            data-raw
            :href="social.href"
            target="_blank"
            rel="noopener noreferrer"
            :aria-label="social.label"
            class="block transition duration-200 hover:-translate-y-0.5 hover:scale-110 hover:text-mint"
          >
            <svg class="size-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path :d="social.path" />
            </svg>
          </a>
        </li>
        <li>
          <button
            data-raw
            type="button"
            :aria-label="copied ? 'Skopiowano adres e-mail' : `Skopiuj adres e-mail: ${EMAIL}`"
            class="relative block cursor-pointer transition-colors hover:text-mint"
            :class="{ 'text-mint': copied }"
            @click="copyEmail"
          >
            <UIcon v-if="copied" key="u-icon-1" name="i-lucide-check" class="size-5" aria-hidden="true" />
            <UIcon v-else key="u-icon-2" name="i-lucide-mail" class="size-5" aria-hidden="true" />
            <span
              role="status"
              class="pointer-events-none absolute top-full right-0 mt-2 border border-paper/25 bg-ink px-3 py-1.5 text-xs whitespace-nowrap text-paper transition-opacity"
              :class="copied ? 'opacity-100' : 'opacity-0'"
            >{{ copied ? 'Skopiowano e-mail' : '' }}</span>
          </button>
        </li>
      </ul>
    </nav>

    <button
      ref="openButton"
      data-raw
      type="button"
      class="-mr-2 p-2 text-paper/80 transition-colors hover:text-mint md:hidden"
      aria-label="Otwórz menu"
      aria-controls="mobile-menu"
      :aria-expanded="menuOpen"
      @click="openMenu"
    >
      <UIcon name="i-lucide-menu" class="size-6" aria-hidden="true" />
    </button>

    <!-- Teleported: the navbar sits inside animated (transformed) wrappers, which would trap position: fixed. -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition-opacity duration-200"
        leave-active-class="transition-opacity duration-150"
        enter-from-class="opacity-0"
        leave-to-class="opacity-0"
      >
        <div
          v-if="menuOpen"
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          class="fixed inset-0 z-50 flex flex-col bg-ink px-6 pt-6 pb-8 md:hidden"
        >
          <div class="flex items-center justify-between">
            <a data-raw href="/" aria-label="Zerya strona główna" @click="closeMenu">
              <img src="/img/logo.svg" alt="Zerya" class="h-7 w-auto">
            </a>
            <button
              ref="closeButton"
              data-raw
              type="button"
              class="-mr-2 p-2 text-paper/80 transition-colors hover:text-mint"
              aria-label="Zamknij menu"
              @click="closeMenu"
            >
              <UIcon name="i-lucide-x" class="size-6" aria-hidden="true" />
            </button>
          </div>

          <nav class="mt-[12svh]" aria-label="Główna nawigacja">
            <ul class="space-y-5">
              <li v-for="link in links" :key="link.href">
                <a
                  data-raw
                  :href="link.href"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex items-baseline justify-between border-b border-paper/15 pb-4 font-heading text-3xl tracking-tight text-paper transition-colors hover:text-mint"
                  @click="closeMenu"
                >
                  {{ link.label }}
                  <span class="text-lg text-paper/35" aria-hidden="true">↗</span>
                </a>
              </li>
            </ul>
          </nav>

          <div class="mt-auto flex items-center justify-between text-paper/65">
            <a data-raw :href="`mailto:${EMAIL}`" class="text-sm transition-colors hover:text-mint">{{ EMAIL }}</a>
            <ul class="flex items-center gap-5">
              <li v-for="social in socials" :key="social.href">
                <a
                  data-raw
                  :href="social.href"
                  target="_blank"
                  rel="noopener noreferrer"
                  :aria-label="social.label"
                  class="block transition-colors hover:text-mint"
                >
                  <svg class="size-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path :d="social.path" />
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </Transition>
    </Teleport>
  </header>
</template>
