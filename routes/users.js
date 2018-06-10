var express = require('express');
var router = express.Router();
var models = require('../models');

const { check, validationResult } = require('express-validator/check');

/* GET users listing. */
router.get('/', (req, res, next) => {
    models.User.findAll().then((users) => {
        res.render('users', {users: users});
        console.log('LOG : users successfully loaded ');
    });
});

/* POST new user */
router.post('/', [
    check('email').isEmail()
],(req, res, next) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
        //res.redirect('/users', {message:errors.msg});
    }

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
                res.send("user updated");
            })
        }
    })
});

/* DELETE user */
router.delete('/:id', (req, res, next) => {

    models.User.destroy({
        where : {id:  req.params.id}
    }).then((nbRows) => {
        res.send("user removed");
        console.log('LOG : user successfully removed ');
    });
})

module.exports = router;
