FROM ubuntu:24.04

ENV DEBIAN_FRONTEND=noninteractive

# Cài Node.js bản mới (không xài snap)
RUN apt update && \
    apt install -y curl gnupg2 ca-certificates && \
    curl -fsSL https://deb.nodesource.com/setup_22.x | bash - && \
    apt install -y nodejs python3 make g++ git bash && \
    npm install -g npm

# App
WORKDIR /app
COPY . .
RUN npm install

EXPOSE 8080
CMD ["npm", "start"]
