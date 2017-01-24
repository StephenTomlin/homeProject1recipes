"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const app         = express();

const recipeSearchRoute = require("./routes/recipeSave.js")

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});