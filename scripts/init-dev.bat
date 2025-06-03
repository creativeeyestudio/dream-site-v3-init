@echo off
setlocal enabledelayedexpansion

:: 📦 Charger les variables d'environnement depuis ../.env
set "ENV_PATH=..\.env"
if not exist "%ENV_PATH%" (
    echo ❌ Le fichier .env est introuvable dans le dossier parent.
    exit /b 1
)

for /f "usebackq tokens=* delims=" %%a in ("%ENV_PATH%") do (
    echo %%a | findstr /b /r /c:"[a-zA-Z_][a-zA-Z_0-9]*=" >nul
    if !errorlevel! == 0 (
        for /f "tokens=1* delims==" %%b in ("%%a") do (
            set "%%b=%%c"
        )
    )
)

:: 🛠️  Vérification du projet Front (Next.js)
echo.
cd ..

set REMOTE_NAME=next-core
set REMOTE_URL=https://github.com/creativeeyestudio/dream-site-v3-front-web.git
set SUBTREE_DIR=front
set BRANCH=main

:: 🔗 Ajouter le remote si manquant
git remote | findstr /b /c:"%REMOTE_NAME%" >nul
if errorlevel 1 (
    echo 🔗 Ajout du remote "%REMOTE_NAME%"...
    git remote add %REMOTE_NAME% %REMOTE_URL%
)

:: 📁 Vérifier si front/ existe
if exist "%SUBTREE_DIR%\" (
    echo 🔁 Le dossier '%SUBTREE_DIR%' existe déjà. Mise à jour via git subtree...
    git subtree pull --prefix=%SUBTREE_DIR% %REMOTE_NAME% %BRANCH% --squash
) else (
    echo 📥 Ajout initial du projet Front via git subtree...
    git subtree add --prefix=%SUBTREE_DIR% %REMOTE_NAME% %BRANCH% --squash
)

:: 🐳 Lancement du Back (Docker)
echo.
echo 🐳 Lancement du Back
docker compose up -d --build
if errorlevel 1 (
    echo ❌ Docker n’a pas démarré correctement.
    exit /b 1
)