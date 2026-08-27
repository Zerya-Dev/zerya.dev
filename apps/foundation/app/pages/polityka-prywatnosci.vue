<script setup lang="ts">
useSeoMeta({
  title: 'Polityka prywatności',
  description: 'Informacje o przetwarzaniu danych osobowych przez Fundację Zerya.',
})

const sections = [
  { title: 'Administrator danych', text: 'Pełne dane administratora, adres oraz dane rejestrowe należy uzupełnić po ich formalnym potwierdzeniu.' },
  { title: 'Formularz kontaktowy', text: 'Zakres, cel, podstawa prawna i czas przechowywania danych przesyłanych w formularzu wymagają zatwierdzenia przed uruchomieniem wysyłki do serwera.' },
  { title: 'Prawa użytkownika', text: 'Finalny dokument powinien opisywać prawa osób, których dane dotyczą, oraz właściwy kanał realizacji tych praw.' },
  { title: 'Pliki cookies i usługi zewnętrzne', text: 'Należy wskazać faktycznie używane mechanizmy analityczne, osadzone treści i zewnętrzne zasoby. Obecna implementacja nie dodaje narzędzi analitycznych.' },
]
</script>

<template>
  <main id="main-content">
    <PageHero label="Dokumenty" title="Polityka prywatności" description="Miejsce na zatwierdzone informacje o przetwarzaniu danych i prawach użytkowników." />
    <PageSection color="bg-canvas" width="narrow">
      <div class="rounded-md border border-slate-200 bg-white p-8 md:p-12">
        <DocumentNotice icon="i-lucide-shield-check" title="Treść wymaga weryfikacji prawnej" description="Nie publikujemy wymyślonych danych formalnych. Poniższa struktura wskazuje zakres informacji do uzupełnienia przed uruchomieniem produkcyjnym." />
        <div class="mt-10 divide-y divide-slate-200">
          <section v-for="section in sections" :key="section.title" class="py-8 first:pt-0 last:pb-0">
            <h2 class="text-2xl font-extrabold">
              {{ section.title }}
            </h2>
            <p class="mt-3 leading-7 text-slate-500">
              {{ section.text }}
            </p>
          </section>
        </div>
        <UButton to="/kontakt" color="primary" size="xl" class="mt-10 rounded-md px-6 font-bold text-space">
          Kontakt w sprawie danych
        </UButton>
      </div>
    </PageSection>
  </main>
</template>
