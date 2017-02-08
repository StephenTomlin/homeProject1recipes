"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.post('/', (req, res) => {
    console.log()
    knex('favourites')
    .insert({
      id: 1,
      fav_recipe: req.body.firstParam
    })
  })

  return router;
}

