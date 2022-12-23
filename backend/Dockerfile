FROM node:16 as installer

WORKDIR /src/installer

COPY package.json .
COPY yarn.lock .

RUN yarn install

FROM node:16 as builder

WORKDIR /src/builder
COPY --from=installer src/installer .
COPY . .

RUN yarn build
RUN yarn install --production=true


FROM node:16-alpine as deployer

WORKDIR /app
COPY --from=builder --chown=root:root /src/builder/dist/main.js index.js
COPY --from=builder --chown=root:root /src/builder/node_modules node_modules

ENTRYPOINT [ "node", "." ]

