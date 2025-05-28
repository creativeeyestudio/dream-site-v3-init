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

:: Tag
set TAG=%1
if "%TAG%"=="" set TAG=dev-latest

echo 🔄 Utilisation du tag : %TAG%

:: FRONT
:: ----------------------------------------------
set IMAGE=%GHCR_NAMESPACE%/%PROJECT_NAME%-front:%TAG%
echo 📦 Commit de l'image Front : %IMAGE%
docker commit %PROJECT_NAME%-front %IMAGE%

echo 🚀 Push de l'image Front vers GHCR...
docker push %IMAGE%

:: CMS
:: ----------------------------------------------
set IMAGE=%GHCR_NAMESPACE%/%PROJECT_NAME%-cms:%TAG%
echo 📦 Commit de l'image CMS : %IMAGE%
docker commit %PROJECT_NAME%-cms %IMAGE%

echo 🚀 Push de l'image CMS vers GHCR...
docker push %IMAGE%

echo ✅ Build Dev terminé avec succès !
