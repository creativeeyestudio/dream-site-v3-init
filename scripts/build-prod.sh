#!/bin/bash
set -e
source .env

TAG=$1
if [ -z "$TAG" ]; then
  echo "❌ Usage: ./build-prod.sh <version>"
  exit 1
fi

IMAGE="$DOCKERHUB_NAMESPACE/$PROJECT_NAME:$TAG"

echo "📦 Commit image: $IMAGE"
docker commit "$CONTAINER_NAME" "$IMAGE"

echo "🚀 Pushing to Docker Hub..."
docker push "$IMAGE"
