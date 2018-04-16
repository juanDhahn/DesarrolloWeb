const express = require('express');
const axios = require('axios');
const app = express();
const bodyParser = require('body-parser');
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: false }));

var apiKey = 'RGAPI-a1efdd25-af71-414e-9c90-245656751e62';

/*async function champions_name (lista){
    console.log(lista);
    const listKeys = Object.keys(lista);
    let nombres = [];
    listKeys.map(key =>{
        nombres.push(lista[key]);

    });
            return nombres;
}

async function logkeys(nombres){
    nombres.map(nombre=>{
                console.log(a.data[nombre].id)
            });
}
*/

router.get('/',(req, res) =>{

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
            let lista = response.data.keys
            let a = response.data;
            //var nombres = champions_name(lista)
            //logkeys(nombres)
            /*lista.map(key => {
                nombres.push[lista[key]];
            });*/
            var datos = []
            for(var i in lista){
                var id = a.data[lista[i]].id;
                var name = a.data[lista[i]].name;
                var armor = a.data[lista[i]].stats.armor;
                datos.push(id);
                datos.push(name);
                datos.push(armor);
                datos.push(a.data[lista[i]].stats.armorperlevel)
                datos.push(a.data[lista[i]].stats.attackdamage)
                datos.push(a.data[lista[i]].stats.attackdamageperlevel)
                datos.push(a.data[lista[i]].stats.attackrange)
                datos.push(a.data[lista[i]].stats.attackspeedoffset)
                datos.push(a.data[lista[i]].stats.attackspeedperlevel)
                datos.push(a.data[lista[i]].stats.crit)
                datos.push(a.data[lista[i]].stats.critperlevel)
                datos.push(a.data[lista[i]].stats.hp)
                console.log(name);
                console.log(id);
                console.log(armor);
                }
            //var myJsonString = JSON.stringify(nombres);
            /*
            Variables a guardar:
            a.data['nombre'].id
            a.data['nombre'].name
            a.data['nombre'].stats.armor
            a.data['nombre'].stats.armorperlevel
            */
            res.json(datos);

            //console.log(a.data['Caitlyn'].spells)
            //res.json(a.data['Caitlyn'].spells)
        })
        .catch(function (error) {
           console.log(error);
        });


});



    module.exports = router;
