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

// Scroll progress of each problem sentence as `--gone`: 0 while it sits in the lower two thirds
// of the screen, 1 as it leaves at the top. It is read first and dissolves only on its way out.
const problems = useTemplateRef<HTMLElement[]>('problems')
const { y } = useWindowScroll()
const { height } = useWindowSize()
const reducedMotion = usePreferredReducedMotion()

watch([problems, y, height, reducedMotion], () => {
  if (reducedMotion.value === 'reduce')
    return
  const vh = height.value || 1
  for (const problem of problems.value ?? []) {
    const progress = Math.min(Math.max((vh * 0.35 - problem.getBoundingClientRect().top) / (vh * 0.3), 0), 1)
    problem.style.setProperty('--gone', progress.toFixed(3))
  }
})
</script>

<template>
  <section class="bg-night">
    <div class="mx-auto w-full max-w-[1328px] px-6 py-24 md:px-16 md:py-32">
      <p class="text-xs font-medium text-paper/55">
        Nasze projekty
      </p>
      <h2 class="mt-4 text-[28px]/[36px] font-medium tracking-[-0.02em] md:text-[36px]/[44px] xl:text-[48px]/[56px]">
        Problemy, które rozwiązujemy.
      </h2>

      <ol class="mt-16 border-t border-paper/10 md:mt-24">
        <li v-for="(item, i) in cases" :key="item.name" class="border-b border-paper/10 py-16 md:py-24">
          <div class="flex flex-wrap items-baseline gap-x-4 gap-y-2">
            <span class="font-mono text-xs text-dimmed">{{ String(i + 1).padStart(2, '0') }}</span>
            <h3 class="text-[22px]/[28px] font-medium tracking-tight">
              {{ item.name }}
            </h3>
            <p class="w-full font-mono text-xs text-dimmed md:w-auto">
              {{ item.meta.join(' · ') }}
            </p>
            <a :href="item.to" target="_blank" class="group inline-flex items-center gap-1 text-sm text-paper/65 hover:text-paper md:ml-auto">
              {{ item.domain }}
              <UIcon name="i-lucide-arrow-up-right" class="size-4 motion-safe:transition-transform motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5" />
            </a>
          </div>

          <!-- The problem carries the row: the client's voice at full size, dissolving into raster on the way out -->
          <p ref="problems" class="case-problem halftone mt-8 font-heading text-[28px]/[36px] font-medium tracking-[-0.02em] text-balance md:mt-12 md:w-10/12 md:text-[36px]/[44px] xl:text-[48px]/[56px]">
            <span class="sr-only">Problem: </span>{{ item.problem }}
          </p>

          <div class="mt-12 grid gap-12 md:mt-16 md:grid-cols-12 md:gap-6">
            <div class="md:col-span-5">
              <p class="text-xs font-medium text-dimmed">
                Co zbudowaliśmy
              </p>
              <p class="mt-2 text-lg/7 text-paper/75">
                {{ item.solution }}
              </p>
            </div>

            <dl class="grid grid-cols-2 gap-x-6 gap-y-8 self-start md:col-span-6 md:col-start-7 lg:grid-cols-3">
              <div v-for="fact in item.facts" :key="fact.label" class="flex flex-col-reverse justify-end gap-1">
                <dt class="text-sm text-paper/55">
                  {{ fact.label }}
                </dt>
                <dd class="font-mono text-[32px]/[40px] tracking-tight text-paper">
                  {{ fact.value }}
                </dd>
              </div>
            </dl>
          </div>
        </li>
      </ol>

      <div class="mt-24 md:mt-32">
        <p class="text-xs font-medium text-dimmed">
          Na zamówienie
        </p>
        <h3 class="mt-4 text-[22px]/[28px] font-medium tracking-tight md:text-[28px]/[36px]">
          Inne problemy, które rozwiązujemy
        </h3>
        <p class="mt-4 max-w-[52ch] text-lg/7 text-paper/75">
          Najmocniejsi jesteśmy tam, gdzie błąd kosztuje: e-faktury, integracje księgowe, dane co do grosza. Ale spinamy
          też prostsze rzeczy.
        </p>

        <ul class="mt-12 grid gap-10 border-t border-paper/10 pt-10 md:grid-cols-3 md:gap-6">
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

      <div class="mt-16 flex flex-wrap items-center gap-x-8 gap-y-4">
        <p class="text-lg/7 text-paper/75">
          Masz podobny problem?
        </p>
        <UButton color="neutral" size="xl" label="Porozmawiajmy" trailing-icon="i-lucide-arrow-right" @click="contactDialog.open('cases')" />
      </div>
    </div>
  </section>
</template>

<style scoped>
@media (prefers-reduced-motion: no-preference) {
  .case-problem {
    --dot: calc(0.55 - var(--gone, 0) * 0.3);

    opacity: calc(1 - var(--gone, 0) * 0.65);
  }
}
</style>
