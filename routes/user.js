const express = require('express');
const router = express.Router();

const passport = require('passport')
const auth = require("../controllers/auth")
const authentication = require('../jwt')
const jwt_decode = require('jwt-decode');

const models = require("../models");
const User = models.user;


router
    .get('/', (req, res) => {
        // Get toke from the header, decode it and store the user id in a variable
        let header = req.headers.authorization
        let headerArray = header.split(" ");
        let token = headerArray[1];
        let decoded = jwt_decode(token);

        let userId = decoded.id;
        let data = {}

        User
            .findAll({
                where:
                    { id: userId },
            })
            .then((result) => {

                data.name = result[0].dataValues.name
                data.email = result[0].dataValues.email

                res.status(201).send(data);
            })
            .catch((error) => {
                res.status(500).send(`An error occurred: ${error.message}`);
                process.exit();
            })
    })

module.exports = router;