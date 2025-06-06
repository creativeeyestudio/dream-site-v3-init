#!/bin/bash
set -e

FRONT_SERVICE="front"

echo "🗑️ Désinstallation d'un package npm dans le container front"

read -p "Entrez le nom du package npm à désinstaller (ex: axios): " PACKAGE_NAME

if [ -z "$PACKAGE_NAME" ]; then
  echo "❌ Aucun package spécifié. Abandon."
  exit 1
fi

echo "➡️ Désinstallation de $PACKAGE_NAME dans le container $FRONT_SERVICE..."

docker compose exec $FRONT_SERVICE npm uninstall "$PACKAGE_NAME"

echo "✅ Package $PACKAGE_NAME désinstallé avec succès !"

echo "ℹ️ N'oublie pas de commit et push les modifications dans package.json et package-lock.json si nécessaire."
