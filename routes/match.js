const express = require('express');
const router = express.Router();

const passport = require('passport')
const auth = require("../controllers/auth")
const authentication = require('../jwt')
const jwt_decode = require('jwt-decode');

const models = require("../models");
const { Op } = require("sequelize");
const User = models.user;
const Group = models.group;
const User_Group = models.user_has_group;
const Session = models.session;
const Vote = models.vote;

let members;
let sessionId;
let match;

router
    .post('/', (req, res) => {
        let groupId = req.body.group_id;

        User_Group
            .findAll({
                raw: true,
                include: [
                    models.user,
                    models.group
                ],
                where: { group_id: groupId }
            })
            .then((group) => {
                // Got total number of members in a group
                members = group.length;

                Session
                    .findAll({
                        where: { group_id: groupId }
                    })
                    .then((result) => {
                        sessionId = result[result.length - 1].dataValues.id;
                    })
                    .then(() => {
                        Vote.
                            findAll({
                                where: { session_id: sessionId },
                                attributes: {
                                    exclude: [
                                        'id', 'session_id', 'user_id', 'sessionId', 'userId', 'createdAt', 'updatedAt'
                                    ]
                                },
                                raw: true,
                            })
                            .then((votes) => {
                                if (votes.length < members) {
                                    res.status(201).send("espera carai!")
                                }

                                else {
                                    let arrValues = votes.map(Object.values);

                                    let result = arrValues[0].filter(function (x) {
                                        return arrValues.every(function (y) {
                                            return y.indexOf(x) >= 0
                                        })
                                    })

                                    var match = result.filter(x => x).join(', ');

                                    if (match.length > 0) {
                                        res.status(200).send(match)
                                    }
                                    else {
                                        res.status(201).send("No match found")
                                    }
                                }
                            })
                            .then(() => {
                                Session.update(
                                    { isClosed: 1 },
                                    {
                                        where: {
                                            id: sessionId
                                        }
                                    })
                            })
                    })
            })

            .catch((error) => {
                res.status(500).send(`An error occurred: ${error.message}`);
                process.exit();
            })
    })


module.exports = router;