@echo off
setlocal enabledelayedexpansion

:: Charger les variables d'environnement depuis ../.env
set ENV_PATH=..\.env
if not exist "%ENV_PATH%" (
    echo ❌ Fichier .env introuvable dans le dossier parent.
    exit /b 1
)

cd ../

docker compose ^
    -f docker-compose.yml ^
    -f docker-compose.test-prod.yml up ^
    -d --build