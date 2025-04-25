@echo off
setlocal EnableDelayedExpansion

REM Charger le fichier .env
for /f "usebackq tokens=1,* delims==" %%A in (".env") do (
    set %%A=%%B
)

echo ================================
echo 📦 Build de l'image du FRONT
echo ================================
docker build -f Dockerfile.front -t %PROJECT_NAME%-front .

echo ================================
echo 📦 Build de l'image du CMS
echo ================================
docker build -f Dockerfile.cms -t %PROJECT_NAME%-cms .
