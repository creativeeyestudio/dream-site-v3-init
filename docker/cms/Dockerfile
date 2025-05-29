# Étape 1 : image dev avec Strapi buildé
# ------------------------------------------------------------
ARG BASE_IMAGE
FROM ${BASE_IMAGE} as dev

# Étape 2 : image de prod
# ------------------------------------------------------------
FROM node:22-alpine

RUN apk add --no-cache vips-dev

ENV NODE_ENV=production
ENV PATH=/opt/app/node_modules/.bin:$PATH

# Dossier de travail
WORKDIR /opt/app

# Copie du code Strapi
COPY --from=dev /opt/app /opt/app

# Copie des dépendances dans le bon dossier
COPY --from=dev /opt/node_modules /opt/app/node_modules

# Build Strapi (admin UI)
RUN yarn build

# Permissions
RUN chown -R node:node /opt/app
USER node

EXPOSE 1337

CMD ["yarn", "start"]