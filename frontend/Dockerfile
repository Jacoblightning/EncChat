FROM denoland/deno:debian-2.5.5 AS build

WORKDIR /app

COPY package.json deno.lock .

RUN ["deno", "install"]

COPY . .

RUN ["deno", "run", "build"]


FROM nginxinc/nginx-unprivileged

COPY --from=build /app/dist /usr/share/nginx/html

COPY --chown=nginx:nginx conf/nginx /etc/nginx

# nginx unprivileged uses port 8080 by default
EXPOSE 8080
