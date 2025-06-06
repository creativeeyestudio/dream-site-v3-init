#!/bin/bash
set -e

# Nom du service docker-compose pour le front (modifie si besoin)
FRONT_SERVICE="front"

echo "📦 Installation d'un nouveau package dans le container front"

read -p "Entrez le nom du package npm à installer (ex: axios): " PACKAGE_NAME

if [ -z "$PACKAGE_NAME" ]; then
  echo "❌ Aucun package spécifié. Abandon."
  exit 1
fi

echo "➡️ Installation de $PACKAGE_NAME dans le container $FRONT_SERVICE..."

docker compose exec $FRONT_SERVICE npm install "$PACKAGE_NAME"

echo "✅ Package $PACKAGE_NAME installé avec succès !"

echo "ℹ️ N'oublie pas de commit et push les modifications dans package.json et package-lock.json si nécessaire."
