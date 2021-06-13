const express = require('express');
const router = express.Router();
const { isAuthenticated }= require('../helpers/auth');
const User = require('../models/Users')
const passport = require('passport')
const SERVER = require('../address');

router.get('/data',isAuthenticated ,async(req, res ,next) => {
    const user = await User.findById(req.user.id);

res.setHeader('Access-Control-Allow-Origin','*' );
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization');
    res.json(user)
    console.log({user})
    next();
    
});

module.exports = router;
