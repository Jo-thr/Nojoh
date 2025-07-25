FROM node:lts-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN npm install -g pnpm@10.12.1


FROM base AS deps
WORKDIR /usr/src/app

COPY . .

# Installer seulement les dépendances nécessaires pour le frontend
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm prisma generate --schema=prisma/schema.prisma

FROM base AS build
WORKDIR /usr/src/app

# Copier les fichiers de deps
COPY --from=deps /usr/src/app ./

# Construire l'application Next.js
WORKDIR /usr/src/app
RUN pnpm build

# Stage de développement
FROM base AS development
WORKDIR /usr/src/app

# Copier les fichiers de deps pour le dev
COPY --from=deps /usr/src/app ./

WORKDIR /usr/src/app
EXPOSE 3000
ENV NEXT_TURBOPACK_TRACING=1
CMD ["pnpm", "dev"]

FROM base AS runtime
WORKDIR /usr/src/app

# Copier les fichiers construits depuis le bon répertoire standalone
COPY --from=build /usr/src/app/.next/standalone ./
COPY --from=build /usr/src/app/.next/static ./.next/static
COPY --from=build /usr/src/app/public ./public

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
