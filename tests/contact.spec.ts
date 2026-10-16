import { expect, test } from '@nuxt/test-utils/playwright'

test.use({
  reducedMotion: 'reduce',
  defaults: {
    nuxt: {
      nuxtConfig: {
        // Cloudflare's always-pass test key; the widget script itself is mocked below
        turnstile: { siteKey: '1x00000000000000000000AA' },
        // The regular build already type-checks the app
        typescript: { typeCheck: false },
      },
    },
  },
})

test.beforeEach(async ({ page }) => {
  await page.route('**/video/**', route => route.abort())
  await page.route('https://challenges.cloudflare.com/turnstile/v0/api.js*', route => route.fulfill({
    contentType: 'application/javascript',
    body: `window.turnstile = {
      render(element, options) {
        this.options = options;
        setTimeout(() => options.callback('browser-test-token'), 0);
        return 'test-widget';
      },
      reset() { setTimeout(() => this.options.callback('browser-test-token'), 0); },
      remove() {}
    };`,
  }))
})

test('shares the draft between contact buttons and normalizes the submitted payload', async ({ page, goto }) => {
  let payload: Record<string, unknown> | undefined
  await page.route('**/api/contact', async (route) => {
    payload = route.request().postDataJSON()
    await route.fulfill({ json: { ok: true } })
  })
  await goto('/', { waitUntil: 'hydration' })
  await page.getByRole('button', { name: 'Porozmawiajmy', exact: true }).first().click()
  await page.getByRole('textbox', { name: 'E-mail', exact: true }).fill(' draft@example.com ')
  await page.getByRole('textbox', { name: 'Wiadomość', exact: true }).fill('  Wiadomość zachowana między przyciskami.  ')
  await page.keyboard.press('Escape')
  await expect(page.getByRole('dialog')).toBeHidden()
  await expect(page.getByRole('button', { name: 'Porozmawiajmy', exact: true }).first()).toBeFocused()

  await page.getByRole('button', { name: 'Porozmawiajmy', exact: true }).nth(1).click()
  await expect(page.getByRole('textbox', { name: 'E-mail', exact: true })).toHaveValue('draft@example.com')
  await page.getByRole('button', { name: 'Wyślij', exact: true }).click()
  await expect(page.getByRole('status')).toHaveText('Wiadomość została wysłana.')
  expect(payload).toEqual({
    email: 'draft@example.com',
    message: 'Wiadomość zachowana między przyciskami.',
    source: 'cases',
    url: '',
    turnstileToken: 'browser-test-token',
  })
})

test('keeps a pending submission open and clears success before the next message', async ({ page, goto }) => {
  let releaseResponse: () => void = () => {}
  const gate = new Promise<void>(resolve => releaseResponse = resolve)
  await page.route('**/api/contact', async (route) => {
    await gate
    await route.fulfill({ json: { ok: true } })
  })
  await goto('/', { waitUntil: 'hydration' })
  await page.getByRole('button', { name: 'Porozmawiajmy', exact: true }).first().click()
  await page.getByRole('textbox', { name: 'E-mail', exact: true }).fill('hello@example.com')
  await page.getByRole('textbox', { name: 'Wiadomość', exact: true }).fill('Test obsługi odpowiedzi po wysłaniu.')
  const request = page.waitForRequest('**/api/contact')
  await page.getByRole('button', { name: 'Wyślij', exact: true }).click()
  await request
  try {
    await expect(page.getByRole('button', { name: 'Zamknij', exact: true })).toBeDisabled()
    await page.keyboard.press('Escape')
    await expect(page.getByRole('dialog')).toBeVisible()
  } finally {
    releaseResponse()
  }
  await expect(page.getByRole('status')).toHaveText('Wiadomość została wysłana.')
  await page.getByRole('button', { name: 'Zamknij', exact: true }).click()
  await expect(page.getByRole('dialog')).toBeHidden()
  await page.getByRole('button', { name: 'Porozmawiajmy', exact: true }).last().click()
  await expect(page.getByRole('dialog').getByRole('heading')).toHaveText('Porozmawiajmy')
  await expect(page.getByRole('textbox', { name: 'E-mail', exact: true })).toHaveValue('')
})

for (const [status, message] of [
  [403, 'Nie udało się potwierdzić, że nie jesteś botem.'],
  [503, 'Wysyłka jest chwilowo niedostępna.'],
  [502, 'Nie otrzymaliśmy potwierdzenia wysłania.'],
] as const) {
  test(`reports ${status} without losing the draft`, async ({ page, goto }) => {
    await page.route('**/api/contact', route => route.fulfill({ status, json: { statusCode: status } }))
    await goto('/#kontakt', { waitUntil: 'hydration' })
    await page.getByRole('textbox', { name: 'E-mail', exact: true }).fill('hello@example.com')
    await page.getByRole('textbox', { name: 'Wiadomość', exact: true }).fill('Wiadomość pozostaje po błędzie usługi.')
    await page.getByRole('button', { name: 'Wyślij', exact: true }).click()
    await expect(page.getByRole('alert')).toContainText(message)
    await expect(page.getByRole('textbox', { name: 'Wiadomość', exact: true })).toHaveValue('Wiadomość pozostaje po błędzie usługi.')
    await expect(page.getByRole('button', { name: 'Zamknij', exact: true })).toBeEnabled()
  })
}

test('keeps the logo readable and navigation inside a 320px viewport', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 })
  await page.goto('/')
  const logo = await page.locator('header img').boundingBox()
  expect(logo?.width).toBeGreaterThan(50)
  await expect(page.getByRole('link', { name: 'Kontakt', exact: true })).toBeInViewport()
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(320)
})

test.describe('without JavaScript', () => {
  test.use({ javaScriptEnabled: false })

  test('shows the headline and contact fallback', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    expect(await page.locator('.intro-line').first().evaluate(element => getComputedStyle(element).opacity)).toBe('1')
    await expect(page.getByRole('link', { name: 'kontakt@zerya.dev', exact: true }).first()).toBeVisible()
  })
})
