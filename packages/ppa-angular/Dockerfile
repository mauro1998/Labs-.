# Use Node.js image as a base image
FROM node:21-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY ./package*.json ./

# Install dependencies
RUN npm install
RUN npm install -g @angular/cli

# Copy the entire project to the container
COPY ./ ./

# Expose port 4200 for the Angular app
EXPOSE 4200

# Start the Angular development server
CMD npm run start:docker