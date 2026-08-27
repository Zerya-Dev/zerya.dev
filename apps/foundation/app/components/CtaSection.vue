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
    <UPageCTA
      :title="title"
      variant="naked"
      :class="dark ? 'bg-space text-white' : 'bg-mint text-space'"
      class="rounded-md"
      :ui="{
        container: 'flex flex-col lg:flex lg:flex-row items-stretch lg:items-center gap-8 sm:gap-8 p-8 sm:p-8 md:p-12 lg:p-16',
        wrapper: 'min-w-0 flex-1',
        title: 'text-left text-3xl sm:text-3xl md:text-5xl font-extrabold tracking-tighter text-inherit',
        description: 'mt-4 max-w-2xl text-left text-pretty text-base sm:text-base leading-7',
      }"
    >
      <template #description>
        <p :class="dark ? 'text-slate-300' : 'text-slate-600'">
          {{ description }}
        </p>
      </template>
      <div class="min-w-0 flex-1 lg:text-right">
        <UButton :to="external ? undefined : to" :href="external ? to : undefined" :target="external ? '_blank' : undefined" :rel="external ? 'noopener noreferrer' : undefined" color="primary" size="xl" class="min-h-12 justify-center rounded-md px-6 font-bold text-space">
          {{ buttonLabel }}
          <UIcon :name="external ? 'i-lucide-arrow-up-right' : 'i-lucide-arrow-right'" class="size-4" aria-hidden="true" />
        </UButton>
      </div>
    </UPageCTA>
  </PageSection>
</template>
