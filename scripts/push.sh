#!/bin/bash
set -e

REGISTRY=$1
TAG=$2

if [ "$REGISTRY" == "ghcr" ]; then
  IMAGE="ghcr.io/yourorg/client-project:$TAG"
elif [ "$REGISTRY" == "dockerhub" ]; then
  IMAGE="yourdockerhubuser/client-project:$TAG"
else
  echo "❌ Unknown registry: $REGISTRY"
  exit 1
fi

echo "Pushing image: $IMAGE"
docker push $IMAGE
