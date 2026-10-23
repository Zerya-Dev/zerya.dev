<script setup lang="ts">
useHead({
  link: [
    { rel: 'preload', as: 'image', href: '/img/aurora-poster.webp' },
  ],
})
useSeoMeta({
  title: 'Zerya | Oprogramowanie na zamówienie i produkty cyfrowe',
  titleTemplate: '%s',
  ogTitle: 'Software to nie cel. Liczy się problem, który znika.',
  ogDescription: 'Projektujemy i budujemy rozwiązania, które usuwają konkretny problem.',
})
defineOgImage('Zerya')

// Scroll progress of the first viewport (0 → 1), exposed to CSS as `--p`.
// Written straight to the DOM so scrolling never re-renders the page.
const main = useTemplateRef('main')
const { y } = useWindowScroll()
const { height } = useWindowSize()
const progress = useCssVar('--p', main)

watchEffect(() => {
  progress.value = Math.min(Math.max(y.value / (height.value || 1), 0), 1).toFixed(4)
})
</script>

<template>
  <div>
    <main ref="main" class="[--p:0]">
      <HeroSection />
      <!-- The projects follow the hero, the land cut out of its sky opens onto them -->
      <CasesSection id="projekty" />
      <TeamSection />
    </main>
    <SiteFooter />
  </div>
</template>
