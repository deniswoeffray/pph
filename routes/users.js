var express = require('express');
var router = express.Router();
var models = require('../models');

/* GET users listing. */
router.get('/', (req, res, next) => {
    models.User.findAll().then((users) => {
        res.render('users', {users: users});
    });
});

module.exports = router;
