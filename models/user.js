'use strict';

const bcrypt = require('bcrypt');
const salt = 10;

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {type:DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        nom: DataTypes.STRING,
        prenom: DataTypes.STRING,
        email: DataTypes.STRING,
        password : DataTypes.STRING,
        password_clear : {
            type: DataTypes.VIRTUAL,
            set: function (val) {
                // Remember to set the data value, otherwise it won't be validated
                this.setDataValue('password_clear', val);
                this.setDataValue('password', bcrypt.hashSync(val, salt));
            },
            validate: {
                isLongEnough: (val) => {
                    if (val.length < 4) {
                        throw new Error("Please choose a longer password")
                    }
                }
            }
        },
        role: DataTypes.STRING
    }, {
        tableName: 'user',
        timestamps: false
    });
    
    return User
};