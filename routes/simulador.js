const express = require('express');
const axios = require('axios');
const app = express();
const bodyParser = require('body-parser');
const models = require('../models');
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: false }));

router.get('/', (req, res, next)=>{
    models.item.findAll()
    .then(item=>{
        if (item){
            models.champions.findAll()
            .then(champions=>{
                if (champions){
                    res.json({
                        status: 1,
                        items: item,
                        champions: champions
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