"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const app         = express();

const knexConfig = require("./knexfile");
const knex       = require("knex")(knexConfig[ENV]);
const knexLogger = require('knex-logger');

const recipeSearchRoute = require("./routes/recipe.js")

app.use(function(req,res,next) {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Headers", "Origin, SearchParams, X-Requested-With, Content-Type, Accept");
  next();

})

// Mount all resource routes

app.use("/api/recipes", recipeSearchRoute)

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});