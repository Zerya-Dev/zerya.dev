# Zerya websites

This Vite+ (pnpm) workspace contains two Nuxt applications and a shared Nuxt layer:

```text
apps/
├── company/      # zerya.dev
└── foundation/   # foundation.zerya.dev
packages/
└── base/       # shared Nuxt layer
```

## Setup

Make sure to install the dependencies:

```bash
vp install
```

## Development Server

Start both websites on `http://localhost:3000` and `http://localhost:3001`:

```bash
vp run dev
```

Start either website independently:

```bash
vp run @zerya/company#dev
vp run @zerya/foundation#dev
```

## Production

Build both applications for production:

```bash
vp run build
```

Build one application independently:

```bash
vp run @zerya/company#build
vp run @zerya/foundation#build
```

Any other package script runs the same way, e.g. `vp run @zerya/company#test:e2e`.

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
