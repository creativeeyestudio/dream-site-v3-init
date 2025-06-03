@echo off
setlocal

:: -- Étape 1 : Saisie --
set /p FRONT_CONTAINER= Nom du conteneur FRONT : 
set /p CMS_CONTAINER= Nom du conteneur CMS : 

:: -- Étape 2 : Commit (image depuis conteneur) --
docker commit %FRONT_CONTAINER% %FRONT_CONTAINER%-image
docker commit %CMS_CONTAINER% %CMS_CONTAINER%-image

:: -- Étape 3 : Build images prod --
docker build ^
  --build-arg BASE_IMAGE=%FRONT_CONTAINER%-image ^
  -f ..\docker\front\Dockerfile ^
  -t %FRONT_CONTAINER% .

docker build ^
  --build-arg BASE_IMAGE=%CMS_CONTAINER%-image ^
  -f ..\docker\cms\Dockerfile ^
  -t %CMS_CONTAINER% .

:: -- Étape 4 : Tag & Push --
docker tag %FRONT_CONTAINER% kevinad/%FRONT_CONTAINER%:latest
docker tag %CMS_CONTAINER% kevinad/%CMS_CONTAINER%:latest

docker push kevinad/%FRONT_CONTAINER%:latest
docker push kevinad/%CMS_CONTAINER%:latest

:: -- Étape 5 : Nettoyage --
echo 🧹 Suppression des images Docker inactives...
docker image prune -f

echo ✅ Workflow terminé avec succès.
endlocal
