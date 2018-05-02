'use strict';
const models = require('../models');
module.exports = (sequelize, DataTypes) => {
    const league = sequelize.define('league', {
        summonerId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        server: {
            type: DataTypes.STRING,
            allowNull: false
        },
        soloWins: {
            type: DataTypes.INTEGER,
        },
        soloLosses: {
            type: DataTypes.INTEGER,
        },
        soloLeagueName: {
            type: DataTypes.STRING,
        },
        soloRank: {
            type: DataTypes.STRING,
        },
        soloLeagueId: {
            type: DataTypes.STRING,
        },
        soloTier: {
            type: DataTypes.STRING,
        },
        soloLeaguePoints: {
            type: DataTypes.INTEGER,
        },

        flexWins: {
            type: DataTypes.INTEGER,
        },
        flexLosses: {
            type: DataTypes.INTEGER,
        },
        flexLeagueName: {
            type: DataTypes.STRING,
        },
        flexRank: {
            type: DataTypes.STRING,
        },
        flexLeagueId: {
            type: DataTypes.STRING,
        },
        flexTier: {
            type: DataTypes.STRING,
        },
        flexLeaguePoints: {
            type: DataTypes.INTEGER,
        }
    });
    league.associate =  (models) => {
        league.belongsToMany(models.summoner, {
            through: 'sleague',
            as : 'summonerLeague',
        });
    };
    return league;
};

