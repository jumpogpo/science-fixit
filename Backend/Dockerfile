FROM node:slim

WORKDIR /usr/src/app

COPY package*.json ./

ENV PATH=/app/.bin:$PATH

RUN apt-get update -y && apt-get install -y openssl

RUN npm install -g bun

RUN bun install --frozen-lockfile

COPY . .

RUN bunx prisma migrate deploy

RUN bunx prisma generate

RUN bun run build

EXPOSE 3000

CMD ["bun", "./dist/main.js"]
