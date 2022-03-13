FROM node:16 as builder
ARG SERVICE
WORKDIR /usr/src/app

COPY --chown=node:node package*.json lerna.json ./
COPY --chown=node:node packages/ ./packages
RUN npm i
RUN npm run bootstrap
RUN npm run build


EXPOSE 3000
CMD ["npm", "--prefix", "packages/${SERVICE}", "run ", "start:dev"]