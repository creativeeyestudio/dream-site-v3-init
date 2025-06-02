@echo off
setlocal enabledelayedexpansion

:: Charger les variables d'environnement depuis ../.env
set ENV_PATH=..\.env
if not exist "%ENV_PATH%" (
    echo ❌ Fichier .env introuvable dans le dossier parent.
    exit /b 1
)

for /f "tokens=* delims=" %%a in (%ENV_PATH%) do (
    echo %%a | findstr /b /r /c:"[a-zA-Z_][a-zA-Z_0-9]*=" >nul
    if !errorlevel! == 0 (
        for /f "tokens=1,2 delims==" %%b in ("%%a") do set %%b=%%c
    )
)

:: Vérifie que le tag est fourni
if "%1"=="" (
    echo ❌ Tag de production manquant. Utilisation : build-prod.bat v1.0.0
    exit /b 1
)
set TAG=%1

:: CMS
:: ----------------------------------------------
set DEV_CMS_IMAGE=%GHCR_NAMESPACE%/%PROJECT_NAME%-cms:dev-latest
set PROD_CMS_IMAGE=%DOCKERHUB_USER%/%PROJECT_NAME%-cms:%TAG%

echo 🏗️ Build de l'image CMS depuis %DEV_CMS_IMAGE%
docker build ^
  -f ../docker/cms/Dockerfile ^
  --build-arg BASE_IMAGE=%DEV_CMS_IMAGE% ^
  -t %PROD_CMS_IMAGE% .

echo 🚀 Push de l'image CMS vers Docker Hub...
docker push %PROD_CMS_IMAGE%

echo ✅ Build Prod terminé avec succès !
