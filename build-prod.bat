@echo off
setlocal EnableDelayedExpansion

REM Charger le fichier .env
for /f "usebackq tokens=1,* delims==" %%A in (".env") do (
    set %%A=%%B
)

echo ================================
echo Infos des conteneurs
echo ================================
set /p front_container="Entrez l'ID du Container %PROJECT_NAME%-front : "
set /p cms_container="Entrez l'ID du Container %PROJECT_NAME%-cms : "

echo ================================
echo Build de l'image du FRONT
echo ================================
docker commit %front_container% %PROJECT_NAME%-front
docker build -f Dockerfile.front -t kevinad/%PROJECT_NAME%-front
docker push kevinad/%PROJECT_NAME%-front

echo ================================
echo Build de l'image du CMS
echo ================================
docker commit %cms_container% %PROJECT_NAME%-cms
docker build -f Dockerfile.cms -t kevinad/%PROJECT_NAME%-cms .
docker push kevinad/%PROJECT_NAME%-cms
