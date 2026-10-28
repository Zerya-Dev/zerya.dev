import { defineConfig } from 'vite-plus'

// Core vite config is defined in nuxt.config.ts, this is vite+ config only
export default defineConfig({
  check: { fmt: false, lint: false },
  fmt: { ignorePatterns: ['**'] },
  lint: { ignorePatterns: ['**'] },
  staged: {
    '*.{js,mjs,cjs,ts,mts,cts,vue,json,jsonc,json5,yaml,yml,md,css}': 'eslint --fix',
  },
})
