const express = require('express');
const router = express.Router();
const firebase = require('../config/firebaseConfig')


router.post('/', (req, res, next) => {
    const name = req.body['name'];
    const email = req.body['email'];
    const password = req.body['password'];
    res.json({
                   status: 1,
                   statusCode: 'user/created',
               });
});

// /* GET users listing.
//     Example: /users/max@zl.cl
//  */
// router.get('/:email', (req, res, next) => {
//     res.json({
//                    status: 1,
//                    statusCode: 'user/created',
//                });
//     const email = req.params.email;
//
// });
//
// /* GET users listing.
//     Example: /users?email=max@zl.cl
//  */
// router.get('/', (req, res, next) => {
//     const email = req.query.email;
//
//     firebase.ref('/users').push({
//         username: 'test2',
//         email: 'test',
//     });
//
//     res.json({
//                    status: 1,
//                    statusCode: 'user/created',
//                    data: 'LoL > Dota'
//                });
//
// });


module.exports = router;
