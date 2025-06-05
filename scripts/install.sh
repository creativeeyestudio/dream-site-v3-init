#!/bin/bash
set -e

# 📦 Charger les variables d'environnement depuis ../.env
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ENV_PATH="$SCRIPT_DIR/../.env"

if [ ! -f "$ENV_PATH" ]; then
  echo "❌ Le fichier .env est introuvable dans le dossier parent."
  exit 1
fi

# Exporter chaque variable présente dans le .env
while IFS='=' read -r key value; do
  if [[ $key =~ ^[a-zA-Z_][a-zA-Z_0-9]*$ ]]; then
    export "$key=$value"
  fi
done < <(grep -E '^[a-zA-Z_][a-zA-Z_0-9]*=' "$ENV_PATH")

# 📁 Vérification / installation du projet Front
echo ""
echo "🛠️  Vérification du projet Front (Next.js)"

if [ -d "front" ]; then
  echo "📁 Le dossier front existe déjà."
else
  echo "📥 Clonage du projet Front..."
  git clone https://github.com/creativeeyestudio/dream-site-v3-front-web.git front || {
    echo "❌ Échec du clonage du front."
    exit 1
  }

  echo "🧹 Suppression de l'historique Git pour intégration locale..."
  rm -rf front/.git
fi

# 🐳 Lancement du Back
echo ""
echo "🐳 Lancement du Back (Docker)"
docker compose up -d --build || {
  echo "❌ Docker n’a pas démarré correctement."
  exit 1
}
