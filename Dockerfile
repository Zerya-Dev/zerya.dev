FROM imbios/bun-node:1.3.10-current-alpine AS base
WORKDIR /app

FROM base AS prerelease
ARG APP=company

COPY package.json bun.lock bunfig.toml ./
COPY apps/company/package.json ./apps/company/
COPY apps/foundation/package.json ./apps/foundation/
COPY packages/shared/package.json ./packages/shared/

RUN bun install --frozen-lockfile --ignore-scripts

COPY . .

RUN bun run ${APP}:build

FROM base AS release
ARG APP=company

COPY --from=prerelease /app/node_modules node_modules
COPY --from=prerelease /app/apps/${APP}/.output .output
COPY --from=prerelease /app/package.json .

EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]
