# zerya.dev

Nuxt 4, Nuxt UI 4 and Tailwind 4. The contact form sends mail through [Resend](https://resend.com) and uses [Cloudflare Turnstile](https://developers.cloudflare.com/turnstile/), a honeypot and a per-IP rate limit.

Use Node 24.19+ and the Bun version from `.bun-version`.

```bash
cp .env.example .env
# Set NUXT_RESEND_API_KEY to send mail locally; Turnstile uses test keys in dev.
bun install
bun dev
```

Checks:

```bash
bun lint
bun run build
bun run test --run
bunx playwright install chromium
bun run test:e2e
```

Unit tests run in the Nuxt Vitest environment. Browser tests use `@nuxt/test-utils/playwright`, which builds and starts the app itself. They mock the external CAPTCHA and contact API; they do not send email.

## Deployment

Fill in the real Turnstile public key, secret and Resend key in `.env`, then run:

```bash
docker compose up --build -d
```

Compose requires all three keys and passes optional `NUXT_CONTACT_*` overrides from `.env`. The public Turnstile key is embedded during build, so changing it requires rebuilding the image. Resend and the Turnstile secret are read at runtime.

The server listens on port 3000. Put a reverse proxy in front of it and limit request body size there (e.g. `client_max_body_size 32k` for `/api/contact`); the app does not cap it. By default, client identification uses the direct socket address and ignores forwarded IP headers. To distinguish clients behind a proxy, set `NUXT_CONTACT_TRUSTED_PROXY_IPS` to a JSON array of exact proxy socket addresses (e.g. `'["172.18.0.1"]'`), and configure those proxies to overwrite `X-Forwarded-For` with the client's IP. Without this setting, clients behind a proxy share its limit. The in-process limit applies to each server process independently; multiple replicas need a per-client limit at the proxy as well.

Turnstile responses must match the `contact` action and `zerya.dev` or `www.zerya.dev`. Set `NUXT_CONTACT_ALLOWED_HOSTNAMES` to a JSON array of hostnames for another deployment. `NUXT_CONTACT_TO` and `NUXT_CONTACT_FROM` optionally override delivery settings; `{tag}` in the recipient is replaced with the form source.
