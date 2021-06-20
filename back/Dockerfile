FROM node:12.18.1-alpine
ENV NODE_ENV=production

WORKDIR /src

#COPY ["package.json", "package-lock.json*", "./"]
#RUN npm install --production

RUN npm install tmi.js
RUN npm install fs
RUN npm install mysql2
RUN npm install dateformat

COPY src .

CMD [ "node", "listener.js" ]
