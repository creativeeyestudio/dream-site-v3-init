#!/bin/bash
set -e
source ../.env

FRONT_CONTAINER="${PROJECT_NAME}-front"

echo "📁 Création du dossier front-local..."
mkdir -p ../front-local

echo "📦 Copie du front depuis le conteneur..."
docker cp $FRONT_CONTAINER:/app/src ../front-local

# D'autres fichiers utiles
# docker cp $FRONT_CONTAINER:/app/next.config.js ./front-local/next.config.js || true
# docker cp $FRONT_CONTAINER:/app/package.json ./front-local/package.json || true

echo "🔁 Redémarrage du front avec montages locaux..."
docker-compose -f docker-compose.yml -f docker-compose.front-dev.yml up -d front
