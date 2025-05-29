#!/bin/bash
set -e

# Charger les variables d'environnement depuis ../.env
ENV_PATH="../.env"
if [ ! -f "$ENV_PATH" ]; then
  echo "❌ Fichier .env introuvable dans le dossier parent."
  exit 1
fi

# Exporter les variables de .env
export $(grep -v '^#' "$ENV_PATH" | xargs)

# Aller dans le dossier parent
cd ../

# Lancer Docker Compose avec les fichiers appropriés
docker compose \
  -f docker-compose.yml \
  -f docker-compose.test-prod.yml up \
  -d --build
