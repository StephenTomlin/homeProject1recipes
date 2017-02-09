"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.post('/', (req, res) => {
    console.log(req.body.firstParam)
    knex('fridge')
    .insert({
      id: 1,
      ingredients: req.body.firstParam
    })
    .then((results) => {
      res.json(results)
    })
  }),

  router.get('/', (req, res) => {
    knex.select('*')
    .from('fridge')
    .where('id', '=', 1)
    .then((results) => {
      res.json(results)
    })
  }),

  router.delete('/', (req, res) => {
    console.log(req.header)
    knex('fridge')
    .where({
      id: 1,
      ingredients: req.header.searchparams
    })
    .del()
    .then((results) => {
      res.json(results)
    })
  })

  return router;
}
