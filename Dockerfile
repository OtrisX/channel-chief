FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./
COPY prisma ./prisma

RUN npm install

COPY . . 

EXPOSE 3000


RUN npm run build

CMD ["npm", "run", "start:prod"]
