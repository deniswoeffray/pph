var express = require('express');
var router = express.Router();
var models = require('../models');

/* GET home page. */
router.get('/:code', function (req, res, next) {
    var code = req.params.code;
    //find questionnaire
    models.Questionnaire.findOne({where: {code: code}}).then(function (questionnaire) {
        //find reponses of the questionnaire with questions and categories
        models.Reponse.findAll({
            where: {questionnaire_id: questionnaire.id},
            include: [{model: models.Question, include: [{model: models.Categorie}]}]
        }).then(function (reponses) {
            res.render('rapport', {code: questionnaire.code, reponses: reponses});
        })
    });
});

module.exports = router;
