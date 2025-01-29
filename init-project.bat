@echo off
echo Lancement du Docker Compose
docker compose up -d --build
echo.

echo Installation du front
if not exist front (
    git clone https://github.com/creativeeyestudio/dream-site-v3-front-web.git front
) else (
    echo Le dossier 'front' existe deja, saut du clonage.
)
echo.

echo Installation des dependances...
cd front
npm i
echo.

echo Installation terminee !
pause
