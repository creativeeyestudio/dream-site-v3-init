# Infrastructure Dream Site

Cette infrastructure Docker permet d'instancier un projet web à l'aide de la suite Dream Site de Creative Eye Studio

## Installation du projet

### Clonage du projet

Commencez par cloner les fichiers d'instance sur votre machine à l'aide de la commande ci-dessous
```git clone https://github.com/creativeeyestudio/dream-site-v3-init.git ./project-name```

---

## Configuration de l'instance Dev

### Fichier .env
Modifiez la variable `PROJECT_NAME` avec le nom du projet.
> Exemple : `PROJECT_NAME=project-name`

### Fichers Dockerfile
Faites de même dans les dockerfiles en remplaçant 'NOM-DU-PROJET' par la variable donnée
> Exemple : `FROM project-name-front AS builder`

### Lancement de l'instance
Lancez ensuite la commande suivante selon votre système d'exploitation :
* Windows : `./init-dev.bat`
* Mac : `./init-dev.sh` _A venir..._

---

## Configuration du Git du Projet

> _A venir..._

---

## Besoin d'aide

Pour toute demande complémentaire
* contact@creative-eye.fr
* [Site de Creative Eye Studio](https://creative-eye.fr/fr)