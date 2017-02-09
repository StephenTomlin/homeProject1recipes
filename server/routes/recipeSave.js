"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.post('/', (req, res) => {
    console.log(req.body.firstParam)
    knex('favourites')
    .insert({
      id: 1,
      fav_recipe: req.body.firstParam
    })
    .then((results) => {
      res.json(results)
    })
  }),

  router.get('/', (req, res) => {
    knex.select('*')
    .from('favourites')
    .where('id', '=', 1)
    .then((results) => {
      res.json(results)
    })
  }),

  router.delete('/', (req, res) => {
    knex('favourites')
    .where({
      id: 1,
      fav_recipe: req.headers.searchparams
    }).del()
    .then((results) => {
      res.json(results)
    })
  })

  return router;
}

