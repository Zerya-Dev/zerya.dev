FROM imbios/bun-node:1.3.10-current-alpine AS base
WORKDIR /app

FROM base AS prerelease
COPY package.json bun.lock ./

RUN bun install --frozen-lockfile --ignore-scripts

COPY . .

RUN bun run build

FROM base AS release
COPY --from=prerelease /app/node_modules node_modules
COPY --from=prerelease /app/.output .output
COPY --from=prerelease /app/package.json .

EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]
