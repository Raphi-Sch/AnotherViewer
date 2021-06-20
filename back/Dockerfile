FROM node:12.18.1-alpine
ENV NODE_ENV=production

WORKDIR /src

COPY install.sh install.sh
COPY requirement.txt requirement.txt

RUN sh install.sh

COPY src .

CMD [ "node", "server.js" ]
