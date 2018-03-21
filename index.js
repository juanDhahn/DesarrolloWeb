var express = require('express');
// var axios = require('axios');
var app = express();


app.get('/', function (req, res) {
  res.send('Hello World2!');
  console.log('Example app listening on port 3000!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

// let url = 'https://la2.api.riotgames.com/lol/summoner/v3/summoners/by-name/Orick?api_key=RGAPI-48bc2855-a1a5-442b-8b1c-34f7d38005d3';
//
// axios.get(url)
//     .then(function (response) {
//         console.log(response);
//     })
//      .catch(function (error) {
//        console.log(error);
//      });
