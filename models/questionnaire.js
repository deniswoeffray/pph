'use strict';
module.exports = (sequelize, DataTypes) => {
    const Questionnaire = sequelize.define('Questionnaire', {
        id: {type:DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        code: {type:DataTypes.STRING, unique: true},
        date: DataTypes.DATE,
        last_question: {type: DataTypes.INTEGER, defaultValue: 1},
        finished: {type: DataTypes.BOOLEAN, defaultValue: false}
    }, {
        tableName: 'questionnaire',
        timestamps: false
    });
    return Questionnaire
};