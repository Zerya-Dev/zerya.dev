<script setup lang="ts">
const contactDialog = useContactDialog()
const year = new Date().getFullYear()

const projects = Object.values(PROJECT_LINKS)

const contacts = [
  { label: CONTACT_EMAIL, to: `mailto:${CONTACT_EMAIL}` },
  { label: 'GitHub', to: SOCIAL_LINKS.github, target: '_blank' },
  { label: 'LinkedIn', to: SOCIAL_LINKS.linkedin, target: '_blank' },
]
</script>

<template>
  <footer id="napisz" class="flex min-h-svh flex-col bg-night">
    <div class="mx-auto flex w-full max-w-[1328px] flex-1 flex-col px-6 pt-24 pb-8 md:px-16">
      <p class="text-xs font-medium text-paper/55">
        Kontakt
      </p>
      <h2 class="mt-4 max-w-[18ch] text-[40px]/[48px] font-medium tracking-[-0.03em] md:text-[56px]/[64px] xl:text-[72px]/[80px]">
        Masz problem, który powinien zniknąć?
      </h2>
      <p class="mt-6 max-w-[40ch] text-base text-paper/70">
        Napisz, o co chodzi. Odpisujemy w ciągu jednego dnia roboczego.
      </p>
      <div class="mt-8">
        <UButton color="neutral" size="xl" label="Porozmawiajmy" trailing-icon="i-lucide-arrow-right" @click="contactDialog.open('footer')" />
      </div>

      <div class="mt-auto grid gap-12 pt-16 md:grid-cols-12 md:gap-6">
        <nav aria-label="Nasze projekty" class="md:col-span-6">
          <p class="text-xs font-medium text-paper/55">
            Nasze projekty
          </p>
          <ul class="mt-4 divide-y divide-paper/10 border-y border-paper/10">
            <li v-for="project in projects" :key="project.to">
              <a :href="project.to" target="_blank" class="group flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 py-4">
                <span class="font-heading text-[22px]/[28px] font-medium tracking-tight group-hover:text-aurora">{{ project.name }}</span>
                <span class="flex items-center gap-1 font-mono text-xs text-dimmed">
                  {{ project.domain }}
                  <UIcon name="i-lucide-arrow-up-right" class="size-4 motion-safe:transition-transform motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5" />
                </span>
              </a>
            </li>
          </ul>
        </nav>

        <div class="md:col-span-3 md:col-start-10">
          <p class="text-xs font-medium text-paper/55">
            Znajdziesz nas
          </p>
          <ul class="mt-4 space-y-2">
            <li v-for="contact in contacts" :key="contact.to">
              <UButton :to="contact.to" :target="contact.target" :label="contact.label" color="neutral" variant="link" class="p-0" />
            </li>
          </ul>
        </div>
      </div>

      <div class="mt-16 flex items-end justify-between gap-6">
        <img src="/img/logo.svg" alt="Zerya" width="133" height="64" class="h-8 w-auto">
        <span class="text-xs text-dimmed">&copy; {{ year }} Zerya</span>
      </div>
    </div>
  </footer>
</template>
