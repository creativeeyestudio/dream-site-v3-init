#!/bin/bash

set -e

# Variables
FRONT_IMAGE="kevinad/front:latest"
BACK_IMAGE="kevinad/back:latest"

echo "🔨 Build de l'image Front (Next.js)..."
docker build -t $FRONT_IMAGE ./front

echo "🔨 Build de l'image Back (Payload CMS)..."
docker build -t $BACK_IMAGE ./back

echo "🔑 Connexion à Docker Hub..."
docker login

echo "🚀 Push de l'image Front vers Docker Hub..."
docker push $FRONT_IMAGE

echo "🚀 Push de l'image Back vers Docker Hub..."
docker push $BACK_IMAGE

echo "✅ Build et push terminés."
