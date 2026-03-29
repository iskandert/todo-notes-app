FROM node:22-alpine AS build

RUN apk add --no-cache git

WORKDIR /app

RUN git clone https://github.com/iskandert/todo-notes-app.git .
RUN npm ci
RUN npx nuxt prepare
RUN npx nuxt generate

FROM nginx:stable-alpine

COPY --from=build /app/.output/public /usr/share/nginx/html
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
