# Use the official Node.js image as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install production dependencies
RUN npm install --production

# Copy the rest of the application code
COPY . .

# Expose the port your Express app listens on
# Replace with the actual port your Express app uses
EXPOSE 3000 

# Command to run the application
CMD ["npm", "start"]




