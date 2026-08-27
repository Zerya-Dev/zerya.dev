<script setup lang="ts">
useSeoMeta({
  title: 'Statut',
  description: 'Statut Fundacji Zerya i informacje o aktualnej wersji dokumentu.',
})
</script>

<template>
  <main id="main-content">
    <PageHero label="Dokumenty" title="Statut Fundacji Zerya" description="Formalny dokument określający cele, zasady działania i strukturę fundacji." />
    <PageSection color="bg-canvas" width="wide">
      <div class="rounded-md border border-slate-200 bg-white p-8 md:p-12">
        <DocumentNotice icon="i-lucide-file-text" title="Dokument do podłączenia" description="Aktualna, zatwierdzona treść statutu nie została dostarczona do implementacji. W tym miejscu należy opublikować dokument źródłowy bez modyfikowania jego treści." />
        <div class="mt-10 grid gap-8 sm:grid-cols-2">
          <div>
            <h2 class="text-2xl font-extrabold">
              Wersja dokumentu
            </h2>
            <p class="mt-3 text-slate-500">
              Data uchwalenia i numer wersji — do uzupełnienia.
            </p>
          </div>
          <div>
            <h2 class="text-2xl font-extrabold">
              Plik PDF
            </h2>
            <p class="mt-3 text-slate-500">
              Odnośnik do podpisanego dokumentu — do uzupełnienia.
            </p>
          </div>
        </div>
      </div>
    </PageSection>
  </main>
</template>
