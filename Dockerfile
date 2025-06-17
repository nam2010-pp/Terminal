FROM ubuntu:22.04

# Có quyền root rồi nên muốn làm gì cũng được
RUN apt update && \
    apt install -y curl git bash nodejs npm

WORKDIR /app
COPY . .
RUN npm install

EXPOSE 8080
CMD ["node", "server.js"]
