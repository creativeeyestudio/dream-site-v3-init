#!/bin/bash

set -e

echo "📥 Pull des images..."
docker compose -f docker-compose.yml -f docker-compose.prod.yml pull

echo "♻️ Redémarrage des services..."
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d
