var express = require('express');
var bcrypt = require('bcrypt');
var router = express.Router();
var models = require('../models');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('login', { title: 'Login' });
});

router.post('/', function(req, res, next) {
    var email = req.body.email;
    var password = req.body.password;

    // récupération de l'utilisateur dans la db selon l'email fourni
    models.User.findOne({where: {email: email}}).then(function (user) {
        if (user) {
            // vérification du hash du password de l'utilisateur
            bcrypt.compare(password, user.password, function (error, result) {
                if (result) {
                    // Passwords match
                    // ajout de l'utilisateur à la session
                    // redirection vers page index
                    req.session.user = user;
                    req.session.authenticated = true;
                    res.redirect('/');
                } else {
                    // Passwords don't match
                    req.flash('error', 'Incorrect password!');
                    res.redirect('/login');
                }
            });
        }else{
            // user not found
            req.flash('error', 'User not found!');
            res.redirect('/login');
        }
    });
});

module.exports = router;