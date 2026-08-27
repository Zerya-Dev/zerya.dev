<script setup lang="ts">
import type { FormError } from '@nuxt/ui'

const submitted = ref(false)

const subjects = [
  'Partnerstwo i sponsoring',
  'Projekty edukacyjne',
  'Kontakt ogólny',
]

const fields = reactive({
  name: '',
  email: '',
  organization: '',
  subject: '',
  message: '',
})

function validate(state: typeof fields): FormError[] {
  const errors: FormError[] = []
  if (!state.name.trim()) {
    errors.push({ name: 'name', message: 'Podaj imię i nazwisko.' })
  }
  if (!state.email.includes('@') || !state.email.includes('.')) {
    errors.push({ name: 'email', message: 'Podaj poprawny adres e-mail.' })
  }
  if (!state.subject) {
    errors.push({ name: 'subject', message: 'Wybierz temat wiadomości.' })
  }
  if (state.message.trim().length < 10) {
    errors.push({ name: 'message', message: 'Wiadomość powinna mieć co najmniej 10 znaków.' })
  }
  return errors
}

function submitForm() {
  submitted.value = true
  Object.assign(fields, {
    name: '',
    email: '',
    organization: '',
    subject: '',
    message: '',
  })
}
</script>

<template>
  <UForm :state="fields" :validate="validate" class="grid gap-4" @submit="submitForm">
    <div class="grid grid-cols-2 gap-x-4 gap-y-4 max-md:grid-cols-1">
      <UFormField label="Imię i nazwisko" name="name" required>
        <UInput v-model="fields.name" type="text" autocomplete="name" placeholder="Jan Kowalski" size="xl" class="w-full" @update:model-value="submitted = false" />
      </UFormField>
      <UFormField label="E-mail" name="email" required>
        <UInput v-model="fields.email" type="email" autocomplete="email" placeholder="jan@organizacja.pl" size="xl" class="w-full" @update:model-value="submitted = false" />
      </UFormField>
      <UFormField label="Organizacja" name="organization">
        <UInput v-model="fields.organization" type="text" autocomplete="organization" placeholder="Nazwa organizacji" size="xl" class="w-full" />
      </UFormField>
      <UFormField label="Temat" name="subject" required>
        <USelect v-model="fields.subject" :items="subjects" placeholder="Wybierz temat" size="xl" class="w-full" @update:model-value="submitted = false" />
      </UFormField>
    </div>
    <UFormField label="Wiadomość" name="message" required>
      <UTextarea v-model="fields.message" :rows="5" placeholder="Jak możemy wspólnie działać?" size="xl" class="w-full" @update:model-value="submitted = false" />
    </UFormField>
    <div class="flex items-center gap-4 max-md:flex-col max-md:items-start">
      <UButton type="submit" color="primary" size="xl" class="min-h-12 rounded-md px-6 font-bold text-space max-md:w-full max-md:justify-center">
        Wyślij wiadomość
      </UButton>
      <p v-if="submitted" class="m-0 text-xs font-bold text-zerya-700" role="status">
        Dziękujemy. Formularz demonstracyjny został poprawnie zweryfikowany.
      </p>
    </div>
    <p class="text-xs leading-5 text-slate-500">
      Wysłanie formularza nie przekazuje jeszcze danych do serwera. Przed uruchomieniem integracji sprawdź
      <NuxtLink to="/polityka-prywatnosci" class="font-bold text-zerya-700">
        politykę prywatności
      </NuxtLink>.
    </p>
  </UForm>
</template>
