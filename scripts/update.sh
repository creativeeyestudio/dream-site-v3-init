#!/bin/bash

set -e

echo "🔄 Mise à jour des dossiers Front & Back..."

# FRONT update
if [ -d "./front" ]; then
  echo "📥 Pull du FRONT depuis le repo source..."
  git subtree pull --prefix=front https://github.com/creativeeyestudio/dream-site-v3-front-web.git main --squash
else
  echo "❌ Le dossier front n'existe pas. Lance 'install.sh' d'abord."
  exit 1
fi

# BACK update
if [ -d "./back" ]; then
  echo "📥 Pull du BACK depuis le repo source..."
  git subtree pull --prefix=back https://github.com/creativeeyestudio/dream-site-v3-cms.git main --squash
else
  echo "❌ Le dossier back n'existe pas. Lance 'install.sh' d'abord."
  exit 1
fi

echo "♻️ Reconstruction des conteneurs de dev..."
docker compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build

echo "✅ Mise à jour terminée."
