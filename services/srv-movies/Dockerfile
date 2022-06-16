FROM node:14.15-alpine

RUN mkdir -p /app

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm i && \
  npm audit fix && \
  chown -R node:node /app

COPY --chown=node:node ./ ./

USER node

CMD npm start