# Utiliser une image légère de Node.js
FROM node:23-alpine

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer les dépendances (en mode dev)
RUN npm install

# Copier le reste du projet
COPY . .

# Exposer le port
EXPOSE 3000

# Lancer le serveur Next.js
CMD ["npm", "run", "dev"]