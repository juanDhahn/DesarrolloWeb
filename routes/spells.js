const express = require('express');
const axios = require('axios');
const app = express();
const bodyParser = require('body-parser');
const models = require('../models');
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: false }));

var apiKey = 'RGAPI-35761256-01ce-4466-89df-ed0737d60c9b';

router.get('/', async (req, res, next) =>{

    let url = 'https://la2.api.riotgames.com/lol/static-data/v3/champions?locale=es_MX&champListData=all&tags=all&dataById=false&api_key='+apiKey;
    console.log(url);


    axios.get(url)
        .then(function (response) {
            let lista = response.data.keys
            let a = response.data;
            var datos = []
            p = -1 ; //0 1 2 y 3 habilidades. -1 pasiva
            for(var i in lista){
                var id = a.data[lista[i]].id;
                /*var name = a.data[lista[i]].spells[p].name; //para las activas
                var description = a.data[lista[i]].spells[p].description;*/
                /*var name = a.data[lista[i]].passive.name; pasiva
                var description = a.data[lista[i]].passive.description;*/
                var habilidadn = p + 1
                console.log (id);
                console.log (name);
                console.log (description);
                datos.push(id)
                datos.push(name)
                datos.push(description)
                datos.push(habilidadn)
                if (id && name) {
                    console.log("entre al if")
                    models.spells.create({
                        id: id,
                        name: name,
                        description: description,
                        habilidadn: habilidadn
                    }).then(spell => {
                        if (spell) {
                            res.json({
                                datos,
                                status: 1
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
                
            }
            //res.json(datos);
        }).catch(function (error) {
           console.log(error);
        });


});

router.get('/all', (req, res, next)=>{
    models.spells
    .findAll()
    .then(spells=>{
        if (spells){
            res.json({
                status: 1,
            data: spells
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
