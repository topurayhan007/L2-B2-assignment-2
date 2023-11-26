# L2-B2-assignment-2

## Prerequisites

Make sure you have the following installed on your computer:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
  or
- [yarn](https://classic.yarnpkg.com/lang/en/docs/install/)

## Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/topurayhan007/L2-B2-assignment-2
   ```

2. Open your code editor and locate to the cloned folder

Run this command in the project directory to open VSCode

  ```bash (use it to open in VSCode)
    code .
  ```

3. Now install all dependecies using the following commands

  ```bash
    npm install
  ```

## Setup Environment Variables

1. Create a `.env` file in the root of the directory

2. Inside the `.env` file paste these and replace with your environment variables

  ```bash
    NODE_ENV=your_node_environment_development_or_production
    PORT=your_port_number
    DATABASE_URL=your_mongodb_url
    BCRYPT_SALT_ROUNDS=your_numeric_salt_rounds_number
  ```

## Run The Application

1. In the terminal run the following command

  ```bash
    npm run start:dev
  ```

Or, to run in production use this

  ```bash
    npm run start:prod
  ```

## Vercel Deployment

1. To deploy the project in vercel follow this [article](https://shadowsmith.com/thoughts/how-to-deploy-an-express-api-to-vercel)

# Thanks for reading, enjoy!
