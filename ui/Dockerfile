FROM node:20.17.0 as build

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./


RUN npm install
EXPOSE 3000
COPY . .
RUN npm run build

FROM nginx:stable-alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf