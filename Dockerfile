FROM registry.access.redhat.com/ubi8/nodejs-20-minimal

WORKDIR /home/app

COPY package*.json .

USER root

RUN npm install -g create-vite 
RUN npm install 
RUN vite build

COPY . .
 
RUN npm run build

#USER 1001

EXPOSE 8080

CMD ["npm", "start"]
