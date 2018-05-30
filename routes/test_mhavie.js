var express = require('express');
var router = express.Router();
var models = require('../models');
/* GET home page. */
router.get('/:code', function (req, res, next) {
    var code = req.params.code;
    models.Questionnaire.findOne({where: {code: code}}).then(function (questionnaire) {
        if (questionnaire === null) {
            res.render('index', {title: 'Test', msg: "Le test " + code + " n'existe pas"})
        }
        questionnaire = questionnaire.dataValues;
        models.Question.findOne({
            where: {number: questionnaire.last_question},
            include: [models.Categorie]
        }).then(function (question) {

            //TODO récupérer la réponse si elle existe et l'afficher dans la vue test_mhavie_questions
            res.render('test_mhavie_questions', {title: 'Test', code: code, question: question});

        })
    })
});


router.post('/:code/:question', function (req, res, next) {
    var code = req.params.code;
    var questionNb = req.params.question;
    var next = req.body.next;
    var value = req.body.valueInput;
    var satisfaction = req.body.satisfactionInput;

    models.Questionnaire.findOne({where: {code: code}}).then(function (questionnaire) {
        questionnaire.last_question = Number(questionNb) + Number(next);
        questionnaire.save({fields: ['last_question']});
        models.Question.findOne({where: {number: questionNb}}).then(function (question) {
            models.Reponse.findOrCreate({
                where: {
                    questionnaire_id: questionnaire.id,
                    question_id: question.id
                }
            }).spread(function (response, created) {
                response.value = value;
                response.satisfaction = satisfaction;
                response.save({fields: ['value', 'satisfaction']}).then(function (e) {
                    res.redirect('/test/' + code);
                })
            })

        })

    });
});
router.post('/', function (req, res, next) {
    var code = generateCode();
    models.Questionnaire.create({
        date: new Date(),
        code: code
    }).then(function (item) {
        res.redirect('/test/' + code);
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
