FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY public /app/public
COPY pages /app/pages
COPY styles /app/styles

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "dev"]
