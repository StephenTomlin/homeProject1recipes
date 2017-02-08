"use strict"
const express = require('express')
const request = require('request');
const router  = express.Router();


router.get('/', function(req, res, next) {
  console.log(req.headers.searchparams)
  // console.log(req.headers.SearchParams.query)
  // var app_id = "448f67d9"
  // var app_key = "c21a694ca9204f51fa82d8ade53c791b"
  // var url = "http://api.yummly.com/v1/api/recipes"
  // var url_full = url + "?" + "_app_id=" + app_id + "&" + "_app_key=" + app_key
  //                     + "&q=" + req.headers.SearchParams['query']
  //                     + "&excludedIngredient[]=" + req.headers.SearchParams['excludedIngredient']

  request(req.headers.searchparams, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      // console.log(body);
      res.json(body);
    } else {
      res.json(error)
    }
  })


  // request(`http://api.yummly.com/v1/api/recipes?_app_id=448f67d9&_app_key=c21a694ca9204f51fa82d8ade53c791b&q=${req.headers.searchparams}&requirePictures=true&excludedIngredient[]=${req.headers.excludedIngredientParams}`, function(error, response, body) {
  //   if (!error && response.statusCode === 200) {
  //     console.log(body);
  //     res.json(body);
  //   } else {
  //     res.json(error)
  //   }
  // })
});
module.exports = router;
