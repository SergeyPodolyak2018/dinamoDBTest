FROM node:18.16.0-alpine3.17
RUN mkdir -p /home/app/node_modules && chown -R node:node /home/app
WORKDIR /home/app
COPY package*.json ./
USER node
RUN npm install
COPY --chown=node:node . /home/app
EXPOSE 3000
CMD [ "node", "server.js"]
