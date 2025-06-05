#!/bin/bash

# 📁 Revenir à la racine du dépôt Git
cd "$(dirname "$0")/.."

# Vérifie qu'on est bien dans un dépôt Git
if ! git rev-parse --show-toplevel > /dev/null 2>&1; then
  echo "❌ Ce dossier n’est pas un dépôt Git."
  exit 1
fi

REMOTE_NAME="next-core"
REMOTE_URL="https://github.com/creativeeyestudio/dream-site-v3-front-web.git"
SUBTREE_DIR="front"
BRANCH="main"

echo
echo "📥 Mise à jour du Front via git subtree..."

# Vérifie si le remote existe, sinon l’ajoute
if ! git remote | grep -q "^${REMOTE_NAME}$"; then
  echo "🔗 Ajout du remote \"$REMOTE_NAME\"..."
  git remote add "$REMOTE_NAME" "$REMOTE_URL"
fi

# Pull via git subtree
if ! git subtree pull --prefix="$SUBTREE_DIR" "$REMOTE_NAME" "$BRANCH" --squash; then
  echo "❌ Échec de la mise à jour du Front."
  exit 1
fi

echo
echo "🐳 Mise à jour du Back (Docker)..."
if ! docker compose up -d --build; then
  echo "❌ Docker n’a pas démarré correctement."
  exit 1
fi
