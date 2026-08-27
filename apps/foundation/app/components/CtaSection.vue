<script setup lang="ts">
withDefaults(defineProps<{
  title: string
  description: string
  buttonLabel: string
  to: string
  dark?: boolean
  external?: boolean
}>(), {
  dark: true,
  external: false,
})
</script>

<template>
  <PageSection color="bg-white">
    <div :class="dark ? 'bg-space text-white' : 'bg-mint text-space'" class="grid items-center gap-8 rounded-md p-8 md:p-12 lg:grid-cols-2 lg:p-16">
      <div>
        <h2 class="text-3xl font-extrabold tracking-tighter md:text-5xl">
          {{ title }}
        </h2>
        <p :class="dark ? 'text-slate-300' : 'text-slate-600'" class="mt-4 max-w-2xl leading-7">
          {{ description }}
        </p>
      </div>
      <div class="lg:text-right">
        <UButton :to="external ? undefined : to" :href="external ? to : undefined" :target="external ? '_blank' : undefined" :rel="external ? 'noopener noreferrer' : undefined" color="primary" size="xl" class="min-h-12 justify-center rounded-md px-6 font-bold text-space">
          {{ buttonLabel }}
          <UIcon :name="external ? 'i-lucide-arrow-up-right' : 'i-lucide-arrow-right'" class="size-4" aria-hidden="true" />
        </UButton>
      </div>
    </div>
  </PageSection>
</template>
