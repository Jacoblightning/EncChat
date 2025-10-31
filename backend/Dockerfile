FROM python:3-alpine

COPY --from=ghcr.io/astral-sh/uv:0.9.5 /uv /uvx /bin/

RUN ["apk", "add", "gcc", "g++", "musl-dev"]

WORKDIR /server

COPY pyproject.toml uv.lock .

RUN ["uv", "sync", "--locked", "--compile-bytecode", "--no-cache", "--no-editable", "--no-dev"]

RUN ["apk", "del", "gcc", "g++", "musl-dev"]

COPY . .

EXPOSE 8000

CMD ["uv", "run", "fastapi", "run", "--port=80", "--forwarded-allow-ips=frontend", "--proxy-headers"]
