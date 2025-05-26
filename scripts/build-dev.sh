#!/bin/bash
set -e

TAG=${1:-dev-latest}
IMAGE="ghcr.io/yourorg/client-project:$TAG"

echo "Creating dev image: $IMAGE"
docker commit strapi-client $IMAGE
echo "Pushing to GHCR..."
docker push $IMAGE
