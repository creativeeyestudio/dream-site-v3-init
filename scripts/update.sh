#!/bin/bash

echo
echo "🐳 Mise à jour du Front / Back (Docker)..."

# Build et démarre les containers en détaché
if ! docker compose up -d --build; then
  echo "❌ Docker n'a pas démarré correctement."
  exit 1
fi

echo "⏳ Installation des dépendances client dans le container front..."
# Lance npm install dans le container front (adapter le nom si besoin)
if ! docker compose exec front npm install; then
  echo "❌ Échec de l'installation des dépendances client."
  exit 1
fi

echo "✅ Mise à jour terminée avec succès."
