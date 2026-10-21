# syntax=docker/dockerfile:1

ARG APP=company

# https://viteplus.dev/guide/docker
FROM ghcr.io/voidzero-dev/vite-plus:1.1.0@sha256:15dedad6ab1f100c096aaebac6b0fb40ccf1f3dd0dd0169141e2a56588489b60 AS build
ARG APP

WORKDIR /app

COPY --chown=vp:vp .node-version ./
RUN vp env install
RUN cp "$(vp env which node | head -1)" /tmp/node

COPY --chown=vp:vp package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY --chown=vp:vp apps/company/package.json ./apps/company/
COPY --chown=vp:vp apps/foundation/package.json ./apps/foundation/
COPY --chown=vp:vp packages/base/package.json ./packages/base/
RUN vp install --frozen-lockfile --ignore-scripts

COPY --chown=vp:vp . .
RUN vp run --filter "@zerya/${APP}" postinstall && vp run --filter "@zerya/${APP}" build

FROM gcr.io/distroless/cc-debian13:nonroot@sha256:e792ab3d241a468a4fd7519ddbbebe66b49b5f365771716ea688ad40b6c6f1c2 AS runtime
ARG APP

WORKDIR /app

ENV NODE_ENV=production \
    HOST=0.0.0.0 \
    PORT=3000

COPY --from=build /tmp/node /usr/local/bin/node
COPY --from=build /app/apps/${APP}/.output ./

EXPOSE 3000

ENTRYPOINT ["node"]
CMD ["server/index.mjs"]
