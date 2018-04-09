'use strict';
const models = require('../models');

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('user', {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            isEmail: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    // }, {
    //     // classMethods: {
    //     //     associate: (models) => {
    //     //         user.belongsTo(models.role);
    //     //     }
    //     // },
    //     //paranoid: true,
    // }
    });
};
