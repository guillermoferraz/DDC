const express = require('express');
const router = express.Router();
const User = require('../models/Users');
const passport = require('passport');
const { isAuthenticated } = require('../helpers/auth');
const SERVER = require('../address');


router.post('/login', passport.authenticate ('local',{
    successRedirect: `${SERVER}/home`,
    failureRedirect: `${SERVER}/error`
}))


router.get('/register', (req, res) => {
    res.send('Reagister')
})
router.post('/register',async  (req, res) => {
    const {user, email, password, confirm_password} = req.body;
    const newUser = new User({user, email, password});
    newUser.password = await newUser.encryptPassword(password);
    await newUser.save()
    console.log(newUser)
    console.log('req:',req.body)
    res.send({user,email,password})
})

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect(`${SERVER}`)
    
})



module.exports = router;
