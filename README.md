# Zerya websites

This Bun workspace contains two Nuxt applications and a shared Nuxt layer:

```text
apps/
├── company/      # zerya.dev
└── foundation/   # foundation.zerya.dev
packages/
└── shared/       # shared Nuxt layer
```

## Setup

Make sure to install the dependencies:

```bash
bun install
```

## Development Server

Start both websites on `http://localhost:3000` and `http://localhost:3001`:

```bash
bun run dev
```

Start either website independently:

```bash
bun run company:dev
bun run foundation:dev
```

## Production

Build both applications for production:

```bash
bun run build
```

Build one application independently:

```bash
bun run company:build
bun run foundation:build
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
