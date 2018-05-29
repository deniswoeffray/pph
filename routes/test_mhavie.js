
var express = require('express');
var router = express.Router();
var models = require('../models');
/* GET home page. */
router.get('/', function(req, res, next) {
    models.Questionnaire.findAll().then(questionnaires=>{
        console.log(questionnaires);
        res.render('test_mhavie', { title: 'Test', questionnaires: questionnaires});
    });
});

module.exports = router;
