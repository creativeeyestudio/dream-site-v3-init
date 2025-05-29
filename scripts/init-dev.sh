#!/bin/bash
set -e

# Charger les variables d'environnement depuis ../.env
ENV_PATH="../.env"
if [ ! -f "$ENV_PATH" ]; then
  echo "❌ Le fichier .env est introuvable dans le dossier parent."
  exit 1
fi

# Exporter les variables (en ignorant les lignes commentées)
export $(grep -v '^#' "$ENV_PATH" | xargs)

echo ""
echo "🔧 Installation de la config Docker..."
cd ../
docker compose up -d --build

echo ""
echo "🛠️ Configuration du front..."
cd ./scripts
./init-front-dev.sh

echo ""
echo "📦 Création des images de Dev..."
./build-dev.sh

echo ""
echo "🚀 Installation de la config Docker Dev..."
cd ../
docker compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build
