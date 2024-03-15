FROM registry.access.redhat.com/ubi8/nodejs-20-minimal

WORKDIR /home/app

COPY package*.json .

USER root

RUN npm install 

COPY . .
 
RUN npm run build

#USER 1001

EXPOSE 8080

CMD ["npm", "start"]