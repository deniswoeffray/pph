var express = require('express');
var router = express.Router();
var models = require('../models');
/* GET home page. */
router.get('/:code', function (req, res, next) {
    var code = req.params.code;
    models.Questionnaire.findOne({where: {code: code}}).then(function (i) {
        console.log(i);
        if(i === null)
        {
            res.render('index', {title: 'Test', msg: "Le test "+code+" n'existe pas"})
        }
        res.render('test_mhavie_questions', {title: 'Test', code: code+"..."})
    })
});

router.post('/', function (req, res, next) {
    var code = generateCode();
    models.Questionnaire.create({
        date: new Date(),
        code: code
    }).then(function (item) {
        res.redirect('/test/'+code);
    }).catch(function (err) {
        res.redirect(307, '/test');
    });
});

module.exports = router;


function generateCode() {
    var text = "";
    var possible = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
    for (var i = 0; i < 8; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}
