FROM node:16
WORKDIR /client
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3502
CMD ["npm", "run", "dev"]