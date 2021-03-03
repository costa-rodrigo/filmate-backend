const express = require('express');
const router = express.Router();
const passport = require('passport')
const models = require("../models");
const auth = require("../controllers/auth")
const authentication = require('../jwt')


router
    .post('/', async (req, res) => {

        const name = req.body.name
        const password = req.body.password

        if (name && password) {
            let user = await auth.getUser({ name })

            if (!user) {
                res.status(401).json({ message: "User not found ", user: name })
            }

            if (user.password === password) {
                let payload = { id: user.id }
                let token = authentication.jwt.sign(payload, authentication.jwtOptions.secretOrKey)

                res.status(200).json({ message: 'ok', token: token })
                console.log(req.account)
            }
            else {
                res.status(401).json({ message: 'Password is incorrect!' })
            }
        }
    })

    .get('/', (req, res) => {
        res.json({ message: 'just a get' })
    })

module.exports = router;