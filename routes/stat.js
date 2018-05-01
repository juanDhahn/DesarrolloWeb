const express = require('express');
const router = express.Router();
const axios = require('axios');
const apiKey = "6a150049b8fff764c64f75489d6d7664";
const models = require('../models');

router.get('/', (req, res) => {
    res.json({
        title: 'Estadisticas'
    })
});

router.get('/insertStatistics', (req, res) => { // ID, role y Winrates de todos los campeones
    let url = 'http://api.champion.gg/v2/champions?champData=winRate&sort=winRate-desc&limit=250&api_key=' + apiKey;

    axios.get(url)
        .then(function (response) {
            let stats = response.data;
            let keys = Object.keys(stats);

            for(let i=0;i<stats.length;i++){
                let key = stats[i];
                // Estadisticas Basicos del Campeon

                let id = stats[key].championId; // ID de Campeon
                let role = stats[key].role; // Rol Correspondiente
                let winRate = stats[key].winRate; // Su razon de victorias con el Rol que esta jugando

                let kills = stats[key].kills; // Promedio de Kills
                let deaths = stats[key].deaths; // Promedio de Muertes
                let assists = stats[key].assists; // Promedio de Asistencias

                let gamesPlayed = stats[key].gamesPlayed; // Partidos Jugados
                let percentRolePlayed = stats[key].percentRolePlayed; // El Porcentaje de veces que el Campeon juega como este Rol
                let banRate = stats[key].banRate; // Razon de Bans
                let goldEarned = stats[key].goldEarned; // Promedio del Oro que gana en un partido
                // Todas las Estadisticas mas Complejas
                // Items Iniciales - Mas Popular

                let firstItemCount = stats[key].hashes.firstitemshash.highestCount.count // cantidad de veces repetido
                let firstItemWins = stats[key].hashes.firstitemshash.highestCount.wins // numero de victorias
                let firstItemWinRate = stats[key].hashes.firstitemshash.highestCount.winRate // razon de victorias
                let firstItemHash = stats[key].hashes.firstitemshash.highestCount.hash // IDs de los objetos
                // Items Finales - Mas Popular

                let finalItemCount = stats[key].hashes.finalitemshashfixed.highestCount.count // cantidad de veces repetido
                let finalItemWins = stats[key].hashes.finalitemshashfixed.highestCount.wins // numero de victorias
                let finalItemWinRate = stats[key].hashes.finalitemshashfixed.highestCount.winRate // razon de victorias
                let finalItemHash = stats[key].hashes.finalitemshashfixed.highestCount.hash // IDs de los objetos
                // Orden de Habilidades - Mas Popular

                let skillCount = stats[key].hashes.skillorderhash.highestCount.count // cantidad de veces repetido
                let skillWins = stats[key].hashes.skillorderhash.highestCount.wins // numero de victorias
                let skillWinRate = stats[key].hashes.skillorderhash.highestCount.winRate // razon de victorias
                let skillHash = stats[key].hashes.skillorderhash.highestCount.hash // IDs de los objetos
                // Habilidades de Summoner - Mas Popular

                let summonerCount = stats[key].hashes.summonershash.highestCount.count // cantidad de veces repetido
                let summonerWins = stats[key].hashes.summonershash.highestCount.wins // numero de victorias
                let summonerWinRate = stats[key].hashes.summonershash.highestCount.winRate // razon de victorias
                let summonerHash = stats[key].hashes.summonershash.highestCount.hash // IDs de los objetos
                // Runas Ocupadas - Mas Popular

                let runeCount = stats[key].hashes.runehash.highestCount.count // cantidad de veces repetido
                let runeWins = stats[key].hashes.runehash.highestCount.wins // numero de victorias
                let runeWinRate = stats[key].hashes.runehash.highestCount.winRate // razon de victorias
                let runeHash = stats[key].hashes.runehash.highestCount.hash // IDs de los objetos

                // Al registrar estos 3 stats, se guardan todos los datos obtenidos
                if (id && winRate && role) { 
                    models.stat.create({
                        id: id,
                        role: role,
                        winRate: winRate,

                        kills: kills,
                        deaths: deaths,
                        assists: assists,

                        gamesPlayed: gamesPlayed,
                        percentRolePlayed: percentRolePlayed,
                        banRate: banRate,
                        goldEarned: goldEarned,

                        firstItemCount: firstItemCount,
                        firstItemWins: firstItemWins,
                        firstItemWinRate: firstItemWinRate,
                        firstItemHash: firstItemHash,

                        finalItemCount: finalItemCount,
                        finalItemWins: finalItemWins,
                        finalItemWinRate: finalItemWinRate,
                        finalItemHash: finalItemHash,

                        skillCount: skillCount,
                        skillWins: skillWins,
                        skillWinRate: skillWinRate,
                        skillHash: skillHash,

                        summonerCount: summonerCount,
                        summonerWins: summonerWins,
                        summonerWinRate: summonerWinRate,
                        summonerHash: summonerHash,

                        runeCount: runeCount,
                        runeWins: runeWins,
                        runeWinRate: runeWinRate,
                        runeHash: runeHash
                    })
                    .then(stat => {
                        if (stat) {
                            res.json({
                                status: 1,
                                statusCode: 'stat/created',
                                data: stat.toJSON()
                            });
                        } else {
                            res.status(400).json({
                                status: 0,
                                statusCode: 'stat/error',
                                description: "Couldn't create the stat"
                            });
                        }
                    })
                    .catch(error => {
                        res.status(400).json({
                            status: 0,
                            statusCode: 'database/error',
                            description: error.toString()
                        });
                    });
                } else {
                    res.status(400).json({
                        status: 0,
                        statusCode: 'stat/wrong-body',
                        description: 'The body is wrong! :('
                    });
                }
            }

        })
        .catch(function (error) {
           console.log(error);
        });
});

router.get('/recover/all', (req, res, next)=>{
    models.stat
    .findAll()
    .then(stat=>{
        if (stat){
            res.json({
                status: 1,
                data: stat
            });
        } else {
            res.status(400).json({
                status:0
            });
        }
    })
    .catch(error => {
        res.status(400).json({
            status:0
        });
    });
});

module.exports = router;