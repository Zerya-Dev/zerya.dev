<script setup lang="ts">

type Status = 'idle' | 'sending' | 'sent' | 'error'

// Ends up in the recipient address: contact+<source>@zerya.dev.
const { source = 'website' } = defineProps<{ source?: string }>()

const open = defineModel<boolean>('open', { default: false })

const form = reactive({ email: '', message: '', website: '' })
const startedAt = ref(0)
const status = ref<Status>('idle')
const errors = ref<Partial<Record<'email' | 'message', string>>>({})
const errorMessage = ref('')

// Deep link: zerya.dev/#kontakt opens the form.
onMounted(() => {
  if (location.hash === '#kontakt')
    open.value = true
})

watch(open, (isOpen) => {
  if (isOpen)
    startedAt.value = Date.now()
})

function afterLeave() {
  if (status.value === 'sent')
    reset()
}

async function submit() {
  const parsed = contactSchema.safeParse({ ...form, source, startedAt: startedAt.value })
  if (!parsed.success) {
    const fields = parsed.error.flatten().fieldErrors
    errors.value = { email: fields.email?.[0], message: fields.message?.[0] }
    return
  }
  errors.value = {}
  status.value = 'sending'

  try {
    await $fetch('/api/contact', { method: 'POST', body: parsed.data })
    status.value = 'sent'
  } catch (error: any) {
    status.value = 'error'
    errorMessage.value = error?.statusCode === 429
      ? 'Za dużo wiadomości naraz. Spróbuj za kilka minut.'
      : 'Coś poszło nie tak. Spróbuj ponownie albo napisz na kontakt@zerya.dev.'
  }
}

function reset() {
  Object.assign(form, { email: '', message: '' })
  status.value = 'idle'
}

const field = 'block w-full min-w-0 rounded-none border-0 border-b border-paper/20 bg-transparent px-0 py-2.5 text-base text-paper shadow-none outline-none placeholder:text-paper/35 focus-visible:border-mint focus-visible:ring-0 aria-invalid:border-riso-yellow aria-invalid:ring-0 md:text-base'
const modalUi = {
  overlay: 'bg-ink/70 backdrop-blur-sm',
  content: 'max-w-md divide-y-0 rounded-none border border-paper/15 bg-ink text-paper shadow-2xl shadow-black/60 ring-0',
  header: 'min-h-0 items-start px-7 pt-7 pb-0 sm:px-9 sm:pt-9',
  wrapper: 'pr-8',
  title: 'font-heading text-2xl font-normal tracking-tight text-paper',
  description: 'mt-2 text-base text-paper/55',
  close: 'top-5 right-5 cursor-pointer rounded-none text-paper/45 hover:bg-paper/10 hover:text-paper active:bg-paper/15 focus-visible:outline-mint',
  body: 'px-7 pt-7 pb-7 sm:px-9 sm:pb-9',
}
const submitButton = 'group inline-flex w-full cursor-pointer items-center justify-center gap-3 border border-mint/60 px-6 py-3 font-heading text-base font-medium tracking-tight text-mint transition-colors hover:bg-mint hover:text-ink disabled:cursor-wait disabled:opacity-60'
</script>

<template>
  <UModal
    v-model:open="open"
    :title="status === 'sent' ? 'Dzięki, mamy to.' : 'Porozmawiajmy'"
    :description="status === 'sent' ? `Odpiszemy na ${form.email}. Do usłyszenia!` : 'Zostaw maila i napisz, o co chodzi. Odpisujemy w ciągu jednego dnia roboczego.'"
    :ui="modalUi"
    @after:leave="afterLeave"
  >
    <slot />

    <template #body>
      <div v-if="status === 'sent'" class="flex items-center gap-3" role="status">
        <span class="grid size-10 shrink-0 place-items-center border border-mint/60 text-mint">
          <UIcon name="i-lucide-check" class="size-5" aria-hidden="true" />
        </span>
        <p class="text-sm text-paper/60">
          Wiadomość została wysłana.
        </p>
      </div>

      <form v-else class="space-y-7" novalidate @submit.prevent="submit">
        <label class="block">
          <span class="sr-only">E-mail</span>
          <UInput
            v-model="form.email"
            type="email"
            name="email"
            autocomplete="email"
            placeholder="twoj@email.pl"
            required
            :aria-invalid="!!errors.email"
            :aria-describedby="errors.email ? 'contact-email-error' : undefined"
            :ui="{ root: () => 'w-full', base: () => `h-8 ${field}` }"
          />
          <span
            v-if="errors.email" id="contact-email-error"
            class="mt-2 block text-sm text-riso-yellow"
          >{{ errors.email }}</span>
        </label>

        <label class="block">
          <span class="sr-only">Wiadomość</span>
          <UTextarea
            v-model="form.message"
            name="message"
            :rows="3"
            placeholder="O co chodzi?"
            required
            maxlength="5000"
            :aria-invalid="!!errors.message"
            :aria-describedby="errors.message ? 'contact-message-error' : undefined"
            :ui="{ root: () => 'w-full', base: () => `min-h-24 resize-none ${field}` }"
          />
          <span
            v-if="errors.message" id="contact-message-error"
            class="mt-2 block text-sm text-riso-yellow"
          >{{ errors.message }}</span>
        </label>

        <!-- Honeypot: hidden from people, irresistible to bots. -->
        <div class="sr-only" aria-hidden="true">
          <label>Strona www <input
            v-model="form.website" data-raw type="text" name="website" tabindex="-1"
            autocomplete="off"
          ></label>
        </div>

        <div class="space-y-3">
          <UButton
            type="submit"
            :disabled="status === 'sending'"
            :ui="{ base: () => submitButton }"
          >
            {{ status === 'sending' ? 'Wysyłam' : 'Wyślij' }}
            <UIcon
              v-if="status === 'sending'" key="u-icon-1" name="i-lucide-loader-circle"
              class="size-4 animate-spin" aria-hidden="true"
            />
            <UIcon
              v-else key="u-icon-2" name="i-lucide-arrow-right"
              class="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true"
            />
          </UButton>
          <p v-if="status === 'error'" role="alert" class="text-sm text-riso-yellow">
            {{ errorMessage }}
          </p>
          <p class="text-xs leading-relaxed text-paper/35">
            Użyjemy Twoich danych tylko, żeby odpowiedzieć na tę wiadomość.
          </p>
        </div>
      </form>
    </template>
  </UModal>
</template>
