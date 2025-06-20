FROM node:20-alpine

RUN apk add --no-cache \
    vips-dev \
    build-base \
    python3

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

ENV NODE_ENV=development
EXPOSE 3000

CMD ["npm", "run", "dev"]
