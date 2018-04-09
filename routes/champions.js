const express = require('express');
const axios = require('axios');
const app = express();
const bodyParser = require('body-parser');
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: false }));

var apiKey = 'RGAPI-7821cd0a-2b1d-44b1-9a84-c679c48405dd';

/*app.get('/user/items', (req, res) => {
    let url = 'https://la2.api.riotgames.com/lol/static-data/v3/items?locale=es_MX&itemListData=all&tags=all&api_key='+apiKey;
    console.log(url);


    axios.get(url)
        .then(function (response) {
            //console.log(response.data.keys[1]);
            //res.json(response.data.keys[1]);
            console.log(response.data);
            res.json(response.data);
        })
        .catch(function (error) {
           console.log(error);
        });
})*/

app.get('/', (req, res) =>{

    let url = 'https://la2.api.riotgames.com/lol/static-data/v3/champions?locale=es_MX&champListData=all&tags=all&dataById=false&api_key='+apiKey;
    console.log(url);


    axios.get(url)
        .then(function (response) {
            //console.log(response.data.keys[1]);
            //res.json(response.data.keys[1]);
            //console.log(response.data.data['Irelia']);
            //res.json(response.data.data['Irelia']);
            //res.json(response.data.keys) Lista de campeones
            //let a = response.data.data['Jax'].id
            //a.data['Jax'].spells[0] primera spell de jax
            let a = response.data;
            console.log(a.data['Caitlyn'].spells)
            res.json(a.data['Caitlyn'].spells)
        })
        .catch(function (error) {
           console.log(error);
        });


});



//http://localhost:3000/user?name=test222
// app.get('/user', (req, res) =>{
//     let url = 'https://la2.api.riotgames.com/lol/summoner/v3/summoners/by-name/orick?api_key='+apiKey;
//     axios.get(url)
//         .then(function (response) {
//             //console.log(response);
//             res.json(response.data);
//         })
//          .catch(function (error) {
//            // console.log(error);
//          });
// })


// app.post('/user',(req, res)=>{
//
//     console.log(req.body)
//
//     if(req.body.age >= 20){
//         res.json({
//             status:1,
//             statusCode:'user/created'
//         })
//     }else{
//         res.status(400).json({
//             status:0,
//             statusCode:'user/bad-age',
//             errorDescription: 'The user has less than 20 years'
//         })
//     }
//
// })

    module.exports = router;
