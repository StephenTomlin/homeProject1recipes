"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.post('/', (req, res) => {
    console.log(req.body.firstParam)
    knex('favourites')
    .insert({
      fav_recipe: req.body.firstParam
    })
    .then((results) => {
      res.json(results)
    })
  })

  return router;
}

