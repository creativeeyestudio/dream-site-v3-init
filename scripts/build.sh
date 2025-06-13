#!/bin/bash

set -e
source .env

FRONT_IMAGE="${PROJECT_NAME}-front:latest"
BACK_IMAGE="${PROJECT_NAME}-back:latest"

echo "🔨 Build de l'image Front..."
docker build -t $FRONT_IMAGE ./front

echo "🔨 Build de l'image Back..."
docker build -t $BACK_IMAGE ./back

echo "🔑 Connexion à Docker Hub..."
docker login

echo "🚀 Push de l'image Front vers Docker Hub..."
docker push $FRONT_IMAGE

echo "🚀 Push de l'image Back vers Docker Hub..."
docker push $BACK_IMAGE

echo "✅ Build et push terminés."
