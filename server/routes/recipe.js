"use strict"
const express = require('express')
const request = require('request');
const router  = express.Router();


router.get('/', function(req, res, next) {
  console.log(req.headers.searchparams)
  request(`http://api.yummly.com/v1/api/recipes?_app_id=448f67d9&_app_key=c21a694ca9204f51fa82d8ade53c791b&q=${req.headers.searchparams}&requirePictures=true`, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      console.log(body);
      res.json(body);
    } else {
      res.json(error)
    }
  })
});
module.exports = router;
