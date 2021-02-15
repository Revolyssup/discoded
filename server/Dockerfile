FROM node:latest

WORKDIR /app

RUN npm install -g typescript

COPY package.json /app/package.json

RUN npm install

COPY . /app
CMD ["npm","start"]
