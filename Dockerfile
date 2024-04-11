FROM node:21-alpine3.18

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package*.json ./

RUN chown -R node:node package-lock.json

USER node

RUN npm i --omit=dev

COPY --chown=node:node . .

EXPOSE 8000

RUN ls

CMD [ "npm", "run", "start:prod" ]
