FROM node:7
WORKDIR /NebulaMovies
COPY package.json /NebulaMovies
RUN npm install
COPY . /NebulaMovies
CMD node server/index.js
EXPOSE 8082