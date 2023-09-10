# Node.js API Project

This is a sample Node.js API project that demonstrates a typical project structure. It includes various components like controllers, models, routes, middleware, and helper functions.

## Project Structure

The project is organized as follows:

- `api/`
  - `controller/`: Contains controller modules for handling API logic.
  - `helper/`: Contains utility and helper functions.
  - `middleware/`: Contains custom middleware functions with authorization.
  - `models/`: Defines data models for the API.
  - `routes/`: Defines API routes and their associated controllers.

## Pre Requirement


1. Docker
2. Nodejs

## Getting Started

Follow these steps to set up and run the Node.js API:

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/nodejs-api-project.git
   cd node-rest-shop
### Options A to run mongodb is already running in docker
2. Run the project
   ```bash
   npm start
### Options B to run mongodb doesn't exist in docker
2. Run the project
   ```bash
   docker-compose up --build
3. API Call
   under the project folder there is postman-collection folder include postman api collection and env collection. Import it to the postman and you can call the api.

   ## project running on localhost:3000