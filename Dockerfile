FROM node:14.18.3-alpine


EXPOSE 3000
WORKDIR /src

RUN npm install i npm@latest -g

COPY package.json package-lock*.json ./

RUN npm install 

COPY . .

CMD [ "npm","start" ]