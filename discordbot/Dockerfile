FROM node:latest

RUN apt update
RUN npm install -g typescript 
WORKDIR /app
COPY ./package.json /app/package.json
RUN npm install
COPY . /app
RUN npm install


CMD ["npm","start"]