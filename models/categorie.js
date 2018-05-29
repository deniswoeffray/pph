'use strict';

var models = require('../models');

module.exports = (sequelize, DataTypes) => {
    const Categorie = sequelize.define('Categorie', {
        id: {type:DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        position: DataTypes.INTEGER,
        name: DataTypes.STRING
    }, {
        tableName: 'category',
        timestamps: false
    });

    // Categorie.associate = (models)=>{
    //     Categorie.hasMany(models.Question)
    // }

    return Categorie
};