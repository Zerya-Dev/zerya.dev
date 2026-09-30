<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'
import { FetchError } from 'ofetch'

const { source = 'website' } = defineProps<{ source?: string }>()
const open = defineModel<boolean>('open', { default: false })
const form = reactive({ email: '', message: '', website: '' })
const startedAt = ref(0)
const sent = ref(false)
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

const location = useBrowserLocation()
watch(() => location.value.hash, (hash) => {
  if (hash === '#kontakt')
    open.value = true
}, { immediate: true })

watch(open, (isOpen) => {
  if (isOpen)
    startedAt.value = Date.now()
}, { immediate: true })

function afterLeave() {
  if (sent.value) {
    Object.assign(form, { email: '', message: '', website: '' })
    sent.value = false
  }
  errorMessage.value = ''
}

async function submit({ data }: FormSubmitEvent<ContactForm>) {
  errorMessage.value = ''
  const payload = { ...data, source, startedAt: startedAt.value }
  try {
    await until(turnstileToken).toBeTruthy({ timeout: 15_000, throwOnTimeout: true })
    await $fetch('/api/contact', { method: 'POST', body: { ...payload, turnstileToken: turnstileToken.value } })
    sent.value = true
  } catch (error) {
    const code = error instanceof FetchError ? error.statusCode : undefined
    errorMessage.value = code === 429
      ? 'Za dużo wiadomości naraz. Spróbuj za kilka minut.'
      : code === 403
        ? 'Nie udało się potwierdzić, że nie jesteś botem. Spróbuj ponownie.'
        : 'Coś poszło nie tak. Spróbuj ponownie albo napisz na kontakt@zerya.dev.'
  } finally {
    turnstileToken.value = ''
    turnstile.value?.reset()
  }
}
</script>

<template>
  <UModal
    v-model:open="open"
    :title="sent ? 'Dzięki, mamy to.' : 'Porozmawiajmy'"
    :description="sent ? `Odpiszemy na ${form.email}. Do usłyszenia!` : 'Zostaw maila i napisz, o co chodzi. Odpisujemy w ciągu jednego dnia roboczego.'"
    @after:leave="afterLeave"
  >
    <slot />

    <template #body>
      <div v-if="sent" class="flex items-center gap-3" role="status">
        <UIcon name="i-lucide-circle-check" class="size-10 shrink-0 text-mint" />
        <p class="text-sm text-paper/60">
          Wiadomość została wysłana.
        </p>
      </div>

      <UForm v-else :schema="contactFormSchema" :state="form" class="space-y-7" novalidate @submit="submit">
        <UFormField name="email" label="E-mail" :ui="{ label: 'sr-only' }">
          <UInput
            v-model="form.email" type="email" autocomplete="email" placeholder="twoj@email.pl"
            variant="none" size="xl" required
          />
        </UFormField>

        <UFormField name="message" label="Wiadomość" :ui="{ label: 'sr-only' }">
          <UTextarea
            v-model="form.message" :rows="3" placeholder="O co chodzi?" maxlength="5000"
            variant="none" size="xl" required :ui="{ base: 'min-h-24 resize-none' }"
          />
        </UFormField>

        <div class="sr-only" aria-hidden="true">
          <label>Strona www <input
            v-model="form.website" type="text" name="website" tabindex="-1" autocomplete="off"
          ></label>
        </div>

        <NuxtTurnstile
          v-show="turnstileInteractive" ref="turnstile" v-model="turnstileToken"
          :options="turnstileOptions"
        />

        <div class="space-y-3">
          <UButton type="submit" variant="outline" size="xl" block loading-auto label="Wyślij" trailing-icon="i-lucide-arrow-right" />
          <p v-if="errorMessage" role="alert" class="text-sm text-riso-yellow">
            {{ errorMessage }}
          </p>
          <p class="text-xs leading-relaxed text-paper/35">
            Użyjemy Twoich danych tylko, żeby odpowiedzieć na tę wiadomość.
          </p>
        </div>
      </UForm>
    </template>
  </UModal>
</template>
