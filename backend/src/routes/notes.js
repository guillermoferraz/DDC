const express = require('express');
const router = express.Router();
const Notes = require('../models/Notes');
const { isAuthenticated }= require('../helpers/auth');
const passport = require('passport')
const SERVER = require('../address');


router.get('/notes', isAuthenticated, async (req, res) => {
    const notes = await Notes.find({user: req.user.id}).sort({date: 'desc'})
    res.json(notes)
});

router.post('/notes', isAuthenticated ,async (req, res) => {
    const {title,comment ,description, priority} = req.body;
    const newNote = new Notes({title,comment ,description, priority});
    newNote.user = req.user.id;
    await newNote.save();
    res.send({title,comment ,description, priority});
});
router.delete('/notes/:id',async (req,res) => {
    await Notes.findByIdAndRemove(req.params.id)
})
router.get('/notes/:id',async (req,res) => {
    const notes = await Notes.findById(req.params.id)
    res.json(notes)
})
router.put('/notes/:id',async(req,res) => {
    const {title,comment, description,priority} = req.body;
    await Notes.findByIdAndUpdate(req.params.id,{
        title,comment,description,priority
    });
})

module.exports = router;
