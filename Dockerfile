FROM node:16.16-alpine
WORKDIR /app
COPY package*.json ./
RUN yarn install
COPY . .
COPY ./dist ./dist
CMD ["yarn", "start:dev"]