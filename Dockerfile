ARG APP=company

FROM node:24-alpine AS build
WORKDIR /app
ARG APP

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/company/package.json ./apps/company/
COPY apps/foundation/package.json ./apps/foundation/
COPY packages/shared/package.json ./packages/shared/

RUN corepack enable && pnpm install --frozen-lockfile --ignore-scripts

COPY . .

RUN pnpm --filter "@zerya/${APP}" run postinstall
RUN pnpm --filter "@zerya/${APP}" run build

FROM node:24-alpine AS runtime
WORKDIR /app
ARG APP

ENV NODE_ENV=production
ENV PORT=3000
COPY --from=build /app/apps/${APP}/.output ./.output

EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]
