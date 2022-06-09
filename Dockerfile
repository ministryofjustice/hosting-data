FROM node:18 as build

# app directory
WORKDIR /usr/src/app

# copy package files
COPY package*.json ./

# install node modules
RUN npm ci

# bundle source into container
COPY . .

# build site
RUN npx @11ty/eleventy

# create nginx proxy to serve static files
FROM nginxinc/nginx-unprivileged:alpine

# set workdir to nginx root
WORKDIR /usr/share/nginx/html

# copy custom nginx configuration
COPY ./conf/nginx.conf /etc/nginx/conf.d/default.conf

# copy pre-built static site into new image, resulting in a smaller image
COPY --from=build /usr/src/app/docs ./

# set user to non-root
USER 1000

# start nginx
CMD ["nginx", "-g", "daemon off;"]
