FROM node:latest
LABEL author="participator"

COPY server ./server
CMD node server.js

EXPOSE 8080