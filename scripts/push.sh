#!/bin/bash
set -e
source .env

REGISTRY=$1
TAG=$2

if [ "$REGISTRY" == "ghcr" ]; then
  IMAGE="$GHCR_NAMESPACE/$PROJECT_NAME:$TAG"
elif [ "$REGISTRY" == "dockerhub" ]; then
  IMAGE="$DOCKERHUB_NAMESPACE/$PROJECT_NAME:$TAG"
else
  echo "❌ Unknown registry: $REGISTRY"
  exit 1
fi

echo "🚀 Pushing image: $IMAGE"
docker push "$IMAGE"
