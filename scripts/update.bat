@echo off
setlocal enabledelayedexpansion

:: 📁 Revenir à la racine du dépôt Git
cd /d %~dp0
cd ..

:: Vérifie qu'on est bien dans un dépôt Git
git rev-parse --show-toplevel >nul 2>&1
if errorlevel 1 (
    echo ❌ Ce dossier n’est pas un dépôt Git.
    exit /b 1
)

set REMOTE_NAME=next-core
set REMOTE_URL=https://github.com/creativeeyestudio/dream-site-v3-front-web.git
set SUBTREE_DIR=front
set BRANCH=main

:: 📥 Mise à jour du Front via git subtree
echo.
echo 📥 Mise à jour du Front...

:: Ajouter le remote si nécessaire
git remote | findstr /b /c:"%REMOTE_NAME%" >nul
if errorlevel 1 (
    echo 🔗 Ajout du remote "%REMOTE_NAME%"...
    git remote add %REMOTE_NAME% %REMOTE_URL%
)

git subtree pull --prefix=%SUBTREE_DIR% %REMOTE_NAME% %BRANCH% --squash
if errorlevel 1 (
    echo ❌ Échec de la mise à jour du Front.
    exit /b 1
)

:: 🐳 Mise à jour du Back
echo.
echo 🐳 Mise à jour du Back (Docker)...
docker compose up -d --build
if errorlevel 1 (
    echo ❌ Docker n’a pas démarré correctement.
    exit /b 1
)
