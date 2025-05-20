FROM --platform=linux/amd64 node:20.12.0-alpine3.19

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3010
CMD ["npm", "run", "dev"]
