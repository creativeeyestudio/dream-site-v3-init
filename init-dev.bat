@echo off
REM Charger le fichier .env
for /f "usebackq tokens=1,* delims==" %%A in (".env") do (
    set %%A=%%B
)

set CONTAINER_NAME=%PROJECT_NAME%-front

:: 1. Vérifier si Docker Compose est déjà lancé
docker-compose ps | findstr "Up" > nul
if %ERRORLEVEL% neq 0 (
    echo Docker Compose n'est pas encore lancé. Lancement...
    docker-compose up -d --build
    timeout /t 5
) else (
    echo Docker Compose est déjà lancé.
)

:: 2. Copier les fichiers du conteneur vers le répertoire local
echo Copie des fichiers du conteneur vers le répertoire local...
docker cp %CONTAINER_NAME%:/app/src/components/. ./front

:: 3. Relancer Docker Compose avec le volume activé
echo Relance de Docker Compose avec le volume activé...
docker-compose down
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build

:: 4. Optionnel : Redémarrer le service si tu veux forcer le rechargement de l'application
:: docker exec -it %CONTAINER_NAME% yarn develop

echo Le conteneur a été relancé avec les fichiers mis à jour.
pause
