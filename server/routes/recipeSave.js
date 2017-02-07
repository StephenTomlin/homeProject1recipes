"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.post('/', (req, res) => {
    knex('favourites').insert({
      fav_recipe: req.item
    })
  })
}
