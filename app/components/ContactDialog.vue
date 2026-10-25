<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'

const ERROR_MESSAGES: Record<number, string> = {
  403: 'Nie udało się potwierdzić, że nie jesteś botem. Spróbuj ponownie.',
  429: 'Za dużo wiadomości naraz. Spróbuj za kilka minut.',
  503: `Wysyłka jest chwilowo niedostępna. Spróbuj później albo napisz na ${CONTACT_EMAIL}.`,
}

const { isOpen, source, open } = useContactDialog()
const form = reactive({ email: '', message: '', url: '' })
const sent = ref(false)
const pending = ref(false)
const errorMessage = ref('')
const turnstile = useTemplateRef('turnstile')
const turnstileToken = ref('')
const turnstileInteractive = ref(false)

const turnstileOptions = {
  'action': 'contact',
  'appearance': 'interaction-only',
  'theme': 'dark',
  'language': 'pl',
  'refresh-expired': 'auto',
  'expired-callback': () => turnstileToken.value = '',
  'before-interactive-callback': () => turnstileInteractive.value = true,
  'after-interactive-callback': () => turnstileInteractive.value = false,
} as const

const route = useRoute()
watch(() => route.hash, (hash) => {
  if (hash === '#kontakt')
    open()
}, { immediate: true })

function afterLeave() {
  if (sent.value) {
    Object.assign(form, { email: '', message: '', url: '' })
    sent.value = false
  }
  errorMessage.value = ''
  turnstileToken.value = ''
  turnstileInteractive.value = false
}

async function submit({ data }: FormSubmitEvent<ContactForm>) {
  errorMessage.value = ''
  pending.value = true
  try {
    try {
      await until(turnstileToken).toBeTruthy({ timeout: 15_000, throwOnTimeout: true })
    } catch {
      errorMessage.value = 'Nie udało się załadować weryfikacji. Sprawdź połączenie i spróbuj ponownie.'
      return
    }
    await $fetch('/api/contact', {
      method: 'POST',
      body: { ...data, source: source.value, url: form.url, turnstileToken: turnstileToken.value },
      timeout: 30_000,
      retry: 0,
    })
    form.email = data.email
    sent.value = true
  } catch (error) {
    const code = (error as { statusCode?: number }).statusCode ?? 0
    errorMessage.value = ERROR_MESSAGES[code] ?? `Nie otrzymaliśmy potwierdzenia wysłania. Jeśli problem się powtarza, napisz na ${CONTACT_EMAIL}.`
  } finally {
    pending.value = false
    turnstileToken.value = ''
    turnstile.value?.reset()
  }
}
</script>

<template>
  <UModal
    v-model:open="isOpen"
    :dismissible="!pending"
    :close="{ disabled: pending }"
    :title="sent ? 'Dzięki, mamy to.' : 'Porozmawiajmy'"
    :description="sent ? `Odpiszemy na ${form.email}. Do usłyszenia!` : 'Zostaw maila i napisz, o co chodzi. Odpisujemy w ciągu jednego dnia roboczego.'"
    @after:leave="afterLeave"
  >
    <template #body>
      <div v-if="sent" class="flex items-center gap-3" role="status">
        <UIcon name="i-lucide-circle-check" class="size-6 shrink-0 text-aurora" />
        <p class="text-base text-paper/65">
          Wiadomość została wysłana.
        </p>
      </div>

      <UForm v-else :schema="contactFormSchema" :state="form" class="space-y-8" novalidate @submit="submit">
        <UFormField name="email" label="E-mail">
          <UInput
            v-model="form.email" type="email" autocomplete="email" placeholder="twoj@email.pl" maxlength="254"
            variant="none" size="xl" required
          />
        </UFormField>

        <UFormField name="message" label="Wiadomość">
          <UTextarea
            v-model="form.message" :rows="3" placeholder="O co chodzi?" maxlength="5000"
            variant="none" size="xl" required :ui="{ base: 'min-h-24 resize-none' }"
          />
        </UFormField>

        <div class="sr-only" aria-hidden="true">
          <label>Strona www <input
            v-model="form.url" type="text" name="url" tabindex="-1" autocomplete="off" maxlength="254"
          ></label>
        </div>

        <NuxtTurnstile
          v-show="turnstileInteractive" ref="turnstile" v-model="turnstileToken"
          :options="turnstileOptions"
        />

        <div class="space-y-4 pt-2">
          <div class="flex flex-wrap items-center gap-x-6 gap-y-4">
            <UButton type="submit" color="neutral" size="xl" :loading="pending" label="Wyślij" trailing-icon="i-lucide-arrow-right" />
            <UButton :to="`mailto:${CONTACT_EMAIL}`" :label="CONTACT_EMAIL" color="neutral" variant="link" class="p-0" />
          </div>
          <p v-if="errorMessage" role="alert" class="text-sm text-ember">
            {{ errorMessage }}
          </p>
          <p class="text-xs leading-relaxed text-dimmed">
            Użyjemy Twoich danych tylko, żeby odpowiedzieć na tę wiadomość.
          </p>
        </div>
      </UForm>
    </template>
  </UModal>
</template>
