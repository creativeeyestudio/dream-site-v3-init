# --- Étape 1 : basée sur ton image de dev Strapi (commitée) ---
ARG BASE_IMAGE
FROM ${BASE_IMAGE} as dev

# --- Étape 2 : image prod propre et allégée ---
FROM node:22-alpine

# Dépendances système nécessaires à Strapi
RUN apk add --no-cache vips-dev

# Environnement
ENV NODE_ENV=production
WORKDIR /opt/

# Copy des dépendances Node
COPY --from=dev /opt/node_modules ./node_modules

# Copy du projet Strapi
WORKDIR /opt/app
COPY --from=dev /opt/app ./

# Optionnel : yarn.lock pour audit
COPY --from=dev /opt/app/yarn.lock ./yarn.lock

ENV PATH=/opt/node_modules/.bin:$PATH

# Permissions
RUN chown -R node:node /opt/app
USER node

EXPOSE 1337
CMD ["yarn", "start"]
