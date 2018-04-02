const express = require('express');
const axios = require('axios');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));

var apiKey = 'RGAPI-1a14d2da-70eb-486e-8fe7-6112a25204e9';

// sacar id jugador -> matchlists ->  match -> obtener numero de participant -> timelines

//http://localhost:3000/user/aaa/12
app.get('/user/:server/:account', (req, res) =>{

    let url = 'https://' + get_server(req.params.server) + '.api.riotgames.com/lol/summoner/v3/summoners/by-name/'+req.params.account+'?api_key='+apiKey;
    console.log(url);


    axios.get(url)
        .then(function (response) {

            // console.log(response.data);
            console.log(response.data);
            //matchs
            //https://la2.api.riotgames.com/lol/match/v3/matchlists/by-account/118550
            let url_match = 'https://'+get_server(req.params.server)+'.api.riotgames.com/lol/match/v3/matchlists/by-account/'+response.data.accountId+'?api_key='+apiKey;
            console.log(url_match);
            axios.get(url_match)
                .then(function (response_match) {
                    // console.log(response.data);
                    // console.log(response_match.data);
                    // res.json(response_match.data);
                    console.log(response_match.data);
                    //https://la2.api.riotgames.com/lol/match/v3/matches/563984633
                    let url_match_ind = 'https://'+get_server(req.params.server)+'.api.riotgames.com/lol/match/v3/matches/'+response_match.data.matches[0].gameId+'?api_key='+apiKey;
                    console.log(url_match_ind);

                    axios.get(url_match_ind)
                        .then(function (response_match_ind) {
                            console.log(response_match_ind.data);
                            // console.log(response_match_ind.data);
                            response_match_ind.data.participants.map(d =>{
                                if(d.participantId == 5){
                                    // console.log(d);
                                }
                            })
                            res.json(response_match_ind.data);
                        })
                        .catch(function (error_match_ind) {
                           // console.log(error);
                        });
                })
                .catch(function (error_match) {
                   // console.log(error);
                });






        })
        .catch(function (error) {
           // console.log(error);
        });

    // res.json(
    //     {
    //         title:"user",
    //         hello:"aaa, " + req.params.name,
    //         age:"u age is "+ req.params.age
    //     }
    // )

})



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

app.listen(3000, () =>{ console.log('Example app listening on port 3000!')})


function get_server(data){
    let code_server = ""
    switch(data) {
    case "LatinoamericaSur":
        code_server = "la2";
        break;
    case "Latinoamerica Norte":
        code_server = "la1";
        break;
    default:
        code_server = "";
        break
    }

    return code_server;
}
