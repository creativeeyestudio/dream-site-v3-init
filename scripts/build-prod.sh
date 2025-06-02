#!/bin/bash
set -e

if [ ! -f .env ]; then
  echo "❌ Fichier .env introuvable."
  exit 1
fi

source .env

if [ -z "$1" ]; then
  echo "❌ Tag de production manquant. Utilisation : ./build-prod.sh v1.0.0"
  exit 1
fi

TAG=$1

# CMS
# ----------------------------------------------
DEV_CMS_IMAGE="$GHCR_NAMESPACE/$PROJECT_NAME-cms:dev-latest"
PROD_CMS_IMAGE="$DOCKERHUB_USER/$PROJECT_NAME-cms:$TAG"

echo "🐳 Build de l'image CMS prod depuis $DEV_CMS_IMAGE avec Dockerfile personnalisé..."

docker build \
  -f ../docker/cms/Dockerfile \
  --build-arg BASE_IMAGE=$DEV_CMS_IMAGE \
  -t $PROD_CMS_IMAGE .

echo "🚀 Push de l'image CMS vers Docker Hub..."
docker push $PROD_CMS_IMAGE

echo "✅ Build Prod terminé avec succès !"
