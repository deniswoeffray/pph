var express = require('express');
var router = express.Router();
var i18n = require('i18n');

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log("router2");
    res.render('helloworld', { title: i18n.__('Hello world !') });
});

module.exports = router;
