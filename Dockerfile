ARG APP=company

FROM oven/bun:1.3.10-alpine AS build
WORKDIR /app
ARG APP

COPY package.json bun.lock bunfig.toml ./
COPY apps/company/package.json ./apps/company/
COPY apps/foundation/package.json ./apps/foundation/
COPY packages/shared/package.json ./packages/shared/

RUN bun install --frozen-lockfile --ignore-scripts

COPY . .

RUN bun run --filter "@zerya/${APP}" build

FROM node:24-alpine AS runtime
WORKDIR /app
ARG APP

ENV NODE_ENV=production
ENV PORT=3000
COPY --from=build /app/apps/${APP}/.output ./.output

EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]
