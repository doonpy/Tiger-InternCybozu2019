var express = require('express');
var router = express.Router();
var assert = require('assert');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/tdddemo', function (req, res, next) {
  var user = req.body;
  // console.log(user);
  res.status(200).send(user);
});





module.exports = router;
