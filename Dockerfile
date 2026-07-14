FROM node:26-alpine AS base

WORKDIR /usr/src

COPY package.json package-lock.json ./
RUN npm install

FROM base AS dev
EXPOSE 5173
CMD ["npm", "run", "dev"]

FROM base AS build
COPY . .
RUN npm run build


FROM nginx:1.31.2-alpine AS production
COPY --from=build /usr/src/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]