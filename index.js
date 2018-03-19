var express = require('express');
// var axios = require('axios');
var app = express();


app.get('/', function (req, res) {
  res.send('Hello World2!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

// let url = 'https://la2.api.riotgames.com/lol/summoner/v3/summoners/by-name/Orick?api_key=RGAPI-7ab8a4d9-e0db-490e-a780-581205fe4847';
//
// axios.get(url)
//     .then(function (response) {
//         console.log(response);
//     })
//      .catch(function (error) {
//        console.log(error);
//      });
