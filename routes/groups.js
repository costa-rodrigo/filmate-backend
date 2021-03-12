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

        // Get toke from the header, decode it and store the user id in a variable
        let header = req.headers.authorization
        let headerArray = header.split(" ");
        let token = headerArray[1];
        let decoded = jwt_decode(token);

        let userId = decoded.id;
        let group_name = req.body.groupName

        Group
            .findAll({
                where: { name: group_name }
            })
            .then((result) => {
                if (result.length < 1) {
                    Group.create({
                        name: group_name
                    })
                        .then((group) => {
                            User_Group
                                .create({
                                    user_id: userId,
                                    group_id: group.id
                                })
                        })

                    console.log("Group created!")
                    return
                }
                else {
                    console.log("This group name is already taken.")
                }
            })
            .catch((error) => {
                console.log("error")
                res.status(500).send(`An error occurred: ${error.message}`);
                process.exit();
            })

        res.send()
    })

    .get('/', (req, res) => {
        // Get toke from the header, decode it and store the user id in a variable
        let header = req.headers.authorization
        let headerArray = header.split(" ");
        let token = headerArray[1];
        let decoded = jwt_decode(token);

        let userId = decoded.id;

        User_Group
            .findAll({
                include: ['user'],
                where: { user_id: userId }
            })
            .then((group) => {
                res.status(201).send(group);
            })
            .catch((error) => {
                res.status(500).send(`An error occurred: ${error.message}`);
                process.exit();
            })
    })

module.exports = router;