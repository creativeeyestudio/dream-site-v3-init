#!/bin/bash
set -e

# Charger les variables d'environnement
if [ ! -f ../.env ]; then
  echo "❌ Fichier .env introuvable."
  exit 1
fi
source .env

TAG=${1:-dev-latest}

# FRONT
# ----------------------------------------------
FRONT_CONTAINER="${PROJECT_NAME}-front"
FRONT_IMAGE="$GHCR_NAMESPACE/$PROJECT_NAME-front:$TAG"

echo "📦 Commit de l'image Front : $FRONT_IMAGE"
docker commit "$FRONT_CONTAINER" "$FRONT_IMAGE"

echo "🚀 Push de l'image Front vers le GHCR..."
docker push "$FRONT_IMAGE"

# CMS
# ----------------------------------------------
CMS_CONTAINER="${PROJECT_NAME}-cms"
CMS_IMAGE="$GHCR_NAMESPACE/$PROJECT_NAME-cms:$TAG"

echo "📦 Commit de l'image CMS : $CMS_IMAGE"
docker commit "$CMS_CONTAINER" "$CMS_IMAGE"

echo "🚀 Push de l'image CMS vers le GHCR..."
docker push "$CMS_IMAGE"