# Base image
FROM node:18.15-bullseye-slim

# Set environment variables
ENV NODE_ENV=production

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm ci 

# Bundle app source
COPY . .

# Expose port
EXPOSE 3000

# Start the server
CMD [ "node", "app.js" ]
