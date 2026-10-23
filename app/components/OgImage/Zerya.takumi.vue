<script setup lang="ts">
const {
  headline = ['Zerya tworzy', 'własne produkty cyfrowe', 'i oprogramowanie dla firm.'],
} = defineProps<{ headline?: string[] }>()
</script>

<template>
  <div class="relative flex h-full w-full" style="background-color: #05080a; color: #ffffff">
    <img src="/img/og-aurora.jpg" width="1200" height="630" class="absolute inset-0 h-full w-full">
    <div class="absolute inset-0 flex" style="background-image: radial-gradient(ellipse at center, rgba(5, 8, 10, 0) 45%, rgba(5, 8, 10, 0.75) 100%)" />

    <div class="relative flex h-full w-full flex-col justify-between px-[100px] pt-[72px] pb-[80px]">
      <div class="flex flex-col text-[48px]" style="font-family: Outfit; line-height: 1.24">
        <span v-for="line in headline" :key="line" style="font-weight: 500">{{ line }}</span>
      </div>
      <div class="flex items-end justify-between">
        <img src="/img/logo.svg" width="133" height="64" alt="Zerya">
        <span class="text-[24px]" style="font-family: Outfit; font-weight: 500">zerya.dev</span>
      </div>
    </div>
  </div>
</template>
