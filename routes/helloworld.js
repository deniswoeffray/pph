var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
    console.log("router2");
    res.render('helloworld', { title: 'Hello world !' });
});

module.exports = router;
