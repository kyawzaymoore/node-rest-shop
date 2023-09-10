# Use the official Node.js image as your base image
FROM node:lts-alpine

# Define default values for environment variables
ARG NODE_ENV=production

# Set environment variables with default values
ENV NODE_ENV=${NODE_ENV}

# Copy the appropriate environment file (env.production)
COPY .env.${NODE_ENV} .env

# Set the working directory
WORKDIR /usr/src/app

# Install nodemon globally
RUN npm install -g nodemon

# Copy package.json, package-lock.json, and npm-shrinkwrap.json
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]

# Install all dependencies including development dependencies
RUN npm install --production --silent && mv node_modules ../

# Copy the rest of the application code
COPY . .

# Expose the port your application will run on
EXPOSE 3000

# Change ownership of the working directory to the "node" user
RUN chown -R node /usr/src/app

# Use the "node" user to run the application
USER node

# Specify the command to start your application based on NODE_ENV
CMD ["npm", "start"]
