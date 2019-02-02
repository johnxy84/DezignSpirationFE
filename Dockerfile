# Use the predefined node base image for this module.
FROM node:7.0.0

RUN apt-get update && apt-get install nano

# create the log directory
RUN mkdir -p /var/log/applications/dezignspirationfe

# Add the content of our local directory to our container and set our working directory
RUN mkdir /src
ADD . /src
WORKDIR /src

# nodemon to keep the server alive for development purposes
# pm2 to run our applciation on a server
RUN npm install nodemon pm2 -g

# Install node dependencies
COPY package.json /src
RUN npm install

# Map a volume for the log files and add a volume to override the code
VOLUME ["/src", "/var/log/applications/dezignspirationfe"]

# Expose web service and nodejs debug port
EXPOSE 44400

CMD [ "node", "server.js" ]