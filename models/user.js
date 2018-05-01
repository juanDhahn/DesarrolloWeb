'use strict';
const models = require('../models');

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('user', {
        uid: {
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
