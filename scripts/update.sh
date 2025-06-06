#!/bin/bash

echo
echo "🐳 Mise à jour du Front / Back (Docker)..."
if ! docker compose up -d --build; then
  echo "❌ Docker n'a pas démarré correctement."
  exit 1
fi
