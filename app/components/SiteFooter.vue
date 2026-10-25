<script setup lang="ts">
const year = new Date().getFullYear()
const projects = Object.values(PROJECT_LINKS)
</script>

<template>
  <footer>
    <div class="mx-auto w-full max-w-[1328px] px-6 pt-6 pb-6 md:px-16 md:pt-10 md:pb-8">
      <div class="grid gap-8 md:grid-cols-12 md:gap-6">
        <nav aria-label="Nasze projekty" class="md:col-span-6">
          <p class="text-xs font-medium text-paper/55">
            Nasze projekty
          </p>
          <ul class="mt-4 divide-y divide-paper/10 border-y border-paper/10">
            <li v-for="project in projects" :key="project.to">
              <a :href="project.to" target="_blank" class="group flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-3">
                <span class="font-heading text-lg/6 font-medium md:text-[22px]/[28px] tracking-tight transition-colors group-hover:text-aurora">{{ project.name }}</span>
                <span class="flex items-center gap-1 text-sm text-paper/55">
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
          <ul class="mt-4 flex flex-wrap gap-x-6 gap-y-2 md:block md:space-y-2">
            <li v-for="contact in CONTACT_LINKS" :key="contact.to">
              <UButton :to="contact.to" :target="contact.target" :label="contact.label" color="neutral" variant="link" class="p-0" />
            </li>
          </ul>
        </div>
      </div>
      <div class="mt-8 flex items-end justify-between gap-6 md:mt-12">
        <img src="/img/logo.svg" alt="Zerya" width="133" height="64" class="h-6 w-auto md:h-8">
        <span class="text-xs text-paper/55">&copy; {{ year }} Zerya</span>
      </div>
    </div>
  </footer>
</template>
