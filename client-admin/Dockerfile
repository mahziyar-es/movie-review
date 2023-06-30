FROM node:16
WORKDIR /client-admin
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3501
CMD ["npm", "run", "dev"]