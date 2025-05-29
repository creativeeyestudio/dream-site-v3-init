# ---------- STAGE 1 : DEV (code source sans build) ----------
ARG BASE_IMAGE
FROM ${BASE_IMAGE} as dev

# ---------- STAGE 2 : BUILD ----------
FROM node:slim as build

WORKDIR /app

# Pour éviter les erreurs de signaux
RUN apt-get update && \
    apt-get install -y dumb-init && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Copie du code source
COPY --from=dev /app /app

# Build Next.js
RUN yarn install --frozen-lockfile && yarn build

# ---------- STAGE 3 : PROD ----------
FROM node:slim

RUN apt-get update && \
    apt-get install -y dumb-init && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copie minimale pour exécuter l'app
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/next.config.ts ./next.config.ts

# Exposer le port
EXPOSE 3000

ENTRYPOINT ["dumb-init", "--"]
CMD ["yarn", "start"]
