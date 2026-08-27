<script setup lang="ts">
const { data: page } = await useFoundationData('pages/support', 'foundation-page-support')

if (!page.value) {
  throw createError({ statusCode: 500, statusMessage: 'Brak wymaganej treści strony Wsparcie' })
}

const content = page.value
const supportPaths = content.supportPaths!
const longTermPath = supportPaths[0]!
const donationPath = supportPaths[1]!
const longTerm = content.longTerm!
const donation = content.donation!
const supportAreas = content.supportAreas!

useSeoMeta({
  title: content.seo.title,
  description: content.seo.description,
})

const activePath = ref<'longTermSupport' | 'donation'>('longTermSupport')
const frequency = ref<'once' | 'recurring'>('once')
</script>

<template>
  <main id="main-content">
    <PageHero :label="content.hero.label" :title="content.hero.title" :description="content.hero.description" />

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
          <UIcon :name="longTermPath.icon" class="size-8 text-zerya-600" aria-hidden="true" />
          <strong class="mt-6 block text-2xl">{{ longTermPath.title }}</strong>
          <span class="mt-2 block leading-7 text-slate-500">{{ longTermPath.description }}</span>
        </UButton>
        <UButton
          type="button"
          color="primary"
          :variant="activePath === 'donation' ? 'soft' : 'ghost'"
          class="flex min-w-0 flex-col items-start gap-0 rounded-md border p-8 text-left text-base font-normal whitespace-normal text-space transition sm:flex-1 md:p-10"
          :aria-pressed="activePath === 'donation'"
          @click="activePath = 'donation'"
        >
          <UIcon :name="donationPath.icon" class="size-8 text-zerya-600" aria-hidden="true" />
          <strong class="mt-6 block text-2xl">{{ donationPath.title }}</strong>
          <span class="mt-2 block leading-7 text-slate-500">{{ donationPath.description }}</span>
        </UButton>
      </div>

      <div class="mt-8 overflow-hidden rounded-md bg-space text-white">
        <div v-if="activePath === 'longTermSupport'" class="flex flex-col gap-12 p-8 md:p-12 lg:flex-row lg:p-16 lg:*:min-w-0 lg:*:flex-1">
          <div>
            <p class="text-sm font-extrabold tracking-widest text-zerya-400 uppercase">
              {{ longTerm.label }}
            </p>
            <h2 class="mt-4 text-4xl font-extrabold tracking-tighter md:text-5xl">
              {{ longTerm.title }}
            </h2>
            <p class="mt-6 leading-7 text-slate-300">
              {{ longTerm.description }}
            </p>
            <UButton :to="longTerm.button.to" color="primary" size="xl" class="mt-8 rounded-md px-6 font-bold text-space">
              {{ longTerm.button.label }} <UIcon name="i-lucide-arrow-right" class="size-4" aria-hidden="true" />
            </UButton>
          </div>
          <div>
            <p class="font-bold">
              {{ longTerm.optionsTitle }}
            </p>
            <ul class="mt-6 flex flex-col gap-3">
              <li v-for="option in longTerm.options" :key="option" class="flex gap-3 rounded-md bg-white/5 p-4 text-slate-200">
                <UIcon name="i-lucide-check" class="mt-1 size-5 shrink-0 text-zerya-400" aria-hidden="true" />
                {{ option }}
              </li>
            </ul>
          </div>
        </div>

        <div v-else class="flex flex-col gap-12 p-8 md:p-12 lg:flex-row lg:p-16 lg:*:min-w-0 lg:*:flex-1">
          <div>
            <p class="text-sm font-extrabold tracking-widest text-zerya-400 uppercase">
              {{ donation.label }}
            </p>
            <h2 class="mt-4 text-4xl font-extrabold tracking-tighter md:text-5xl">
              {{ donation.title }}
            </h2>
            <p class="mt-6 leading-7 text-slate-300">
              {{ donation.description }}
            </p>
          </div>
          <div>
            <p class="font-bold">
              {{ donation.frequencyTitle }}
            </p>
            <div class="mt-4 flex gap-2 *:min-w-0 *:flex-1" role="group" aria-label="Częstotliwość wsparcia">
              <UButton :color="frequency === 'once' ? 'primary' : 'secondary'" :variant="frequency === 'once' ? 'solid' : 'outline'" class="justify-center rounded-md font-bold" :aria-pressed="frequency === 'once'" @click="frequency = 'once'">
                {{ donation.onceLabel }}
              </UButton>
              <UButton :color="frequency === 'recurring' ? 'primary' : 'secondary'" :variant="frequency === 'recurring' ? 'solid' : 'outline'" class="justify-center rounded-md font-bold" :aria-pressed="frequency === 'recurring'" @click="frequency = 'recurring'">
                {{ donation.recurringLabel }}
              </UButton>
            </div>
            <p class="mt-6 rounded-md bg-white/5 p-4 text-sm leading-6 text-slate-300">
              {{ donation.notice }}
            </p>
            <UButton :to="donation.button.to" color="primary" size="xl" class="mt-6 rounded-md px-6 font-bold text-space">
              {{ donation.button.label }} <UIcon name="i-lucide-arrow-right" class="size-4" aria-hidden="true" />
            </UButton>
          </div>
        </div>
      </div>
    </PageSection>

    <PageSection color="bg-mint" label="funding-title">
      <SectionHeader label="Konkretny cel" title="Co finansuje wsparcie" title-id="funding-title" />
      <div class="flex flex-col gap-4 md:flex-row">
        <InfoCard v-for="area in supportAreas" :key="area.title" v-bind="area" class="min-w-0 md:flex-1" />
      </div>
    </PageSection>
  </main>
</template>
