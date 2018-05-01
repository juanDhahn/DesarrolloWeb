const express = require('express');
// const app = express();
const axios = require('axios');
const router = express.Router();
const models = require('../models');
const firebaseAdmin = require('../config/firebaseConfig');

// const bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({ extended: false }));


router.post('/verificar',(req,res,next)=>{
    firebaseAdmin.auth().verifyIdToken(req.body.token)
    .then(function(decodedToken) {
        console.log('good: ' + decodedToken);
        // console.log(decodedToken.uid);

        models.user.findOne({
            where: {
                uid: decodedToken.uid
            }})
            .then(user => {
                res.json({
                    status: 0,
                    statusCode: 'users/verificar/ok',
                    description: 'datos de usuario'
                });
            })

            .catch(error =>{
                console.log(error);
            });

        }).catch(function(error) {
            console.log('Error al verificar');
            // console.log(error);
            res.json({
                code:'0',
                description:'error al verificar token de usuario'
            });
        });
    });


    router.post('/create',(req,res,next)=>{
        const email = req.body['email'];
        const password = req.body['password'];


        models.user.findOne({
            where: {
                email: email
            }})
            .then(users => {
                if (users) {
                    res.status(400).json({
                        status: 0,
                        statusCode: 'users/create/error',
                        description: 'Email ya existe'
                        // status: 1,
                        // statusCode: 'users/listing',
                        // data: users
                    });
                } else {
                    // firebaseAdmin.auth().createUser({
                    //     email: email,
                    //     emailVerified: true,
                    //     password: password,
                    //     // displayName: "John Doe",
                    //     disabled: false
                    // })
                    // .then(function(userRecord) {
                    //     console.log("Successfully created new user:", userRecord.uid);
                    // })
                    // .catch(function(error) {
                    //     console.log("Error creating new user:", error);
                    // });


                    models.user.create({
                        email: email,
                        password: password
                    }).then(user => {
                        if (user) {
                            res.json({
                                status: 1,
                                statusCode: 'user/created',
                                data: user.toJSON()
                            });
                        } else {
                            res.status(400).json({
                                status: 0,
                                statusCode: 'user/error',
                                description: "Couldn't create the user"
                            });
                        }
                    }).catch(error => {
                        res.status(400).json({
                            status: 0,
                            statusCode: 'database/error',
                            description: error.toString()
                        });
                    });

                }
            }).catch(error => {
                res.status(400).json({
                    status: 0,
                    statusCode: 'database/error111',
                    description: error.toString()
                });
            });

            // firebaseAdmin.auth().getUserByEmail(email)
            //     .then(function(userRecord) {
            //         // console.log("Usuario ya existente", userRecord.toJSON());
            //         res.json({
            //             status: 1,
            //             statusCode: 'user/error',
            //             description: 'Email ya registrado'
            //         });
            //     })
            //     .catch(function(error) {
            //         // console.log('No se ha encontrado del usurio')
            //
            //     });

        });

        // router.post('/', (req, res, next) => {
        //     const name = req.body['name'];
        //     const email = req.body['email'];
        //     const password = req.body['password'];
        //     if (name && email && password) {
        //         models.user.create({
        //             name: name,
        //             email: email,
        //             password: password
        //         }).then(user => {
        //             if (user) {
        //                 res.json({
        //                     status: 1,
        //                     statusCode: 'user/created',
        //                     data: user.toJSON()
        //                 });
        //             } else {
        //                 res.status(400).json({
        //                     status: 0,
        //                     statusCode: 'user/error',
        //                     description: "Couldn't create the user"
        //                 });
        //             }
        //         }).catch(error => {
        //             res.status(400).json({
        //                 status: 0,
        //                 statusCode: 'database/error',
        //                 description: error.toString()
        //             });
        //         });
        //     } else {
        //         res.status(400).json({
        //             status: 0,
        //             statusCode: 'user/wrong-body',
        //             description: 'The body is wrong! :('
        //         });
        //     }
        // });
        // /* GET users listing.
        //
        //     Example: /users/all
        //
        //  */
        // router.get('/all', (req, res, next) => {
        //     models.user
        //         .findAll()
        //         .then(users => {
        //             if (users) {
        //                 res.json({
        //                     status: 1,
        //                     statusCode: 'users/listing',
        //                     data: users
        //                 });
        //             } else {
        //                 res.status(400).json({
        //                     status: 0,
        //                     statusCode: 'users/not-found',
        //                     description: 'There\'s no user information!'
        //                 });
        //             }
        //         }).catch(error => {
        //         res.status(400).json({
        //             status: 0,
        //             statusCode: 'database/error',
        //             description: error.toString()
        //         });
        //     });
        // });
        // /* GET users listing.
        //
        //     Example: /users/max@zl.cl
        //
        //  */
        // router.get('/:email', (req, res, next) => {
        //     const email = req.params.email;
        //     if (email) {
        //         models.user.findOne({
        //             where: {
        //                 email: email
        //             }
        //         }).then(user => {
        //             if (user) {
        //                 res.json({
        //                     status: 1,
        //                     statusCode: 'user/found',
        //                     data: user.toJSON()
        //                 });
        //             } else {
        //                 res.status(400).json({
        //                     status: 0,
        //                     statusCode: 'user/not-found',
        //                     description: 'The user was not found with the email'
        //                 });
        //             }
        //         }).catch(error => {
        //             res.status(400).json({
        //                 status: 0,
        //                 statusCode: 'database/error',
        //                 description: error.toString()
        //             });
        //         });
        //     } else {
        //         res.status(400).json({
        //             status: 0,
        //             statusCode: 'user/wrong-email',
        //             description: 'Check the email!'
        //         });
        //     }
        // });
        //
        // /* GET users listing.
        //
        //     Example: /users?email=max@zl.cl
        //
        //  */
        // router.get('/', (req, res, next) => {
        //     const email = req.query.email;
        //     if (email) {
        //         models.user.findOne({
        //             where: {
        //                 email: email
        //             }
        //         }).then(user => {
        //             if (user) {
        //                 res.json({
        //                     status: 1,
        //                     statusCode: 'user/found',
        //                     data: user.toJSON()
        //                 });
        //             } else {
        //                 res.status(400).json({
        //                     status: 0,
        //                     statusCode: 'user/not-found',
        //                     description: 'The user was not found with the email'
        //                 });
        //             }
        //         }).catch(error => {
        //             res.status(400).json({
        //                 status: 0,
        //                 statusCode: 'database/error',
        //                 description: error.toString()
        //             });
        //         });
        //     } else {
        //         res.status(400).json({
        //             status: 0,
        //             statusCode: 'user/wrong-email',
        //             description: 'Check the email!'
        //         });
        //     }
        // });
        //

        module.exports = router;
