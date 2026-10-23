<script setup lang="ts">
const contactDialog = useContactDialog()

interface Case {
  name: string
  to: string
  domain: string
  meta: string[]
  problem: string
  solution: string
  facts: { value: string, label: string }[]
}

const cases: Case[] = [
  {
    ...PROJECT_LINKS.motoq,
    meta: ['System obiegu faktur', '2025', '.NET', 'Wolverine', 'SQL Server', 'Nuxt'],
    problem: '„Systemów do obiegu faktur jest dużo. Żaden nie pasuje do tego, jak pracuje salon i serwis.”',
    solution: 'Obieg faktur zakupowych zbudowany tylko dla salonów i serwisów. Nie zastępuje ich programów, tylko się do nich dopina. Pobiera faktury z AutoStacji, prowadzi je przez akceptację i przygotowuje dane dla Symfonii.',
    facts: [
      { value: '1 zł', label: 'netto za fakturę, bez abonamentu' },
      { value: '4', label: 'kroki wdrożenia na serwerze klienta' },
    ],
  },
  {
    ...PROJECT_LINKS.hack4krak,
    meta: ['Platforma CTF', '2025', 'Rust', 'Actix Web', 'PostgreSQL', 'Nuxt'],
    problem: '„Konkursy CTF są, ale każdy zakłada, że już coś umiesz. Nie ma gdzie zacząć.”',
    solution: 'Platforma CTF dla uczniów szkół podstawowych i średnich, z zadaniami dopasowanymi do ich poziomu. Wokół niej wyrosła społeczność i baza pod większe projekty z cyberbezpieczeństwa. Kod platformy jest otwarty.',
    facts: [
      { value: '300+', label: 'uczestników trzech edycji' },
      { value: '30+', label: 'wolontariuszy przy ostatniej edycji' },
      { value: '4', label: 'kraje w edycji 2027' },
    ],
  },
]

// Commissioned work, as opposed to the products above which are our own
const services = [
  {
    title: 'Procesy, które wyrosły z gotowca',
    body: 'Za specyficzne na Excela albo pudełkowy system. Budujemy software pod Twój realny proces, z wyjątkami i wszystkim.',
  },
  {
    title: 'Systemy, które nie gadają ze sobą',
    body: 'KSeF, DMS, ERP, CMS, pliki, API. Łączymy to, co dziś ktoś przepisuje ręcznie, w jeden obieg.',
  },
  {
    title: 'Produkty od MVP do produkcji',
    body: 'Pomysł albo kod po kimś, który nie wytrzymuje realnych użytkowników. Doprowadzamy do stanu, w którym po prostu działa.',
  },
]

// The cubes in the background open on MOTOQ and move on a stage with each later case and the commissioned work
const rows = useTemplateRef<HTMLElement[]>('rows')
const commissioned = useTemplateRef('commissioned')
const cubeAnchors = () => [...(rows.value ?? []).slice(1), commissioned.value].filter(Boolean) as HTMLElement[]
</script>

<template>
  <section class="relative bg-night">
    <CasesCubes :anchors="cubeAnchors" />
    <div class="relative mx-auto w-full max-w-[1328px] px-6 py-16 md:px-16 md:py-32">
      <p class="text-xs font-medium text-paper/55">
        Nasze projekty
      </p>
      <h2 class="mt-4 text-[28px]/[36px] font-medium tracking-[-0.02em] md:text-[36px]/[44px] xl:text-[48px]/[56px]">
        Problemy, które rozwiązujemy.
      </h2>

      <ol class="mt-10 border-t border-paper/10 md:mt-24">
        <li v-for="(item, i) in cases" ref="rows" :key="item.name" class="border-b border-paper/10 py-12 md:py-24">
          <div class="flex flex-wrap items-baseline gap-x-4 gap-y-2">
            <span class="font-mono text-xs text-dimmed">{{ String(i + 1).padStart(2, '0') }}</span>
            <h3 class="text-[22px]/[28px] font-medium tracking-tight">
              {{ item.name }}
            </h3>
            <!-- Phones keep what it is and when, the stack only shows on wider screens -->
            <p class="w-full font-mono text-xs text-dimmed md:w-auto">
              {{ item.meta.slice(0, 2).join(' · ') }}<span class="hidden md:inline"> · {{ item.meta.slice(2).join(' · ') }}</span>
            </p>
            <a :href="item.to" target="_blank" class="group inline-flex items-center gap-1 text-sm text-paper/65 hover:text-paper md:ml-auto">
              {{ item.domain }}
              <UIcon name="i-lucide-arrow-up-right" class="size-4 motion-safe:transition-transform motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5" />
            </a>
          </div>

          <!-- The problem carries the row: the client's voice at full size -->
          <p class="mt-6 font-heading text-[24px]/[32px] font-medium tracking-[-0.02em] text-balance md:mt-12 md:w-10/12 md:text-[36px]/[44px] xl:text-[48px]/[56px]">
            <span class="sr-only">Problem: </span>{{ item.problem }}
          </p>

          <div class="mt-8 grid gap-8 md:mt-16 md:grid-cols-12 md:gap-6">
            <div class="md:col-span-5">
              <p class="text-xs font-medium text-dimmed">
                Co zbudowaliśmy
              </p>
              <p class="mt-2 text-base text-paper/75 md:text-lg/7">
                {{ item.solution }}
              </p>
            </div>

            <dl class="grid grid-cols-3 gap-x-4 self-start md:col-span-6 md:col-start-7 md:gap-x-6">
              <div v-for="fact in item.facts" :key="fact.label" class="flex flex-col-reverse justify-end gap-1">
                <dt class="text-xs text-paper/55 md:text-sm">
                  {{ fact.label }}
                </dt>
                <dd class="font-mono text-2xl tracking-tight text-paper md:text-[32px]/[40px]">
                  {{ fact.value }}
                </dd>
              </div>
            </dl>
          </div>
        </li>
      </ol>

      <div ref="commissioned" class="mt-16 md:mt-32">
        <p class="text-xs font-medium text-dimmed">
          Na zamówienie
        </p>
        <h3 class="mt-4 text-[22px]/[28px] font-medium tracking-tight md:text-[28px]/[36px]">
          Inne problemy, które rozwiązujemy
        </h3>
        <p class="mt-4 max-w-[52ch] text-base text-paper/75 md:text-lg/7">
          Najmocniejsi jesteśmy tam, gdzie błąd kosztuje: e-faktury, integracje księgowe, dane co do grosza. Ale spinamy
          też prostsze rzeczy.
        </p>

        <ul class="mt-8 grid gap-8 border-t border-paper/10 pt-8 md:mt-12 md:grid-cols-3 md:gap-6 md:pt-10">
          <li v-for="service in services" :key="service.title">
            <h4 class="text-base font-medium">
              {{ service.title }}
            </h4>
            <p class="mt-2 max-w-[40ch] text-base text-paper/65">
              {{ service.body }}
            </p>
          </li>
        </ul>
      </div>

      <div class="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 md:mt-16">
        <p class="text-lg/7 text-paper/75">
          Masz podobny problem?
        </p>
        <UButton color="neutral" size="xl" label="Porozmawiajmy" trailing-icon="i-lucide-arrow-right" @click="contactDialog.open('cases')" />
      </div>
    </div>
  </section>
</template>
