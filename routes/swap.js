const express = require('express');
const router = express.Router();

const passport = require('passport')
const auth = require("../controllers/auth")
const authentication = require('../jwt')
const jwt_decode = require('jwt-decode');

const models = require("../models");
const { Op } = require("sequelize");
const Group = models.group;
const Session = models.session;

router
    .post('/', (req, res) => {
        let groupId = req.body.group_id

        Session
            .findAll({
                where: { group_id: groupId }
            })
            .then((result) => {
                // Checks if the group has any previous session. If not, starts a new one.
                if (result.length < 1) {
                    Session.create({
                        group_id: groupId
                    })

                    res.status(201).send("First session started!")
                    return
                }

                // Checks if the group's last session is closed. If so, starts a new one.
                if (result.length > 0 && result[result.length - 1].dataValues.isClosed == true) {
                    Session.create({
                        group_id: groupId
                    })

                    res.status(201).send("Another Session started!")
                    return
                }

                // Checks if the group's last session is closed. If not, informs the user.
                else {
                    res.status(200).send("There is already an ongoing session!")
                }
            })

            .catch((error) => {
                console.log("error")
                res.status(500).send(`An error occurred: ${error.message}`);
                process.exit();
            })


    })

    .get('/', (req, res) => {

        let groupId = req.body.group_id

        Session
            .findAll({
                where: { group_id: groupId }
            })
            .then((result) => {
                res.status(201).send(result);
            })
            .catch((error) => {
                res.status(500).send(`An error occurred: ${error.message}`);
                process.exit();
            })
    })

module.exports = router;