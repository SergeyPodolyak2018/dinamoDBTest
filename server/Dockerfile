FROM node:18.16.0-alpine3.17
USER node
WORKDIR /home/app
COPY --chown=node:node . /home/app
RUN npm install
EXPOSE 3000
CMD [ "node", "server.js"]
