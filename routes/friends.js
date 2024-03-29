const express = require('express');
const router = express.Router();

const passport = require('passport')
const auth = require("../controllers/auth")
const authentication = require('../jwt')
const jwt_decode = require('jwt-decode');

const models = require("../models");
const { Op } = require("sequelize");
const User = models.user;
const User_Friend = models.friend;




router
    .get('/', (req, res) => {

        // Get toke from the header, decode it and store the user id in a variable
        let header = req.headers.authorization
        let headerArray = header.split(" ");
        let token = headerArray[1];
        let decoded = jwt_decode(token);

        let userId = decoded.id;

        User_Friend.findAll({
            where:
                { user_id: userId },
        })
            .then((result) => {
                res.send(result)
            })
    })


    .post('/', (req, res) => {

        // Get toke from the header, decode it and store the user id in a variable
        let header = req.headers.authorization
        let headerArray = header.split(" ");
        let token = headerArray[1];
        let decoded = jwt_decode(token);

        let userId = decoded.id;
        let friend_email = req.body.email

        User
            .findAll({
                where: { email: friend_email }
            })
            .then((result) => {
                if (result.length > 0) {
                    let friendId = result[0].dataValues.id;
                    let friendName = result[0].dataValues.name;

                    User_Friend.findAll({
                        where: {
                            [Op.and]: [
                                { user_id: userId },
                                { friend_id: friendId },
                            ]
                        }
                    })
                        .then((result) => {

                            if (result.length < 1) {
                                User_Friend.create({
                                    user_id: userId,
                                    friend_id: friendId,
                                    friend_name: friendName,
                                    friend_email: friend_email,
                                })
                                console.log("Friend Added")
                                return
                            }
                        })
                        .catch((error) => {
                            res.status(500).send(`An error occurred: ${error.message}`);
                            process.exit();
                        })
                }
                else {
                    console.log("Invalid email address.")
                }

            })
        res.send()
    })

module.exports = router;