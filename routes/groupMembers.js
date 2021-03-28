const express = require('express');
const router = express.Router();

// const passport = require('passport')
// const auth = require("../controllers/auth")
// const authentication = require('../jwt')
// const jwt_decode = require('jwt-decode');

const models = require("../models");
const { Op } = require("sequelize");
const User = models.user;
const Group = models.group;
const User_Group = models.user_has_group;

router
    .post('/', (req, res) => {
        let groupId = req.body.group_id;

        User_Group
            .findAll({
                include: [
                    models.user,
                    models.group
                ],
                where: { group_id: groupId }
            })
            .then((group) => {
                if (group.length > 0) {
                    res.status(201).send(group);
                }
                else {
                    res.send({ message: "No group found" })
                }
            })
            .catch((error) => {
                res.status(500).send(`An error occurred: ${error.message}`);
                process.exit();
            })
    })

module.exports = router;