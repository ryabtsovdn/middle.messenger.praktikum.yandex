FROM node:14-alpine

RUN mkdir -p /usr/app
WORKDIR /usr/app

COPY package*.json /usr/app/
RUN npm install

COPY . /usr/app/
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
