# ---------- STAGE 1 : DEV (image existante avec app déjà buildée) ----------
ARG BASE_IMAGE
FROM ${BASE_IMAGE} as dev

# ---------- STAGE 2 : PROD ----------
FROM node:slim

# Pour gérer les signaux correctement (SIGTERM, etc.)
RUN apt-get update && \
    apt-get install -y dumb-init && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copie minimale pour faire tourner l'app Next.js en prod
COPY --from=dev /app/package.json ./package.json
COPY --from=dev /app/node_modules ./node_modules
COPY --from=dev /app/.next ./.next
COPY --from=dev /app/public ./public
COPY --from=dev /app/next.config.ts ./next.config.ts

# Si tu as d'autres fichiers nécessaires (envs, middlewares, etc.)
# COPY --from=dev /app/.env.production ./

EXPOSE 3000

ENTRYPOINT ["dumb-init", "--"]
CMD ["yarn", "start"]
