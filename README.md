# Northcoders Games Frontend

## Summary

This is the frontend for an [API](https://github.com/LastJohahn/nc-games-backend) of games reviews, written as part of a [Northcoders Bootcamp](https://northcoders.com/), using `React Native` and `Node.js` (minimum version 15.8), and polished up and completed after the end of the course. It works very similarly to any reddit-style app, allowing you to vote on comments etc. You can find the hosted version [here](https://nc-games-lastjohahn.netlify.app/).

## Installation

If you wish to have a play about with this yourself, feel free to fork and clone the repo here on github.

Once you have run `npm install` to get all your dependencies set up, you're good to start having a poke around! To run locally, use the script `npm start`.

## Setup for attached database

In `./src/utils/api.js` you will find

```
const gamesApi = axios.create({
  baseURL: "https://nc-games-api-lastjohahn.herokuapp.com/api",
});
```

Simply replace the baseURL with your own backend API and make sure all the other util functions in that file work for the structure of your API, and you're good to go!
