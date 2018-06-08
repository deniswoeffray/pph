var express = require('express');
var router = express.Router();
var models = require('../models');

/* GET users listing. */
router.get('/', (req, res, next) => {
    models.User.findAll().then((users) => {
        res.render('users', {users: users});
        console.log('LOG : users successfully loaded ')
    });
});

/* POST new user */
router.post('/', (req, res, next) => {
    models.User.create({
        nom: req.body.lastname,
        prenom: req.body.firstname,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
    }).then(() => {
        console.log('LOG : user successfully added ')
        res.redirect('/users');
    })
});

/* PUT to update user */
router.put('/', (req, res, next) => {
    models.User.update({
        nom: req.body.lastname,
        prenom: req.body.firstname,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
    },{
        where : {id: req.body.id}
    }).then((nbRows) => {
        console.log('LOG : user successfully updated ')
        res.redirect('/users');
    });
});


/* DELETE user */
router.delete('/:id', (req, res, next) => {

    models.User.destroy({
        where : {id:  req.params.id}
    }).then((nbRows) => {
        res.send(`user deleted!'`);
        console.log('LOG : user successfully removed ')
    });
})

module.exports = router;
