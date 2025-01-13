FROM node:20.17.0

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./


RUN npm install

COPY . .
RUN npm run build
EXPOSE 3001

CMD [ "npm", "run", "start:dev" ]