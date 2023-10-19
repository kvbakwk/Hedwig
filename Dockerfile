FROM node:18-alpine

RUN apk add --no-cache libc6-compat

WORKDIR /www

COPY /src .

# RUN npm cache clean --force
RUN npm install

CMD npm run dev