var express = require('express');
var router = express.Router();
var assert = require('assert');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/tdddemo', function (req, res, next) {
  var q = req.query;
  console.log(q.username);
  res.send(q)
});

module.exports = router;
