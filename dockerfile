# Use official Node.js image as base
FROM node:18 AS build

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy app source code
COPY . .

# Build Angular app
RUN npm run build

# Use Nginx image to serve Angular app in production
FROM nginx:alpine

# Copy built Angular app from previous stage to Nginx directory
COPY --from=build /usr/src/app/dist/standard-bank-pokemon-web /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
