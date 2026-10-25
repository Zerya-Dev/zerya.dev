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

useScrollScenes()
const contactDialog = useContactDialog()
</script>

<template>
  <div>
    <SiteAxis />
    <SiteDesktopHint />
    <main>
      <!-- The aurora closes into a line of light. Every later section opens from that line. -->
      <SiteHero />
      <SiteProjects />

      <SiteTeam />

      <!-- The last gate opens out of the ruins' scene back onto the aurora, at dawn -->
      <SiteGate anchor="napisz" over edge="var(--color-forest)" to="bg-night text-paper">
        <template #background>
          <img src="/img/aurora-poster.webp" alt="" width="1920" height="1080" loading="lazy" class="absolute inset-0 size-full object-cover object-[72%_100%]">
          <div class="absolute inset-0 bg-night/65 md:bg-transparent md:bg-[linear-gradient(to_right,rgb(10_10_10/0.9),rgb(10_10_10/0.6)_40%,transparent_75%)]" />
          <!-- The dawn settles into night where the footer sits -->
          <div class="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-night via-night/85 to-transparent" />
        </template>
        <h2 class="max-w-[16ch] text-[36px]/[44px] font-semibold tracking-[-0.035em] md:text-[64px]/[68px] xl:text-[80px]/[84px]">
          Masz problem, który powinien zniknąć?
        </h2>
        <!-- Closes on the line the hero opened with, rather than repeating the contact form -->
        <p class="mt-8 max-w-[40ch] text-base/6 text-paper/75 md:text-lg/7">
          Software to nie cel, tylko droga. Opowiedz nam o swoim problemie, a my zadbamy, żeby zniknął.
        </p>
        <div class="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
          <UButton color="neutral" size="xl" label="Porozmawiajmy" trailing-icon="i-lucide-arrow-right" @click="contactDialog.open('footer')" />
          <!-- Phones find the address in the footer right under it -->
          <UButton :to="`mailto:${CONTACT_EMAIL}`" :label="CONTACT_EMAIL" color="neutral" variant="link" class="hidden p-0 md:inline-flex" />
        </div>
        <template #after>
          <SiteFooter />
        </template>
      </SiteGate>
    </main>
  </div>
</template>
