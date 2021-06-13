const express = require('express');
const router = express.Router();
const Avatar = require('../models/Avatar');
const { isAuthenticated }= require('../helpers/auth');

const passport = require('passport')
const SERVER = require('../address');


router.post('/avatar',isAuthenticated, async (req, res) => {
    const avatar = new Avatar();
    avatar.filename = req.body.filename;
    avatar.path = '/img/' + req.file.filename;
    avatar.originalname = req.file.originalname;
    avatar.mimetype = req.file.mimetype;
    avatar.size = req.file.size;
    avatar.user = req.user.id;
    avatar.username = req.body.username;
    console.log(avatar)
    avatar.save()
    res.redirect(SERVER + '/home')
});
router.get('/avatar',isAuthenticated, async (req, res) => {
    const avatar = await Avatar.find({user: req.user.id }).sort({createdAt: 'desc'})
    res.json(avatar)

});

module.exports = router;
