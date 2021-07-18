FROM node:12
WORKDIR /NCSRT
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install
COPY . .
EXPOSE 5000
CMD [ "nodemon" ]