'use strict';
const models = require('../models');

module.exports = (sequelize, DataTypes) => {
    const fromItem = sequelize.define('fromItem', {
        idItem: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        fromItemId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

    return fromItem;
};
