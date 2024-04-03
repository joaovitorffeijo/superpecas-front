# Stage 1: Build Angular app
FROM node:20-alpine as angular
WORKDIR /ng-app
COPY package*.json ./
RUN npm ci 
COPY . .
RUN npm run build

# Stage 2: Serve Angular app with nginx
FROM nginx:alpine
COPY --from=angular /ng-app/dist/frontsuperpecas /usr/share/nginx/html
EXPOSE 80