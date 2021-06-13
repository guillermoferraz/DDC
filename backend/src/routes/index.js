const express = require('express');
const router = express.Router();
const Avatar = require('../models/Avatar');
const { isAuthenticated }= require('../helpers/auth');

const passport = require('passport')
const SERVER = require('../address');



module.exports = router;
