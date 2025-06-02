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

:: 📁 Vérification du projet Front
echo.
echo 🛠️  Vérification du projet Front (Next.js)
cd ..

if exist "front" (
    echo 📁 Le dossier 'front' existe déjà. Aucun clonage effectué.
) else (
    echo 📥 Clonage du projet Front...
    git clone https://github.com/creativeeyestudio/dream-site-v3-front-web.git front
    if errorlevel 1 (
        echo ❌ Échec du clonage du front.
        exit /b 1
    )

    echo 🧹 Suppression de l'historique Git pour intégration locale...
    rmdir /s /q front\.git
)

:: 🐳 Lancement du Back (Docker)
echo.
echo 🐳 Lancement du Back
docker compose up -d --build
if errorlevel 1 (
    echo ❌ Docker n’a pas démarré correctement.
    exit /b 1
)

:: 🚀 Lancement du Front
echo.
echo 🚀 Lancement du Front
cd front
npm install
npm run dev
