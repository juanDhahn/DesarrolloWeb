const express = require('express');
const router = express.Router();
// const models = require('../models');

router.post('/', (req, res, next) => {
    const name = req.body['name'];
    const email = req.body['email'];
    const password = req.body['password'];
    res.json({
                   status: 1,
                   statusCode: 'user/created',
                   // data: user.toJSON()
               });
    // if (name && email && password) {
    //     models.user.create({
    //         name: name,
    //         email: email,
    //         password: password
    //     }).then(user => {
    //         if (user) {
    //             res.json({
    //                 status: 1,
    //                 statusCode: 'user/created',
    //                 data: user.toJSON()
    //             });
    //         } else {
    //             res.status(400).json({
    //                 status: 0,
    //                 statusCode: 'user/error',
    //                 description: "Couldn't create the user"
    //             });
    //         }
    //     }).catch(error => {
    //         res.status(400).json({
    //             status: 0,
    //             statusCode: 'database/error',
    //             description: error.toString()
    //         });
    //     });
    // } else {
    //     res.status(400).json({
    //         status: 0,
    //         statusCode: 'user/wrong-body',
    //         description: 'The body is wrong! :('
    //     });
    // }
});
/* GET users listing.

    Example: /users/all

 */
router.get('/all', (req, res, next) => {
    // models.user
    //     .findAll()
    //     .then(users => {
    //         if (users) {
    //             res.json({
    //                 status: 1,
    //                 statusCode: 'users/listing',
    //                 data: users
    //             });
    //         } else {
    //             res.status(400).json({
    //                 status: 0,
    //                 statusCode: 'users/not-found',
    //                 description: 'There\'s no user information!'
    //             });
    //         }
    //     }).catch(error => {
    //     res.status(400).json({
    //         status: 0,
    //         statusCode: 'database/error',
    //         description: error.toString()
    //     });
    // });
});
/* GET users listing.

    Example: /users/max@zl.cl

 */
router.get('/:email', (req, res, next) => {
    res.json({
                   status: 1,
                   statusCode: 'user/created',
                   // data: user.toJSON()
               });
    const email = req.params.email;
    // if (email) {
    //     models.user.findOne({
    //         where: {
    //             email: email
    //         }
    //     }).then(user => {
    //         if (user) {
    //             res.json({
    //                 status: 1,
    //                 statusCode: 'user/found',
    //                 data: user.toJSON()
    //             });
    //         } else {
    //             res.status(400).json({
    //                 status: 0,
    //                 statusCode: 'user/not-found',
    //                 description: 'The user was not found with the email'
    //             });
    //         }
    //     }).catch(error => {
    //         res.status(400).json({
    //             status: 0,
    //             statusCode: 'database/error',
    //             description: error.toString()
    //         });
    //     });
    // } else {
    //     res.status(400).json({
    //         status: 0,
    //         statusCode: 'user/wrong-email',
    //         description: 'Check the email!'
    //     });
    // }
});

/* GET users listing.

    Example: /users?email=max@zl.cl

 */
router.get('/', (req, res, next) => {
    const email = req.query.email;
    res.json({
                   status: 1,
                   statusCode: 'user/created',
                   // data: user.toJSON()
               });

    // if (email) {
    //     models.user.findOne({
    //         where: {
    //             email: email
    //         }
    //     }).then(user => {
    //         if (user) {
    //             res.json({
    //                 status: 1,
    //                 statusCode: 'user/found',
    //                 data: user.toJSON()
    //             });
    //         } else {
    //             res.status(400).json({
    //                 status: 0,
    //                 statusCode: 'user/not-found',
    //                 description: 'The user was not found with the email'
    //             });
    //         }
    //     }).catch(error => {
    //         res.status(400).json({
    //             status: 0,
    //             statusCode: 'database/error',
    //             description: error.toString()
    //         });
    //     });
    // } else {
    //     res.status(400).json({
    //         status: 0,
    //         statusCode: 'user/wrong-email',
    //         description: 'Check the email!'
    //     });
    // }
});


module.exports = router;
