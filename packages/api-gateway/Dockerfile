FROM node:16

WORKDIR /usr/src/app

COPY package*.json lerna.json ./
COPY packages/api-gateway ./packages/api-gateway
RUN npm ci

ENV NODE_ENV=a
ENV PORT=3000

EXPOSE 3000
CMD ["npm", "--prefix", "packages/api-gateway","run", "start:dev"]