FROM node:18-alpine AS deps

RUN apk add --no-cache libc6-compat
WORKDIR /www

COPY package*.json ./
RUN npm cache clean --force
RUN npm install

FROM node:18-alpine AS runner

WORKDIR /www
COPY --from=deps /www/node_modules ./node_modules
COPY . .

CMD npm run dev
