var express = require('express');
var router = express.Router();
var models = require('../models');
var i18n = require('i18n');


//Appelle un questionnaire selon son code

router.get('/:code', function (req, res, next) {
    var code = req.params.code;
    models.Questionnaire.findOne({where: {code: code}}).then(function (questionnaire) {
        //Si aucun resultat -> redirection vers la home utilisateur avec un message d'erreur
        if (questionnaire === null) {
            res.render('index', {title: i18n.__('MHAVIE'), msg: i18n.__("Le test %s n'existe pas", code)})
        }
        questionnaire = questionnaire.dataValues;

        //Si la question suivante dépasse le numéro max des question enregistrées -> page de validation
        models.Question.max('number').then(max => {
            if(questionnaire.last_question > max)
            {
                res.render('validation',{code:code,question:questionnaire.last_question - 1});
            }
        });

        //Si resultat ok -> affichage le formulaire sur la derniere question affichée lors de la saisie précédente
        models.Question.findOne({
            where: {number: questionnaire.last_question},
            include: [models.Categorie]
        }).then(function (question) {


            //Recherche de la question, si elle a été enregistrée
            models.Reponse.findOne({
                where: {
                    questionnaire_id: questionnaire.id,
                    question_id: question.id
                }
            }).then(function (reponse) {
                //Si question non répondue affichage de la question sans réponse
                if(reponse === null)
                {
                    res.render('test_mhavie_questions', {title: i18n.__('Test'), code: code, question: question, questionnaire:questionnaire})
                }
                //Si question répondue affichage de la question avec valeur des réponses
                else
                {
                    res.render('test_mhavie_questions', {title: i18n.__('Test'), code: code, question: question, reponse: reponse.dataValues, questionnaire:questionnaire})
                }
            })

        })
    })
});

//Post de la question
router.post('/:code/:question', function (req, res, next) {
    var code = req.params.code;
    var questionNb = req.params.question;
    //next = valeur du bouton utilisé (suivant ou précédent)
    var next = req.body.next;
    var value = req.body.valueInput;
    var satisfaction = req.body.satisfactionInput;

    if(value=="")
    {
        value = -2;
    }

    models.Questionnaire.findOne({where: {code: code}}).then(function (questionnaire) {
        // on enregistre la dernière question selon le number de la question +/- 1 selon la valeur du bouton utilisé (suivant ou précédent)
        questionnaire.last_question = Number(questionNb) + Number(next);
        questionnaire.save({fields: ['last_question']});


        // création ou edition des valeurs des réponses selon si la question a déjà été répondue dans le questionnaire
        models.Question.findOne({where: {number: questionNb}}).then(function (question) {

            models.Reponse.findOrCreate({
                where: {
                    questionnaire_id: questionnaire.id,
                    question_id: question.id
                }
            }).spread(function (response, created) {
                if(value!=null)
                {
                    response.value = value;
                    response.satisfaction = satisfaction;
                    response.save({fields: ['value', 'satisfaction']}).then(function (e) {
                        res.redirect(global.prefix+'test/' + code);
                    })
                }
                else
                {
                    res.redirect(global.prefix+'test/' + code);
                }

            })

        })

    });
});

//creation d'un formulaire (code + timestamp)
router.post('/', function (req, res, next) {
    var code = generateCode();
    models.Questionnaire.create({
        date: new Date(),
        code: code
    }).then(function (questionnaire) {
        //recherches des question et enregistrement pas defaut (afin de garder l'ordre et avoir des données pour le rapport)
        models.Question.findAll().then(function(questions){
            questions = questions;
            for(let q of questions)
            {

                models.Reponse.create({
                    value:-2,
                    satisfaction:0,
                    questionnaire_id:questionnaire.id,
                    question_id:q.id,
                })
            }
            res.redirect(global.prefix+'test/' + code);

        });
    }).catch(function (err) {
        res.redirect(307, global.prefix+'test');
    });
});


module.exports = router;

// méthode pour générer un code de 8 caractères de A-Z et 0-9 (moins 0 et O, I et 1 pour éviter la confusion)
// 1 099 511 627 776 possibilités avec 8 caractères
//si besoin on ajoute juste un numero au code
function generateCode() {
    var text = "";
    var possible = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    for (var i = 0; i < 8; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}
