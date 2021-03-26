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