const express = require('express');
const router = express.Router();
const models = require('../models');
const axios = require('axios');
const sequelize = require('Sequelize');
const Op = sequelize.Op;

const apiKey = 'RGAPI-9a775620-ad2f-4749-9014-85d54ce703f3';

router.get('/find/:server/:accountId', (req, res, next) => {
    models.summoner
    .findOne({
        where: {
            accountId : req.params.accountId,
            server : req.params.server
        }
    })
    .then( summoner => {
        if ( summoner ) {
            models.matchlist
            .findAll({
                order: [['timestamp', 'DESC']],
                include: {
                    model: models.summoner,
                    through: 'summonerMatchList'
                }
            })
            .then( listMatchs => {
                if( listMatchs.length > 0 ){
                    let urlMatchList = 'https://'+req.params.server+'.api.riotgames.com/lol/match/v3/matchlists/by-account/'+req.params.accountId +'?beginTime='+listMatchs[0].timestamp +'&api_key='+ apiKey;
                    // console.log(urlMatchList);
                    axios.get(urlMatchList)
                        .then( response => {
                            response.data.matches.map((dataApi, index) => {

                                if (index < (response.data.matches.length-1)){

                                    models.matchlist.create({
                                        lane: dataApi.lane,
                                        gameId: dataApi.gameId,
                                        champion: dataApi.champion,
                                        platformId: dataApi.platformId,
                                        timestamp: dataApi.timestamp,
                                        queue: dataApi.queue,
                                        role: dataApi.role,
                                        season: dataApi.season
                                    }).then(matchlistCreate => {
                                        if (matchlistCreate) {
                                            summoner.setSumlist(matchlistCreate);
                                        }
                                    }).catch(errorCreate => {
                                        res.json({
                                            status: 0,
                                            statusCode: 'summoner/error',
                                            description: 'Error base de datos',
                                            error: errorCreate.toString()
                                        });
                                    });
                                }


                            });
                            res.json({
                                status: 1,
                                statusCode: 'summoner/ok',
                                description: 'Match list cargada desde ' + listMatchs[0].timestamp
                            });
                        })
                        .catch( error => {
                            res.json({
                                status: 0,
                                statusCode: 'summoner/error',
                                description: 'Matchlist error summoner sin games',
                                error: error.toString()
                            });
                        });
                }else{
                    let urlMatchList = 'https://'+req.params.server+'.api.riotgames.com/lol/match/v3/matchlists/by-account/'+req.params.accountId + '?api_key='+ apiKey;
                    // console.log(urlMatchList);
                    axios.get(urlMatchList)
                    .then( response => {
                        response.data.matches.map( (dataApi) => {
                            models.matchlist.create({
                                lane:dataApi.lane,
                                gameId:dataApi.gameId,
                                champion: dataApi.champion,
                                platformId: dataApi.platformId,
                                timestamp:dataApi.timestamp,
                                queue:dataApi.queue,
                                role:dataApi.role,
                                season:dataApi.season
                            }).then( matchlistCreate => {
                                if (matchlistCreate) {
                                    summoner.setSumlist(matchlistCreate);
                                }
                            }).catch( errorCreate => {
                                res.json({
                                    status: 0,
                                    statusCode: 'summoner/error',
                                    description: 'Error base de datos',
                                    error: errorCreate.toString()
                                });
                            });
                        });
                        res.json({
                            status: 1,
                            statusCode: 'summoner/ok',
                            description: 'Match list cargada'
                        });
                    })
                    .catch( error => {
                        res.json({
                            status: 0,
                            statusCode: 'summoner/error',
                            description: 'Matchlist error summoner sin games',
                            error: error.toString()
                        });
                    });
                }
            })
            .catch( error => {
                console.log(error);
                console.log("base error 2");
                res.json({r:'a'});
            });
        }else{
            res.json({r:'sin sum'});
        }

    })
    .catch(error =>{
        console.log(error);
        res.json({r:'base error 1'});
    })
});

//router.get( '/update/matchlist/:server/:summonerName', (req, res, next) => {
    // models.matchlist
    //     .findOne({
    //         include: [{
    //             model: models.summoner,
    //             through: 'summonerMatchList'
    //         },{
    //             model:models.summoner,
    //             where:{
    //                 name: req.params.summonerName,
    //                 server : req.params.server,
    //                 summonerId: sequelize.
    //             }
    //         }],
    //         where:{
    //
    //         }
    //
    //
    //
    //     })
    //     .then( matchlistALL=> {
    //
    //     })
//});



router.get( '/update/:server/:summonerName', (req, res, next) => {
    const summonerName = req.params.summonerName.charAt(0).toUpperCase() + req.params.summonerName.slice(1);
    const summonerServer = req.params.server;

    models.summoner.findOne({
        where:{
            name: summonerName,
            server: summonerServer
        }
    }).then( userUpdate => {
        if ( userUpdate ) {
            let urlSummoner = 'https://'+summonerServer+'.api.riotgames.com/lol/summoner/v3/summoners/by-name/'+summonerName + '?api_key='+ apiKey;
            axios.get( urlSummoner )
            .then( response => {
                userUpdate.updateAttributes({
                    // name:response.data.name,
                    profileIconId:response.data.profileIconId,
                    summonerLevel:response.data.summonerLevel,
                    revisionDate:response.data.revisionDate
                });
                res.json({
                    status: 1,
                    statusCode: 'user/updated',
                    data: userUpdate.toJSON()
                });
            }).catch( error => {
                res.json({
                    status: 0,
                    statusCode: 'summoner/error',
                    description: 'Nombre de invocador invalido'
                });
            });
        } else {
            res.status(400).json({
                status: 0,
                statusCode: 'user/error',
                description: "Usuario no existe"
            });
        }
    }).catch( errorCreate => {
        res.status(400).json({
            status: 0,
            statusCode: 'database/error',
            description: errorCreate.toString()
        });
    });
});

router.get('/all', (req, res, next) => {
    models.matchlist
    .findAll()
    .then(users => {
        if (users) {
            res.json({
                status: 1,
                statusCode: 'users/listing',
                data: users
            });
        } else {
            res.status(400).json({
                status: 0,
                statusCode: 'users/not-found',
                description: 'There\'s no user information!'
            });
        }
    }).catch(error => {
        res.status(400).json({
            status: 0,
            statusCode: 'database/error',
            description: error.toString()
        });
    });
});




module.exports = router;
