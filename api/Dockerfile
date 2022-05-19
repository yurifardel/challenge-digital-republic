FROM node:12

WORKDIR /urs/app

COPY package*.json ./
RUN npm install 

COPY . .

EXPOSE 5050

CMD ["npm", "start"]