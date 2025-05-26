#!/bin/bash
set -e

VERSION=$1

if [ -z "$VERSION" ]; then
  echo "❌ Usage: ./build-prod.sh <version>"
  exit 1
fi

IMAGE="yourdockerhubuser/client-project:$VERSION"

echo "Creating prod image: $IMAGE"
docker commit strapi-client $IMAGE
echo "Pushing to Docker Hub..."
docker push $IMAGE
