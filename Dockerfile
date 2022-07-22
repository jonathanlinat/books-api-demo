FROM node:16-alpine

WORKDIR /api

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm --silent
RUN pnpm install --frozen-lockfile --silent

COPY . .

EXPOSE 3000

CMD pnpm start:prod
