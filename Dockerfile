FROM node:8

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json /usr/src/app/

RUN npm install
#RUN npm install pm2 -g
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY . /usr/src/app

EXPOSE 3000
CMD [ "npm", "start"]
#CMD ["pm2", "start", "server.js"]