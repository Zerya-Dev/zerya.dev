<script setup lang="ts">
const EMAIL = 'kontakt@zerya.dev'
const { copy, copied } = useClipboard({ source: EMAIL, copiedDuring: 2000 })
const open = ref(false)
const isDesktop = useMediaQuery('(min-width: 768px)')
watch(isDesktop, desktop => desktop && (open.value = false))

const links = [
  { label: 'MOTOQ', to: 'https://motoq.zerya.dev' },
  { label: 'Hack4Krak', to: 'https://hack4krak.pl/' },
  { label: 'Zerya Foundation', to: 'https://foundation.zerya.dev/' },
].map(link => ({ ...link, target: '_blank', onSelect: () => open.value = false }))

const socials = [
  { label: 'GitHub', to: 'https://github.com/zerya-Dev', icon: 'i-simple-icons-github' },
  { label: 'LinkedIn', to: 'https://www.linkedin.com/company/111743895', icon: 'i-simple-icons-linkedin' },
]
</script>

<template>
  <UHeader
    v-model:open="open"
    title="Zerya strona główna"
    :menu="{ title: 'Menu', description: 'Główna nawigacja' }"
    :ui="{
      root: 'relative z-20 h-auto border-0 bg-transparent pt-6 backdrop-blur-none md:pt-9',
      container: 'max-w-none px-6 sm:px-6 md:px-12 lg:px-12 gap-8',
      left: 'lg:flex-none',
      center: 'md:flex md:ml-auto',
      right: 'lg:flex-none',
      toggle: 'md:hidden',
      content: 'md:hidden bg-ink',
      overlay: 'md:hidden',
      header: 'h-auto px-6 pt-6',
      body: 'flex flex-1 flex-col px-6 pt-[12svh] pb-8',
    }"
  >
    <template #title>
      <NuxtImg provider="none" src="/img/logo.svg" alt="Zerya" class="h-7 w-auto md:h-8" />
    </template>

    <UNavigationMenu
      :items="links" variant="link" :external-icon="false" aria-label="Główna nawigacja"
      :ui="{ list: 'gap-8', link: 'px-0 font-normal text-paper/65 hover:text-mint' }"
    />

    <template #right>
      <div class="hidden items-center gap-5 border-l border-paper/20 pl-8 md:flex">
        <UButton
          v-for="social in socials" :key="social.to" :to="social.to" :icon="social.icon" target="_blank"
          :aria-label="social.label" color="neutral" variant="link"
          class="p-0 transition-transform hover:-translate-y-0.5 hover:scale-110"
        />
        <UTooltip :text="copied ? 'Skopiowano e-mail' : `Skopiuj ${EMAIL}`">
          <UButton
            :icon="copied ? 'i-lucide-check' : 'i-lucide-mail'"
            :aria-label="copied ? 'Skopiowano adres e-mail' : `Skopiuj adres e-mail: ${EMAIL}`"
            :color="copied ? 'primary' : 'neutral'" variant="link" class="p-0" @click="copy()"
          />
        </UTooltip>
        <span role="status" class="sr-only">{{ copied ? 'Skopiowano e-mail' : '' }}</span>
      </div>
    </template>

    <template #body>
      <UNavigationMenu
        :items="links" orientation="vertical" variant="link" aria-label="Główna nawigacja"
        :external-icon="false"
        :ui="{ list: 'gap-5', link: 'justify-between border-b border-paper/15 px-0 pb-4 font-heading text-3xl font-normal tracking-tight text-paper hover:text-mint' }"
      >
        <template #item-trailing>
          <UIcon name="i-lucide-arrow-up-right" class="size-5 text-paper/35" />
        </template>
      </UNavigationMenu>
      <div class="mt-auto flex items-center justify-between pt-8">
        <UButton :to="`mailto:${EMAIL}`" :label="EMAIL" color="neutral" variant="link" class="p-0" />
        <div class="flex gap-5">
          <UButton
            v-for="social in socials" :key="social.to" :to="social.to" :icon="social.icon" target="_blank"
            :aria-label="social.label" color="neutral" variant="link" class="p-0"
          />
        </div>
      </div>
    </template>
  </UHeader>
</template>
