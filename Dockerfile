FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY src /app/src

COPY jsconfig.json next.config.mjs postcss.config.js tailwind.config.js /app

# RUN npm run build

EXPOSE 3000

RUN npm run build

CMD ["npm", "run", "dev"]
