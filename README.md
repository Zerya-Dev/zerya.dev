# Zerya websites

This pnpm workspace contains two Nuxt applications and a shared Nuxt layer:

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
pnpm install
```

## Development Server

Start both websites on `http://localhost:3000` and `http://localhost:3001`:

```bash
pnpm dev
```

Start either website independently:

```bash
pnpm company:dev
pnpm foundation:dev
```

## Production

Build both applications for production:

```bash
pnpm build
```

Build one application independently:

```bash
pnpm company:build
pnpm foundation:build
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
