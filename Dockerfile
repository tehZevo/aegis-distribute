FROM node:12-alpine

# Create app directory
WORKDIR /usr/src/app
#copy package(lock).json
COPY package*.json ./
#install git (needed in alpine for git repos)
RUN apk add git
#install packages
RUN npm ci --only=production
# Bundle app source
COPY . .
#ports and env
EXPOSE 80
ENV AUTO=false
ENV SYNC=true
#empty
ENV URLS=

CMD [ "npm", "start" ]
