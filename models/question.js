'use strict';

let models = require('../models');

module.exports = (sequelize, DataTypes) => {
    const Question = sequelize.define('Question', {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        position: DataTypes.INTEGER,
        number: DataTypes.INTEGER,
        question: DataTypes.STRING,
        description: DataTypes.STRING,
        obligatoire: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false}
    }, {
        tableName: 'question',
        timestamps: false
    });


    Question.associate = (models) => {
        Question.belongsTo(models.Categorie, {foreignKey: 'category_id'})
    };

    return Question
}