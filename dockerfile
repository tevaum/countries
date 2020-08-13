FROM node as build
WORKDIR /app
COPY . /app
RUN yarn install && yarn build

FROM nginx
COPY --from=build /app/build /usr/share/nginx/html
COPY react.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
