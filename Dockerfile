FROM node:12-alpine

WORKDIR /usr/src/app

# COPY ./ .
ADD ./ .

RUN npm install

RUN npm run build

RUN npm install pm2 -g

EXPOSE 4000

CMD ["pm2-runtime","dist/server.js"]

