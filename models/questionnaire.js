'use strict';
module.exports = (sequelize, DataTypes) => {
    const Questionnaire = sequelize.define('Questionnaire', {
        id: {type:DataTypes.STRING, primaryKey: true},
        code: DataTypes.STRING,
        date: DataTypes.DATE,
        last_question: DataTypes.INTEGER,
        finished: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false},
    }, {
        tableName: 'questionnaire',
        timestamps: false
    });
    return Questionnaire
};