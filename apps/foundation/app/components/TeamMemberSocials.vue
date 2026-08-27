<script setup lang="ts">
import type { SocialPlatform, TeamMember } from '~~/content/team'
import { SOCIAL_PLATFORMS } from '~~/content/team'

const props = withDefaults(defineProps<{
  name: string
  socials: NonNullable<TeamMember['socials']>
  size?: 'sm' | 'md'
}>(), {
  size: 'md',
})

// Keep a stable order regardless of how the links are written in content
const links = computed(() => (Object.keys(SOCIAL_PLATFORMS) as SocialPlatform[])
  .filter(platform => props.socials[platform])
  .map(platform => ({ ...SOCIAL_PLATFORMS[platform], href: platform === 'email' ? `mailto:${props.socials[platform]}` : props.socials[platform]! })))
</script>

<template>
  <ul v-if="links.length" class="flex items-center gap-3" :aria-label="`Profile — ${name}`">
    <li v-for="link in links" :key="link.href" class="flex">
      <a :href="link.href" :target="link.href.startsWith('mailto:') ? undefined : '_blank'" rel="noopener noreferrer" class="text-slate-500 transition-colors hover:text-zerya-700">
        <UIcon :name="link.icon" :class="size === 'sm' ? 'size-4' : 'size-5'" aria-hidden="true" />
        <span class="sr-only">{{ link.label }} — {{ name }}{{ link.href.startsWith('mailto:') ? '' : ' (otwiera się w nowej karcie)' }}</span>
      </a>
    </li>
  </ul>
</template>
