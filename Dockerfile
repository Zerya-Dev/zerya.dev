ARG APP=company

FROM node:26-alpine AS build
WORKDIR /app
ARG APP

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/company/package.json ./apps/company/
COPY apps/foundation/package.json ./apps/foundation/
COPY packages/base/package.json ./packages/base/

RUN npm install -g pnpm@12.11.2 && pnpm install --frozen-lockfile --ignore-scripts

COPY . .

RUN pnpm --filter "@zerya/${APP}" run postinstall
RUN pnpm --filter "@zerya/${APP}" run build

FROM node:26-alpine AS runtime
WORKDIR /app
ARG APP

ENV NODE_ENV=production
ENV PORT=3000
COPY --from=build /app/apps/${APP}/.output ./.output
USER node

EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]
