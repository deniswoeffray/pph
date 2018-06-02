'use strict';
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {type:DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        nom: DataTypes.STRING,
        prenom: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        role: DataTypes.STRING
    }, {
        tableName: 'user',
        timestamps: false
    });
    
    return User
};