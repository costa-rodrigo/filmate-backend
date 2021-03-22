const express = require('express');
const router = express.Router();
const passport = require('passport')
const models = require("../models");
const auth = require("../controllers/auth")
const authentication = require('../jwt')

// BASIC ROUTES

router
    .post('/', (req, res) => {
        const { name, email, password } = req.body

        auth
            .createUser({ name, email, password })
            .then(user => res.json())
    })


module.exports = router;