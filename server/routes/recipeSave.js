"use strict";

const express = require('express');
const router  = require express.Router();

module.exports = (knex) => {

  router.post('/', (req, res) => {
    knex('users').insert({

    })
  })
}
