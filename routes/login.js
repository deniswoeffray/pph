var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('login', { title: 'Login'});
});

router.post('/', function(req, res, next) {
    res.send('login attempt ok');
});

module.exports = router;