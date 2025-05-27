# 🚀 Installation de l'infrastructure DreamSite

Ce dépôt contient des scripts PowerShell pour automatiser l'installation, le développement, et la livraison d'un projet basé sur l'infrastructure DreamSite dans un environnement Docker. Compatible Windows et Linux.

---

## 📁 Contenu des scripts

- `init-front-dev`  
  Initialise un projet en environnement de développement :
  - Copie le dossier `src`. depuis le conteneur vers `./front-local`
  - Redémarre le service front avec ces fichiers montés localement

- `build-dev`  
  Build une image de développement à partir du projet actuel, puis la push vers le GitHub Container Registry (`ghcr.io`).

- `build-prod`  
  Build une image de production taguée (via paramètre) et la push vers Docker Hub.

- `push`  
  Permet de push n'importe quelle image Docker vers un registry en spécifiant son nom et son tag.

---

## ✅ Prérequis

- Docker installé (et accessible depuis PowerShell)
- PowerShell (5+ ou Core)

```env
PROJECT_NAME=project-name
DOCKERHUB_USER=tonusername
DOCKERHUB_REPO=nom-du-depot
GITHUB_REGISTRY=ghcr.io/ton-org-ou-user
```

---

## 🧪 Exemples d’utilisation

```powershell
# Initialiser le projet en mode dev
.\init-front-dev.ps1

# Construire et push l’image dev vers GitHub Container Registry
.\build-dev.ps1

# Construire et push l’image prod vers Docker Hub (avec tag)
.\build-prod.ps1 -prodTag v1.0.0

# Push manuel d’une image
.\push.ps1 -imageName mon-image -tag latest
```

---

## 🧠 Bonnes pratiques

- Crée ton projet client depuis un **template Git** propre (avec ce set de scripts inclus).
- Utilise `docker-compose.front-dev.yml` pour adapter le comportement local sans impacter le projet.

---

©️ OpenAI x Creative Eye Studio
```