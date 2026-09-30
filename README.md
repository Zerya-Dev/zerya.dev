# zerya.dev

Nuxt 4 + Nuxt UI 4 + Tailwind 4. The contact form sends mail through [Resend](https://resend.com). Nuxt UI provides the UI components, icons, and locally served Geist, Geist Mono, and Outfit fonts.

```bash
cp .env.example .env   # set NUXT_RESEND_API_KEY
bun install
bun dev
```

`bun lint`, `bun run typecheck` and `bun run build` check the project. Production image: `docker build -t zerya-dev .` (needs `NUXT_RESEND_API_KEY` at runtime).
