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
  <section :id="id" :class="[color, sectionSpacing[spacing]]" :aria-labelledby="label" class="w-full">
    <div :class="containerWidth[width]" class="mx-auto w-full px-4 md:px-6">
      <slot />
    </div>
  </section>
</template>
