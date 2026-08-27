<script setup lang="ts">
import {
  SUPPORT_AREAS,
  SUPPORT_DONATION,
  SUPPORT_DONATION_PATH,
  SUPPORT_HERO,
  SUPPORT_LONG_TERM,
  SUPPORT_LONG_TERM_PATH,
  SUPPORT_SEO,
} from '~~/content/pages/support'

useSeoMeta({
  title: SUPPORT_SEO.title,
  description: SUPPORT_SEO.description,
})

const activePath = ref<'longTermSupport' | 'donation'>('longTermSupport')
const frequency = ref<'once' | 'recurring'>('once')
</script>

<template>
  <main id="main-content">
    <PageHero :label="SUPPORT_HERO.label" :title="SUPPORT_HERO.title" :description="SUPPORT_HERO.description" />

    <PageSection color="bg-white" label="support-path-title" spacing="bottom">
      <h2 id="support-path-title" class="sr-only">
        Wybierz sposób wsparcia
      </h2>
      <div class="flex flex-col gap-4 sm:flex-row" role="group" aria-label="Rodzaj wspierającego">
        <UButton
          type="button"
          color="primary"
          :variant="activePath === 'longTermSupport' ? 'soft' : 'ghost'"
          class="flex min-w-0 flex-col items-start gap-0 rounded-md border p-8 text-left text-base font-normal whitespace-normal text-space transition sm:flex-1 md:p-10"
          :aria-pressed="activePath === 'longTermSupport'"
          @click="activePath = 'longTermSupport'"
        >
          <UIcon :name="SUPPORT_LONG_TERM_PATH.icon" class="size-8 text-zerya-600" aria-hidden="true" />
          <strong class="mt-6 block text-2xl">{{ SUPPORT_LONG_TERM_PATH.title }}</strong>
          <span class="mt-2 block leading-7 text-slate-500">{{ SUPPORT_LONG_TERM_PATH.description }}</span>
        </UButton>
        <UButton
          type="button"
          color="primary"
          :variant="activePath === 'donation' ? 'soft' : 'ghost'"
          class="flex min-w-0 flex-col items-start gap-0 rounded-md border p-8 text-left text-base font-normal whitespace-normal text-space transition sm:flex-1 md:p-10"
          :aria-pressed="activePath === 'donation'"
          @click="activePath = 'donation'"
        >
          <UIcon :name="SUPPORT_DONATION_PATH.icon" class="size-8 text-zerya-600" aria-hidden="true" />
          <strong class="mt-6 block text-2xl">{{ SUPPORT_DONATION_PATH.title }}</strong>
          <span class="mt-2 block leading-7 text-slate-500">{{ SUPPORT_DONATION_PATH.description }}</span>
        </UButton>
      </div>

      <div class="mt-8 overflow-hidden rounded-md bg-space text-white">
        <div v-if="activePath === 'longTermSupport'" class="flex flex-col gap-12 p-8 md:p-12 lg:flex-row lg:p-16 lg:*:min-w-0 lg:*:flex-1">
          <div>
            <p class="text-sm font-extrabold tracking-widest text-zerya-400 uppercase">
              {{ SUPPORT_LONG_TERM.label }}
            </p>
            <h2 class="mt-4 text-4xl font-extrabold tracking-tighter md:text-5xl">
              {{ SUPPORT_LONG_TERM.title }}
            </h2>
            <p class="mt-6 leading-7 text-slate-300">
              {{ SUPPORT_LONG_TERM.description }}
            </p>
            <UButton :to="SUPPORT_LONG_TERM.button.to" color="primary" size="xl" class="mt-8 rounded-md px-6 font-bold">
              {{ SUPPORT_LONG_TERM.button.label }} <UIcon name="i-lucide-arrow-right" class="size-4" aria-hidden="true" />
            </UButton>
          </div>
          <div>
            <p class="font-bold">
              {{ SUPPORT_LONG_TERM.optionsTitle }}
            </p>
            <ul class="mt-6 flex flex-col gap-3">
              <li v-for="option in SUPPORT_LONG_TERM.options" :key="option" class="flex gap-3 rounded-md bg-white/5 p-4 text-slate-200">
                <UIcon name="i-lucide-check" class="mt-1 size-5 shrink-0 text-zerya-400" aria-hidden="true" />
                {{ option }}
              </li>
            </ul>
          </div>
        </div>

        <div v-else class="flex flex-col gap-12 p-8 md:p-12 lg:flex-row lg:p-16 lg:*:min-w-0 lg:*:flex-1">
          <div>
            <p class="text-sm font-extrabold tracking-widest text-zerya-400 uppercase">
              {{ SUPPORT_DONATION.label }}
            </p>
            <h2 class="mt-4 text-4xl font-extrabold tracking-tighter md:text-5xl">
              {{ SUPPORT_DONATION.title }}
            </h2>
            <p class="mt-6 leading-7 text-slate-300">
              {{ SUPPORT_DONATION.description }}
            </p>
          </div>
          <div>
            <p class="font-bold">
              {{ SUPPORT_DONATION.frequencyTitle }}
            </p>
            <div class="mt-4 flex gap-2 *:min-w-0 *:flex-1" role="group" aria-label="Częstotliwość wsparcia">
              <UButton :color="frequency === 'once' ? 'primary' : 'secondary'" :variant="frequency === 'once' ? 'solid' : 'outline'" class="justify-center rounded-md font-bold" :aria-pressed="frequency === 'once'" @click="frequency = 'once'">
                {{ SUPPORT_DONATION.onceLabel }}
              </UButton>
              <UButton :color="frequency === 'recurring' ? 'primary' : 'secondary'" :variant="frequency === 'recurring' ? 'solid' : 'outline'" class="justify-center rounded-md font-bold" :aria-pressed="frequency === 'recurring'" @click="frequency = 'recurring'">
                {{ SUPPORT_DONATION.recurringLabel }}
              </UButton>
            </div>
            <p class="mt-6 rounded-md bg-white/5 p-4 text-sm leading-6 text-slate-300">
              {{ SUPPORT_DONATION.notice }}
            </p>
            <UButton :to="SUPPORT_DONATION.button.to" color="primary" size="xl" class="mt-6 rounded-md px-6 font-bold">
              {{ SUPPORT_DONATION.button.label }} <UIcon name="i-lucide-arrow-right" class="size-4" aria-hidden="true" />
            </UButton>
          </div>
        </div>
      </div>
    </PageSection>

    <PageSection color="bg-mint" label="funding-title">
      <SectionHeader label="Konkretny cel" title="Co finansuje wsparcie" title-id="funding-title" />
      <div class="flex flex-col gap-4 md:flex-row">
        <InfoCard v-for="area in SUPPORT_AREAS" :key="area.title" v-bind="area" class="min-w-0 md:flex-1" />
      </div>
    </PageSection>
  </main>
</template>
