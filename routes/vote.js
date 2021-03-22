const express = require('express');
const router = express.Router();

const passport = require('passport')
const auth = require("../controllers/auth")
const authentication = require('../jwt')
const jwt_decode = require('jwt-decode');

const models = require("../models");
const { Op } = require("sequelize");
const User = models.user;
const Session = models.session;
const Vote = models.vote;

router
    .post('/', (req, res) => {

        // Get toke from the header, decode it and store the user id in a variable
        let header = req.headers.authorization
        let headerArray = header.split(" ");
        let token = headerArray[1];
        let decoded = jwt_decode(token);

        let userId = decoded.id;
        let sessionId = req.body.session_id
        let votes = req.body.votes

        Vote.
            findAll({
                where: {
                    [Op.and]: [
                        { user_id: userId },
                        { session_id: sessionId },
                    ]
                }
            })
            .then((result) => {
                if (result.length < 1) {
                    Vote.
                        create({
                            user_id: userId,
                            session_id: sessionId,
                            vote_1: votes[0],
                            vote_2: votes[1],
                            vote_3: votes[2],
                            vote_4: votes[3],
                            vote_5: votes[4],
                            vote_6: votes[5],
                            vote_7: votes[6],
                            vote_8: votes[7],
                            vote_9: votes[8],
                            vote_10: votes[9]
                        })

                    res.status(201).send("User has voted successfully")
                    return
                }
                else {
                    res.status(200).send("User has already voted")
                    return
                }
            })
            .catch((error) => {
                res.status(500).send(`An error occurred: ${error.message}`);
                process.exit();
            })
    })

module.exports = router;