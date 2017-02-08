"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require('express');
const app         = express();

const knexConfig = require('./knexfile');
const knex       = require('knex')(knexConfig[ENV]);
const morgan     = require('morgan');
const bodyParser  = require("body-parser");
const knexLogger = require('knex-logger');

const recipeSearchRoute = require("./routes/recipe.js");
const recipeSaveRoute   = require("./routes/recipeSave.js");
const fridgeRoute       = require("./routes/fridge.js")

// Load requirements
const http = require('http');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.use(function(req,res,next) {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Headers", "Origin, SearchParams, X-Requested-With, Content-Type, Accept");
  next();
})

// Mount all resource routes

app.use("/api/recipes", recipeSearchRoute);
app.use("/api/recipeSave", recipeSaveRoute(knex));
app.use("/api/fridge", fridgeRoute(knex));

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
