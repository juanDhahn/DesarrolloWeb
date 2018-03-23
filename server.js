const express = require('express')
const app = express()
const bodyParser = require('body-parser');

// app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.urlencoded({ extended: false }));
app.get('/', (req, res) =>{
    res.json(
        {
            title:"asd"
        }
    )
})
//http://localhost:3000/user?name=test222
app.get('/user', (req, res) =>{
    res.json(
        {
            title:"user",
            hello:"aaa, " + req.query.name
        }
    )
})
//http://localhost:3000/user/aaa/12
app.get('/user/:name/:age', (req, res) =>{
    res.json(
        {
            title:"user",
            hello:"aaa, " + req.params.name,
            age:"u age is "+ req.params.age
        }
    )
})

app.post('/user',(req, res)=>{
    
    console.log(req.body)

    if(req.body.age >= 20){
        res.json({
            status:1,
            statusCode:'user/created'
        })
    }else{
        res.status(400).json({
            status:0,
            statusCode:'user/bad-age',
            errorDescription: 'The user has less than 20 years'
        })
    }

})

app.listen(3000, () =>{ console.log('Example app listening on port 3000!')})





// var axios = require('axios');

// let url = 'https://la2.api.riotgames.com/lol/summoner/v3/summoners/by-name/Orick?api_key=RGAPI-48bc2855-a1a5-442b-8b1c-34f7d38005d3';
//
// axios.get(url)
//     .then(function (response) {
//         console.log(response);
//     })
//      .catch(function (error) {
//        console.log(error);¡'¡'
//      });
