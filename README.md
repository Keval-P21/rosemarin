# Rosemary

Rosemary is an easy to use web app built to help you search for new recipes and create and save your own recipes.

## Screenshots

<p align='center'>
<img src='./images/readme-screenshot.png' width='80%'/>
</p>

## Features

- Browse New Recipes
- Create and store your own recipes
- Create your own selection of favourited recipes
- Log in and out of your account

## Getting Started

Except the regulars (git, Node, npm), you will need the following to work on and run the Rosemary app, before _Installation_:

- [Postgresql](https://www.postgresql.org/)

## Installation

1. Clone this repo and enter!

```bash
   git clone https://github.com/fcaud/rosemarin.git
   cd rosemarin
```

2. Install dependencies in both the root folder and both the client and server folders.

```bash
  npm install               # ! root folder !
```

```bash
  cd client                 # ! Change into the client folder !
  npm install
```

```bash
  cd ../server              # ! Change into the server folder !
  npm install
```

3. Start PostgreSQL on your machine

4. Setup the .env files (.env.example file are given in both the client and server folder)

   - Enter your PostgreSQL database name, username and password into the **/server/.env** file
   - If you want to use the [Rapid API - Tasty](https://rapidapi.com/apidojo/api/tasty/) for all the recipes and not the mock data, please make an account with Rapid API and copy the API key and Host into the **/client/.env** file. You will also need to follow the instructions on the **/client/App.tsx** page (lines 54 - 62) and **/client/Utils/apiService.ts** files to enable fetching data from the API

5. Start the server

```bash
cd server
npm start                 # ! New terminal and change into the server !
```

6. Start the client

```bash
cd client                 # ! New terminal and change into the client folder !
npm start
```

## Technology Used

- [React](https://reactjs.org/)
- [Express.js](https://expressjs.com/)
- [Postgresql](https://www.postgresql.org/)
- [Sequelize](https://sequelize.org/)
- [Express Session](https://www.npmjs.com/package/express-session)

## Developers

- Freya Caudwell - [Github](https://github.com/fcaud) - [LinkedIn](https://www.linkedin.com/in/freya-caudwell/)
- Keval Patel - [Github](https://github.com/Keval-P21) - [LinkedIn](www.linkedin.com/in/keval-r-patel)
- Galyna Sukhovska- [GitHub](https://github.com/Gaale/rosemarin) - [LinkedIn](https://www.linkedin.com/in/sukhovska/)
