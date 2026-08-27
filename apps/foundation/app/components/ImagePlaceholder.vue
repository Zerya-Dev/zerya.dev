<script setup lang="ts">
withDefaults(defineProps<{
  label?: string
  tone?: 'dark' | 'green' | 'mint' | 'light'
}>(), {
  label: 'Miejsce na fotografię',
  tone: 'light',
})

const tones = {
  dark: 'bg-space-2 text-white',
  green: 'bg-zerya-600 text-white',
  mint: 'bg-mint text-zerya-900',
  light: 'bg-slate-200 text-slate-600',
}
</script>

<template>
  <div :class="tones[tone]" class="flex h-full min-h-56 w-full flex-col items-center justify-center gap-4 overflow-hidden p-8 text-center" role="img" :aria-label="label">
    <UIcon name="i-lucide-image" class="size-10 opacity-70" aria-hidden="true" />
    <span class="max-w-xs text-sm font-bold">{{ label }}</span>
  </div>
</template>
