<script setup lang="ts">
const contactDialog = useContactDialog()

// In-page only: external projects and socials live in the footer
const links = [
  { label: 'Projekty', to: '#projekty' },
  { label: 'Zespół', to: '#zespol' },
  { label: 'Kontakt', to: '#napisz' },
]

const projects = Object.values(PROJECT_LINKS)

// Phones get the links in a full-screen menu
const menuOpen = ref(false)
let afterClose: (() => void) | undefined

// The menu locks page scroll, so in-page jumps and the contact dialog wait until it has closed
function closeThen(action: () => void) {
  afterClose = action
  menuOpen.value = false
}

function onMenuLeave() {
  afterClose?.()
  afterClose = undefined
}

function goTo(hash: string) {
  closeThen(() => {
    document.querySelector(hash)?.scrollIntoView()
    history.replaceState(history.state, '', hash)
  })
}
</script>

<template>
  <header class="mx-auto flex w-full max-w-[1328px] items-center justify-between gap-4 px-6 pt-6 md:gap-8 md:px-16 md:pt-8">
    <NuxtLink to="/" class="shrink-0">
      <img src="/img/logo.svg" alt="Zerya" width="133" height="64" class="h-7 w-auto md:h-8">
    </NuxtLink>

    <nav aria-label="Główna nawigacja" class="hidden md:block">
      <ul class="flex gap-8">
        <li v-for="link in links" :key="link.to">
          <a :href="link.to" class="text-sm text-paper/65 transition-colors hover:text-paper">{{ link.label }}</a>
        </li>
      </ul>
    </nav>

    <UModal v-model:open="menuOpen" fullscreen title="Menu" :ui="{ content: 'bg-night' }" @after:leave="onMenuLeave">
      <UButton icon="i-lucide-menu" color="neutral" variant="ghost" size="xl" aria-label="Otwórz menu" class="-mr-2.5 md:hidden" />

      <template #content>
        <div class="flex min-h-full flex-col overflow-y-auto px-6 pt-6 pb-8">
          <div class="flex items-center justify-between gap-4">
            <img src="/img/logo.svg" alt="Zerya" width="133" height="64" class="h-7 w-auto">
            <UButton icon="i-lucide-x" color="neutral" variant="ghost" size="xl" aria-label="Zamknij menu" class="-mr-2.5" @click="menuOpen = false" />
          </div>

          <nav aria-label="Główna nawigacja" class="mt-16">
            <ul class="divide-y divide-paper/10 border-y border-paper/10">
              <li v-for="(link, i) in links" :key="link.to">
                <a :href="link.to" class="flex items-baseline justify-between gap-6 py-5" @click.prevent="goTo(link.to)">
                  <span class="font-heading text-[32px]/[40px] font-medium tracking-[-0.02em]">{{ link.label }}</span>
                  <span class="font-mono text-xs text-dimmed">{{ String(i + 1).padStart(2, '0') }}</span>
                </a>
              </li>
            </ul>
          </nav>

          <nav aria-label="Nasze projekty" class="mt-12">
            <p class="text-xs font-medium text-paper/55">
              Nasze projekty
            </p>
            <ul class="mt-4 divide-y divide-paper/10 border-y border-paper/10">
              <li v-for="project in projects" :key="project.to">
                <a :href="project.to" target="_blank" class="flex items-center justify-between gap-6 py-4">
                  <span class="font-heading text-lg font-medium tracking-tight">{{ project.name }}</span>
                  <UIcon name="i-lucide-arrow-up-right" class="size-4 text-dimmed" />
                </a>
              </li>
            </ul>
          </nav>

          <div class="mt-auto pt-12">
            <UButton color="neutral" size="xl" label="Porozmawiajmy" trailing-icon="i-lucide-arrow-right" block @click="closeThen(() => contactDialog.open())" />
          </div>
        </div>
      </template>
    </UModal>
  </header>
</template>
