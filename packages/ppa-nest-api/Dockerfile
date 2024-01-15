# Use an official Node.js image as the base image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY ./package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY ./ ./

# Expose the port on which the NestJS application will run
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]
