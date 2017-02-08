"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.post('/', (req, res) => {
    console.log(req.body.firstParam)
    knex('fridge')
    .insert({
      id: 1,
      ingredient: req.body.firstParam
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
    knex('fridge')
    .where({
      id: 1,
      ingredient: req.header.searchparams
    })
    .then((results) => {
      res.json(results)
  })

  return router;
}
