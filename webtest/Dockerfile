FROM node

RUN mkdir /src

WORKDIR /src
ADD ./package.json /src/package.json

RUN npm install mocha selenium-webdriver -g

RUN npm i

RUN mocha --version

CMD npm t