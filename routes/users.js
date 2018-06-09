var express = require('express');
var router = express.Router();
var models = require('../models');

/* GET users listing. */
router.get('/', (req, res, next) => {
    models.User.findAll().then((users) => {
        res.render('users', {users: users});
        console.log('LOG : users successfully loaded ');
    });
});

/* POST new user */
router.post('/', (req, res, next) => {
    models.User.create({
        nom: req.body.lastname,
        prenom: req.body.firstname,
        email: req.body.email,
        password_clear: req.body.password,
        role: req.body.role
    }).then(() => {
        console.log('LOG : user successfully added ');
        res.redirect('/users');
    })
});

/* PUT to update user */
router.put('/', (req, res, next) => {
    console.log(req.body);
    models.User.findOne({where:{id:req.body.id}}).then(function (user) {
        if(req.body.password_clear === user.password) {
            user.update({
                nom: req.body.nom,
                prenom: req.body.prenom,
                email: req.body.email,
                // password not saved
                role: req.body.role
            }).then(function () {
                console.log("password not modified");
                res.send("user updated");
            })
        } else {
            user.update({
                nom: req.body.nom,
                prenom: req.body.prenom,
                email: req.body.email,
                password_clear: req.body.password_clear,
                role: req.body.role
            }).then(function(){
                console.log("password modified");
                res.send(i18n.__("utilisateur mis à jour"));
            })
        }
    })
});

/* DELETE user */
router.delete('/:id', (req, res, next) => {

    models.User.destroy({
        where : {id:  req.params.id}
    }).then((nbRows) => {
        res.send(i18n.__('utilisateur supprimé'));
        console.log('LOG : user successfully removed ');
    });
})

module.exports = router;
