<script setup lang="ts">
useSeoMeta({
  title: 'Kontakt',
  description: 'Kontakt dla partnerów, mediów i osób zainteresowanych działaniami Fundacji Zerya.',
})

const contactPaths = [
  { title: 'Partnerstwa i sponsoring', description: 'Współpraca projektowa, sponsoring i wsparcie rzeczowe.', person: 'Osoba odpowiedzialna — do uzupełnienia', email: 'foundation@zerya.dev', icon: 'i-lucide-handshake' },
  { title: 'Kontakt ogólny', description: 'Pytania o fundację, wydarzenia i udział w działaniach.', person: 'Zespół Fundacji Zerya', email: 'foundation@zerya.dev', icon: 'i-lucide-mail' },
  { title: 'Media i patronaty', description: 'Materiały prasowe, patronaty i zapytania medialne.', person: 'Osoba odpowiedzialna — do uzupełnienia', email: 'foundation@zerya.dev', icon: 'i-lucide-megaphone' },
]
</script>

<template>
  <main id="main-content">
    <PageHero label="Kontakt" title="Skontaktuj sie z nami" description="Wybierz temat lub skorzystaj z formularza. Wiadomość skierujemy do osoby odpowiedzialnej za dany obszar." />

    <PageSection color="bg-canvas" label="form-title">
      <div class="grid gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <p class="text-sm font-extrabold tracking-widest text-zerya-700 uppercase">
            Formularz
          </p>
          <h2 id="form-title" class="mt-4 text-4xl font-extrabold tracking-tighter md:text-5xl">
            Opisz krótko, czego dotyczy wiadomość
          </h2>
          <p class="mt-6 max-w-xl leading-7 text-slate-500">
            Prosty formularz pomaga nam zebrać potrzebny kontekst. Nie wysyłaj w nim danych wrażliwych.
          </p>
        </div>
        <div class="rounded-md bg-white p-6 md:p-10">
          <ContactForm />
        </div>
      </div>
    </PageSection>

    <PageSection color="bg-white" label="contact-paths-title" spacing="default">
      <h2 id="contact-paths-title" class="sr-only">
        Rodzaje kontaktu
      </h2>
      <div class="grid gap-4 md:grid-cols-3">
        <div v-for="path in contactPaths" :key="path.title" class="rounded-md border border-slate-200 p-8 flex flex-col justify-between">
          <UIcon :name="path.icon" class="size-8 text-zerya-600" aria-hidden="true" />
          <h3 class="mt-6 text-2xl font-extrabold tracking-tight">
            {{ path.title }}
          </h3>
          <p class="mt-3 text-sm leading-6 text-slate-500">
            {{ path.description }}
          </p>
          <p class="mt-6 text-xs font-bold text-slate-500">
            {{ path.person }}
          </p>
          <a :href="`mailto:${path.email}`" class="mt-2 inline-block font-extrabold text-zerya-700">{{ path.email }}</a>
        </div>
      </div>
    </PageSection>
  </main>
</template>
