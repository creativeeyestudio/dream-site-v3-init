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

echo >> Installation de la config Docker
cd ../
docker compose up -d --build

echo >> Config du front
cd ./scripts
call init-front-dev.bat

echo >> Création des images de Dev
call build-dev.bat

echo >> Installation de la config Docker Dev
cd ../
docker compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build