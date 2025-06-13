#!/bin/bash

set -e

echo "📁 Initialisation du projet"

# Vérifie si les dossiers existent déjà
if [ ! -d "./front" ]; then
  echo "📦 Ajout du FRONT en tant que subtree"
  git subtree add --prefix=front https://github.com/creativeeyestudio/dream-site-v3-front-web.git main --squash
else
  echo "✔️ Le dossier front existe déjà"
fi

if [ ! -d "./back" ]; then
  echo "📦 Ajout du BACK en tant que subtree"
  git subtree add --prefix=back https://github.com/creativeeyestudio/dream-site-v3-cms.git main --squash
else
  echo "✔️ Le dossier back existe déjà"
fi

echo "🚀 Lancement de l'environnement de développement..."
docker compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build

echo "✅ Installation terminée."
