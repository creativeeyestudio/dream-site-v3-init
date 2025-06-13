#!/bin/bash

set -e

echo "📦 Clonage des projets..."

[ -d ./front ] || git clone https://github.com/creativeeyestudio/dream-site-v3-front-web.git ./front
[ -d ./back ]  || git clone https://github.com/creativeeyestudio/dream-site-v3-cms.git ./back

echo "🚀 Lancement de l'environnement de développement"
docker compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build
