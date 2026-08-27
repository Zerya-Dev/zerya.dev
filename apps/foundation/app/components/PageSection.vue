<script setup lang="ts">
type SectionSpacing = 'default' | 'bottom'
type ContainerWidth = 'wide' | 'narrow'

withDefaults(defineProps<{
  color: string
  label?: string
  id?: string
  spacing?: SectionSpacing
  width?: ContainerWidth
}>(), {
  spacing: 'default',
  width: 'wide',
})

const sectionSpacing = {
  default: 'py-16 md:py-24 xl:py-32',
  bottom: 'pb-16 md:pb-24 xl:pb-32',
} as const

const containerWidth = {
  wide: 'max-w-7xl',
  narrow: 'max-w-4xl',
} as const
</script>

<template>
  <UPageSection
    :id="id"
    :class="[color, sectionSpacing[spacing]]"
    :aria-labelledby="label"
    class="w-full"
    :ui="{
      container: `flex flex-col lg:flex ${containerWidth[width]} px-4 sm:px-4 md:px-6 lg:px-6 py-0 sm:py-0 lg:py-0 gap-0 sm:gap-0`,
    }"
  >
    <div class="w-full min-w-0">
      <slot />
    </div>
  </UPageSection>
</template>
