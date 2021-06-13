const express = require('express');
const router = express.Router();
const Table = require('../models/Tables');
const { isAuthenticated }= require('../helpers/auth');
const passport = require('passport')
const SERVER = require('../address');


router.get('/tables', async (req, res) => {
    const tables = await Table.find({user: req.user.id}).sort({date: 'desc'})
    res.json(tables)
});
router.get('/tables/:id',async(req,res ) => {
    const tables = await Table.findById(req.params.id);
    res.json(tables)
})
router.put('/tables/:id',async(req,res) => {
    const {name,title,comment, description} = req.body;
    console.log('table put:',req.body)
    await Table.findByIdAndUpdate(req.params.id,{
        name,title,comment,description
    });
})

router.post('/tables', isAuthenticated ,async (req, res) => {
    const {name,title,comment ,description} = req.body;
    console.log('req_body:',req.body)
    const newTable = new Table({name,title,comment ,description});
    newTable.user = req.user.id;
    await newTable.save();
    res.send({name,title,comment ,description});
});

router.delete('/tables/:id',async (req,res) => {
    await Table.findByIdAndRemove(req.params.id)
})

module.exports = router;
