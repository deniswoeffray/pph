'use strict';
var models = require('../models');

module.exports = (sequelize, DataTypes) => {
    const Reponse = sequelize.define('Reponse', {
        id: {type:DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        value: DataTypes.INTEGER,
        satisfaction: DataTypes.INTEGER
    }, {
        tableName: 'reponse',
        timestamps: false
    });

    Reponse.associate = (models) => {
        Reponse.belongsTo(models.Questionnaire, {foreignKey: 'questionnaire_id'})
        Reponse.belongsTo(models.Question, {foreignKey: 'question_id'})
    };

    return Reponse
};