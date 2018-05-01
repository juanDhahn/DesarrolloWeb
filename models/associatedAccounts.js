'use strict';

const models = require('../models');

module.exports = (sequelize, DataTypes) => {
    const userSummoner = sequelize.define('userSummoner', {
        token: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        }

    });
    userSummoner.associate =  (models) => {
        userSummoner.belongsToMany(models.summoner, {
            through: 'associateUserSum',
            as : 'userSummonerX',
            unique: true
        });
    };
    return userSummoner;
};
