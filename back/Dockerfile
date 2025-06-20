FROM node:22.12.0-alpine

RUN apk add --no-cache \
    vips-dev \
    build-base \
    python3

WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./
RUN pnpm install

COPY . .

ENV NODE_ENV=development
EXPOSE 3000

CMD ["pnpm", "dev"]