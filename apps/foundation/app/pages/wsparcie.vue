<script setup lang="ts">
useSeoMeta({
  title: 'Wsparcie',
  description: 'Sposoby długotrwałego wsparcia i darowizny dla Fundacji Zerya.',
})

const activePath = ref<'longTermSupport' | 'donation'>('longTermSupport')
const frequency = ref<'once' | 'recurring'>('once')

const supportAreas = [
  { title: 'Program', description: 'Zadania, mentoring i materiały edukacyjne.', icon: 'i-lucide-blocks' },
  { title: 'Logistyka', description: 'Przestrzeń, organizacja, sprzęt i bezpieczeństwo.', icon: 'i-lucide-map-pin' },
  { title: 'Dostępność', description: 'Zmniejszanie barier udziału w wydarzeniach.', icon: 'i-lucide-accessibility' },
]

const cooperationOptions = [
  'partnerstwo programowe lub technologiczne',
  'sponsoring konkretnego wydarzenia',
  'wsparcie rzeczowe i udostępnienie przestrzeni',
  'patronat oraz wsparcie komunikacyjne',
]
</script>

<template>
  <main id="main-content">
    <PageHero label="Wsparcie" title="Jak nas wesprzeć" description="Wybierz ścieżkę, która odpowiada Ci najbardziej. Każdą współpracę łączymy z konkretnym celem i przejrzystym zakresem." />

    <PageSection color="bg-white" label="support-path-title" spacing="bottom">
      <h2 id="support-path-title" class="sr-only">
        Wybierz sposób wsparcia
      </h2>
      <div class="grid gap-4 sm:grid-cols-2" role="group" aria-label="Rodzaj wspierającego">
        <button
          type="button"
          class="rounded-md border p-8 text-left transition md:p-10"
          :class="activePath === 'longTermSupport' ? 'border-zerya-600 bg-mint' : 'border-slate-200 bg-white hover:border-zerya-300'"
          :aria-pressed="activePath === 'longTermSupport'"
          @click="activePath = 'longTermSupport'"
        >
          <UIcon name="i-lucide-building-2" class="size-8 text-zerya-600" aria-hidden="true" />
          <strong class="mt-6 block text-2xl">Długotrwałe wsparcie</strong>
          <span class="mt-2 block leading-7 text-slate-500">Partnerstwo, sponsoring, wsparcie rzeczowe lub patronat.</span>
        </button>
        <button
          type="button"
          class="rounded-md border p-8 text-left transition md:p-10"
          :class="activePath === 'donation' ? 'border-zerya-600 bg-mint' : 'border-slate-200 bg-white hover:border-zerya-300'"
          :aria-pressed="activePath === 'donation'"
          @click="activePath = 'donation'"
        >
          <UIcon name="i-lucide-heart-handshake" class="size-8 text-zerya-600" aria-hidden="true" />
          <strong class="mt-6 block text-2xl">Darowizna</strong>
          <span class="mt-2 block leading-7 text-slate-500">Darowizna jednorazowa lub regularne wsparcie działań.</span>
        </button>
      </div>

      <div class="mt-8 overflow-hidden rounded-md bg-space text-white">
        <div v-if="activePath === 'longTermSupport'" class="grid gap-12 p-8 md:p-12 lg:grid-cols-2 lg:p-16">
          <div>
            <p class="text-sm font-extrabold tracking-widest text-zerya-400 uppercase">
              Długotrwałe wsparcie
            </p>
            <h2 class="mt-4 text-4xl font-extrabold tracking-tighter md:text-5xl">
              Współpraca z jasnym celem
            </h2>
            <p class="mt-6 leading-7 text-slate-300">
              Najpierw ustalamy efekt dla uczestników, następnie zakres partnerstwa, odpowiedzialności i sposób pokazania wkładu partnera.
            </p>
            <UButton to="/kontakt" color="primary" size="xl" class="mt-8 rounded-md px-6 font-bold text-space">
              Porozmawiajmy <UIcon name="i-lucide-arrow-right" class="size-4" aria-hidden="true" />
            </UButton>
          </div>
          <div>
            <p class="font-bold">
              Możliwe formy współpracy
            </p>
            <ul class="mt-6 grid gap-3">
              <li v-for="option in cooperationOptions" :key="option" class="flex gap-3 rounded-md bg-white/5 p-4 text-slate-200">
                <UIcon name="i-lucide-check" class="mt-1 size-5 shrink-0 text-zerya-400" aria-hidden="true" />
                {{ option }}
              </li>
            </ul>
          </div>
        </div>

        <div v-else class="grid gap-12 p-8 md:p-12 lg:grid-cols-2 lg:p-16">
          <div>
            <p class="text-sm font-extrabold tracking-widest text-zerya-400 uppercase">
              Darowizna
            </p>
            <h2 class="mt-4 text-4xl font-extrabold tracking-tighter md:text-5xl">
              Regularnie lub jednorazowo
            </h2>
            <p class="mt-6 leading-7 text-slate-300">
              Każde wsparcie pomaga rozwijać program, przygotować bezpieczne wydarzenie i zmniejszać bariery udziału.
            </p>
          </div>
          <div>
            <p class="font-bold">
              Wybierz częstotliwość
            </p>
            <div class="mt-4 grid grid-cols-2 gap-2" role="group" aria-label="Częstotliwość wsparcia">
              <UButton :color="frequency === 'once' ? 'primary' : 'neutral'" :variant="frequency === 'once' ? 'solid' : 'outline'" class="justify-center rounded-md font-bold" :aria-pressed="frequency === 'once'" @click="frequency = 'once'">
                Jednorazowo
              </UButton>
              <UButton :color="frequency === 'recurring' ? 'primary' : 'neutral'" :variant="frequency === 'recurring' ? 'solid' : 'outline'" class="justify-center rounded-md font-bold" :aria-pressed="frequency === 'recurring'" @click="frequency = 'recurring'">
                Cyklicznie
              </UButton>
            </div>
            <p class="mt-6 rounded-md bg-white/5 p-4 text-sm leading-6 text-slate-300">
              Moduł płatności i dane do przelewu zostaną podłączone po zatwierdzeniu formalnych danych fundacji.
            </p>
            <UButton to="/kontakt" color="primary" size="xl" class="mt-6 rounded-md px-6 font-bold text-space">
              Wesprzyj <UIcon name="i-lucide-arrow-right" class="size-4" aria-hidden="true" />
            </UButton>
          </div>
        </div>
      </div>
    </PageSection>

    <PageSection color="bg-mint" label="funding-title">
      <SectionHeader label="Konkretny cel" title="Co finansuje wsparcie" title-id="funding-title" />
      <div class="grid gap-4 md:grid-cols-3">
        <InfoCard v-for="area in supportAreas" :key="area.title" v-bind="area" />
      </div>
    </PageSection>
  </main>
</template>
