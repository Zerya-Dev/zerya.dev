# zerya.dev

Nuxt 4 + Nuxt UI 4 + Tailwind 4. The contact form sends mail through [Resend](https://resend.com). Nuxt UI provides the UI components, icons, and locally served Geist, Geist Mono, and Outfit fonts.

```bash
cp .env.example .env   # set NUXT_RESEND_API_KEY (Turnstile uses test keys in dev)
bun install
bun dev
```

`bun lint`, `bun run typecheck`, `bun run test --run` and `bun run build` run in CI. Production image: `docker build --build-arg NUXT_PUBLIC_TURNSTILE_SITE_KEY=... -t zerya-dev .` (needs `NUXT_RESEND_API_KEY` and `NUXT_TURNSTILE_SECRET_KEY` at runtime). Spam protection is [Cloudflare Turnstile](https://developers.cloudflare.com/turnstile/) plus a honeypot and a per-IP rate limit.
