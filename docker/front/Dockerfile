# ---------- STAGE 1 : BUILD ----------
ARG BASE_IMAGE
FROM ${BASE_IMAGE} AS build

WORKDIR /app

# Installer les dépendances
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copier le code et builder l'app
COPY . .
RUN yarn build

# ---------- STAGE 2 : PROD ----------
FROM node:slim

# Dumb-init pour une meilleure gestion des signaux (SIGTERM, etc.)
RUN apt-get update && \
    apt-get install -y dumb-init && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Créer le répertoire de travail
WORKDIR /app

# Copier ce qui est nécessaire pour la prod uniquement
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public

# Exposer le port Next.js
EXPOSE 3000

# Remplacer le CMD pour que dumb-init gère le processus
ENTRYPOINT ["dumb-init", "--"]
CMD ["yarn", "start"]
