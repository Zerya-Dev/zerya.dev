<script setup lang="ts">
import type { Metric } from '~/types/content'

const props = withDefaults(defineProps<{
  metrics: Metric[]
  dark?: boolean
  cols?: 3 | 4
}>(), {
  dark: false,
  cols: 3,
})

const colsClasses = {
  3: 'sm:basis-[calc((100%-1px)/2)] lg:basis-[calc((100%-2px)/3)]',
  4: 'sm:basis-[calc((100%-1px)/2)] lg:basis-[calc((100%-3px)/4)]',
} as const
</script>

<template>
  <dl
    class="flex flex-wrap gap-px overflow-hidden rounded-md border border-slate-200 bg-slate-200"
  >
    <div
      v-for="metric in metrics"
      :key="`${metric.value}-${metric.label}`"
      :class="[dark ? 'bg-space-2 text-white' : 'bg-white', colsClasses[props.cols]]"
      class="min-w-0 basis-full p-8"
    >
      <dt class="text-4xl font-extrabold tracking-tighter text-zerya-500 md:text-5xl">
        {{ metric.value }}
      </dt>

      <dd
        :class="dark ? 'text-slate-300' : 'text-slate-500'"
        class="mt-3 text-sm leading-6"
      >
        {{ metric.label }}
      </dd>
    </div>
  </dl>
</template>
