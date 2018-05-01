const express = require('express');
const axios = require('axios');
const app = express();
const bodyParser = require('body-parser');
const models = require('../models');
const router = express.Router();
const firebaseAdmin = require('../config/firebaseConfig');

app.use(bodyParser.urlencoded({ extended: false }));

router.post('/', (req, res, next) => {
    firebaseAdmin.auth().verifyIdToken(req.body.token)
        .then(decodedToken => {
                const iduser = decodedToken.uid
                const idchamp1 = req.body['champ1'];
                const idchamp2 = req.body['champ2'];
                const iditem11 = req.body['item11'];
                const iditem12 = req.body['item12'];
                const iditem13 = req.body['item13'];
                const iditem14 = req.body['item14'];
                const iditem15 = req.body['item15'];
                const iditem16 = req.body['item16'];
                const iditem21 = req.body['item21'];
                const iditem22 = req.body['item22'];
                const iditem23 = req.body['item23'];
                const iditem24 = req.body['item24'];
                const iditem25 = req.body['item25'];
                const iditem26 = req.body['item26'];

                if (idchamp1 && idchamp2) {
                    models.builds.create({
                        iduser: iduser,
                        idchamp1: idchamp1,
                        idchamp2: idchamp2,
                        iditem11: iditem11,
                        iditem12: iditem12,
                        iditem13: iditem13,
                        iditem14: iditem14,
                        iditem15: iditem15,
                        iditem16: iditem16,
                        iditem21: iditem21,
                        iditem22: iditem22,
                        iditem23: iditem23,
                        iditem24: iditem24,
                        iditem25: iditem25,
                        iditem26: iditem26


                    }).then(builds => {
                        if (builds) {
                            res.json({
                                status: 1,
                                description: "Se ingresó correctamente."
                            });
                        } else {
                            res.json({
                                status: 0,
                                description: "Couldn't create the user"
                            });
                        }
                    }).catch(error => {
                        console.log(error);
                        res.json({
                            status: 0
                        });
                    });
                } else {
                    res.json({
                        status: 0,
                        description: 'The body is wrong! :('
                    });
                }

        }).catch(error =>{
        res.json({
            code:'0',
            description:'error al verificar token de usuario',
        });
    });
});

router.get('/all', (req, res, next)=>{
    models.builds
    .findAll()
    .then(builds=>{
        if (builds){
            res.json({
                status: 1,
            data: builds
            });
        } else {
            res.status(400).json({
                status:0
            });
        }
    }).catch(error => {
        res.status(400).json({
            status:0
        });
    });
});

module.exports = router;