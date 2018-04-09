'use strict';
const models = require('../models');

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('champions', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        armor: {
            type: DataTypes.FLOAT,
        },
        armorPerLevel: {
            type: DataTypes.FLOAT,
        },
        attackDamage: {
            type: DataTypes.FLOAT,
        },
        attackDamagePerLevel: {
            type: DataTypes.FLOAT,
        },
        attackRange: {
            type: DataTypes.FLOAT,
        },
        attackSpeedOffSet: {
            type: DataTypes.FLOAT,
        },
        attackSpeedPerLevel: {
            type: DataTypes.FLOAT,
        },
        crit: {
            type: DataTypes.FLOAT,
        },
        critPerLevel: {
            type: DataTypes.FLOAT,
        },
        hp: {
            type: DataTypes.FLOAT,
        },
        hpPerLevel: {
            type: DataTypes.FLOAT,
        },
        hpRegen: {
            type: DataTypes.FLOAT,
        },
        hpRegenPerLevel: {
            type: DataTypes.FLOAT,
        },
        moveSpeed: {
            type: DataTypes.FLOAT,
        },
        mp: {
            type: DataTypes.FLOAT,
        },
        mpPerLevel: {
            type: DataTypes.FLOAT,
        },
        mpRegen: {
            type: DataTypes.FLOAT,
        },
        mpRegenPerLevel: {
            type: DataTypes.FLOAT,
        },
        spellBlock: {
            type: DataTypes.FLOAT,
        },
        spellBlockPerLevel: {
            type: DataTypes.FLOAT,
        }
    });
};
