<script setup lang="ts">
import type { GalleryItem } from '~/data/site'

defineProps<{
  open: boolean
  item?: GalleryItem
}>()

const emit = defineEmits<{
  'update:open': [value: boolean]
}>()
</script>

<template>
  <UModal :open="open" :title="item?.project || 'Galeria'" :description="item ? `${item.date} · ${item.place}` : undefined" fullscreen @update:open="emit('update:open', $event)">
    <template #body>
      <div v-if="item" class="flex h-full min-h-0 flex-col gap-6">
        <ImagePlaceholder :label="item.label" :tone="item.tone" class="min-h-0 flex-1 rounded-sm" />
        <p class="text-center text-sm text-slate-500">
          {{ item.label }}
        </p>
      </div>
    </template>
  </UModal>
</template>
