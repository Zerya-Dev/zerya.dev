<script setup lang="ts">
import type { Metric } from '~/data/site'

const props = withDefaults(defineProps<{
  metrics: Metric[]
  dark?: boolean
  cols?: 3 | 4
}>(), {
  dark: false,
  cols: 3,
})

const colsClasses = {
  3: 'sm:grid-cols-2 lg:grid-cols-3',
  4: 'sm:grid-cols-2 lg:grid-cols-4',
} as const
</script>

<template>
  <dl
    class="grid gap-px overflow-hidden rounded-md border border-slate-200 bg-slate-200"
    :class="colsClasses[props.cols]"
  >
    <div
      v-for="metric in metrics"
      :key="`${metric.value}-${metric.label}`"
      :class="dark ? 'bg-space-2 text-white' : 'bg-white'"
      class="p-8"
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
