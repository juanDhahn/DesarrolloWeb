//     "matches": [
//         {
//id summoner
//             "lane": "MID",
//             "gameId": 567587094,
//             "champion": 142,
//             "platformId": "LA2",
//             "timestamp": 1523211023066,
//             "queue": 430,
//             "role": "SOLO",
//             "season": 11
//         },
'use strict';
// const models = require('../models');

module.exports = (sequelize, DataTypes) => {
    const matchlist = sequelize.define('matchlist', {
        lane: {
            type: DataTypes.STRING,
            allowNull: false
        },
        gameId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        champion:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        platformId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        timestamp: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        queue: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false
        },
        season: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

    matchlist.associate =  (models) => {
        matchlist.belongsToMany(models.summoner, {
            through: 'summonerMatchList',
            foreignKey: 'gameId'
        });

        matchlist.belongsToMany(models.match, {
            through: 'listM',
            as: 'listMatch'
        });

    };

    return matchlist;
};
