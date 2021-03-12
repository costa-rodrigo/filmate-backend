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

router
    .post('/', (req, res) => {

        let data = {
            friend_email: req.body.email,
            group_name: req.body.groupName
        }

        Group
            // Search on the database for a group with the name provided by the user
            .findAll({
                where: { name: data.group_name }
            })
            .then((group) => {
                // if there is a group with that name, add it's id to the data object. If not, return an output.
                if (group.length > 0) {
                    data.group_id = group[0].dataValues.id;
                }
                else {
                    console.log("No group found with that name.")
                }
            })
            .then(() => {
                // Search on the database for a user with the email address provided 
                User
                    .findAll({
                        where: { email: data.friend_email }
                    })
                    .then((user) => {
                        // if there is a user with that email, add it's id to the data object. If not, return an output.
                        if (user.length > 0) {
                            data.user_id = user[0].dataValues.id;
                        }
                        else {
                            console.log("No user found with that email.")
                        }
                    })
                    .then(() => {
                        // Checks if the user was already added to that group
                        if (data.user_id) {
                            User_Group
                                .findAll({
                                    where: { user_id: data.user_id }
                                })
                                .then((result) => {
                                    // If yes, return a message to the user
                                    if (result.length > 0) {
                                        console.log("this user is already part of this group")
                                    }
                                    else {
                                        User_Group
                                            .create({
                                                user_id: data.user_id,
                                                group_id: data.group_id
                                            })

                                        console.log("User added to the group.")
                                    }
                                })
                        }
                    })
            })
            .catch((error) => {
                console.log(error.message)
                process.exit();
            })
        res.send()
    })

    .get('/', (req, res) => {
        res.send({ message: "just a get" })
    })

module.exports = router;