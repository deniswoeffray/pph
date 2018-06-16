var express = require('express');
var bcrypt = require('bcrypt');
var router = express.Router();
var models = require('../models');
var i18n = require ('i18n');

/* GET home page. */
router.get('/', function(req, res, next) {
    //TODO delete these lines after development
    models.User.findOrCreate({
        where:{nom:'admin'},
        defaults: {nom: 'admin', prenom:'admin', email:'admin@admin.loc', password_clear:'pph12345',role:'admin'}
    }).spread(function (user,created){
        if(created) {
            console.log("ADMIN CREATED");
        }
    })

    res.render('login', { title: 'Connexion' });
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
                    res.redirect(global.prefix);
                } else {
                    // Passwords don't match
                    req.flash('error', i18n.__('Mot de passe incorrect'));
                    res.redirect(global.prefix+'login');
                }
            });
        }else{
            // user not found
            req.flash('error', i18n.__('Utilisateur non trouvé'));
            res.redirect(global.prefix+'login');
        }
    });
});

module.exports = router;