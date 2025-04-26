#!/bin/bash
# Charger le fichier .env
export $(grep -v '^#' .env | xargs)

echo "==============================="
echo "Infos des conteneurs"
echo "==============================="
read -p "Entrez l'ID du Container ${PROJECT_NAME}-front : " front_container
read -p "Entrez l'ID du Container ${PROJECT_NAME}-cms : " cms_container

echo "==============================="
echo "Build de l'image du FRONT"
echo "==============================="
docker commit "$front_container" "${PROJECT_NAME}-front"
docker build -f Dockerfile.front -t kevinad/"${PROJECT_NAME}-front" .
docker push kevinad/"${PROJECT_NAME}-front"

echo "==============================="
echo "Build de l'image du CMS"
echo "==============================="
docker commit "$cms_container" "${PROJECT_NAME}-cms"
docker build -f Dockerfile.cms -t kevinad/"${PROJECT_NAME}-cms" .
docker push kevinad/"${PROJECT_NAME}-cms"
