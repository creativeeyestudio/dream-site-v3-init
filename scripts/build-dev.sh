#!/bin/bash
set -e
source .env

TAG=${1:-dev-latest}
IMAGE="$GHCR_NAMESPACE/$PROJECT_NAME:$TAG"

echo "📦 Commit image: $IMAGE"
docker commit "$CONTAINER_NAME" "$IMAGE"

echo "🚀 Pushing to GHCR..."
docker push "$IMAGE"
