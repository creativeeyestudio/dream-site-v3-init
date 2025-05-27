@echo off
setlocal enabledelayedexpansion

:: Charger les variables d'environnement depuis ../.env
set ENV_PATH=..\.env
if not exist "%ENV_PATH%" (
    echo ❌ Le fichier .env est introuvable dans le dossier parent.
    exit /b 1
)

for /f "tokens=* delims=" %%a in (%ENV_PATH%) do (
    echo %%a | findstr /b /r /c:"[a-zA-Z_][a-zA-Z_0-9]*=" >nul
    if !errorlevel! == 0 (
        for /f "tokens=1,2 delims==" %%b in ("%%a") do set %%b=%%c
    )
)

:: Vérifie que le conteneur front tourne
docker ps -q -f name=%PROJECT_NAME%-front >nul
if errorlevel 1 (
    echo ❌ Le conteneur %PROJECT_NAME%-front ne tourne pas. Lance d'abord docker-compose.
    exit /b 1
)

:: Création du dossier src si besoin
if not exist "../front-src" (
    mkdir ../front-src
    
    echo 📦 Copie du dossier src depuis le conteneur...
    docker cp %PROJECT_NAME%-front:/app/src ../front-src
)


:: Redémarrage du service Front
echo 🔁 Redémarrage du service front avec le montage local...
docker compose up -d --force-recreate front

cd ../
docker compose -f docker-compose.yml -f docker-compose.front-dev.yml up -d --build front

echo ✅ Initialisation Front Dev terminée avec succès !
