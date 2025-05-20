FROM --platform=linux/amd64 node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3010
CMD ["npm", "run", "dev"]
