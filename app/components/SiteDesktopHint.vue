<script setup lang="ts">
// The page is built as scenes for a wide screen; on a phone it says so once, after the hero's intro,
// and stays away for good once closed.
const ready = useState('hero-ready', () => false)
const dismissed = useLocalStorage('desktop-hint-dismissed', false, { initOnMounted: true })
</script>

<template>
  <Transition
    enter-from-class="translate-y-4 opacity-0" enter-active-class="transition duration-500"
    leave-to-class="translate-y-4 opacity-0" leave-active-class="transition duration-300"
  >
    <div v-if="ready && !dismissed" role="status" class="ashlar fixed inset-x-4 bottom-16 z-50 flex items-start gap-4 p-4 pr-6 pb-6 text-ink md:hidden">
      <p class="relative z-10 grow text-sm/5">
        Dla lepszych wrażeń polecamy otworzyć stronę na komputerze.
      </p>
      <button type="button" aria-label="Zamknij" class="relative z-10 -m-1 flex p-1 text-ink/60 hover:text-ink" @click="dismissed = true">
        <UIcon name="i-lucide-x" class="size-4" />
      </button>
    </div>
  </Transition>
</template>
