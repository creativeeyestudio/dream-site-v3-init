#!/bin/bash
# Charger le fichier .env
set -a
source .env
set +a

CONTAINER_NAME="${PROJECT_NAME}-front"

# 1. Vérifier si Docker Compose est déjà lancé
if ! docker-compose ps | grep -q "Up"; then
    echo "Docker Compose n'est pas encore lancé. Lancement..."
    docker-compose up -d --build
    sleep 5
else
    echo "Docker Compose est déjà lancé."
fi

# 2. Copier les fichiers du conteneur vers le répertoire local
echo "Copie des fichiers du conteneur vers le répertoire local..."
docker cp "${CONTAINER_NAME}:/app/src/components/." ./front

# 3. Relancer Docker Compose avec le volume activé
echo "Relance de Docker Compose avec le volume activé..."
docker-compose down
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build

# 4. Optionnel : Redémarrer le service si tu veux forcer le rechargement de l'application
# docker exec -it ${CONTAINER_NAME} yarn develop

echo "Le conteneur a été relancé avec les fichiers mis à jour."
