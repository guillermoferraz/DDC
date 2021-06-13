const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const { isAuthenticated }= require('../helpers/auth');
const passport = require('passport')
const SERVER = require('../address');


router.get('/blog', isAuthenticated, async (req, res) => {
    const blog = await Blog.find({user: req.user.id}).sort({date: 'desc'})
    res.json(blog)
});

router.post('/blog', isAuthenticated ,async (req, res) => {
    const {title,content} = req.body;
    const newBlog = new Blog({title,content});
    newBlog.user = req.user.id;
    await newBlog.save();
    res.send({title,content});
});
router.delete('/blog/:id',async (req,res) => {
    await Blog.findByIdAndRemove(req.params.id)
})
router.get('/blog/:id',async (req,res) => {
    const blog = await Blog.findById(req.params.id)
    res.json(blog)
})
router.put('/blog/:id',async(req,res) => {
    const {title,content} = req.body;
    await Blog.findByIdAndUpdate(req.params.id,{
        title,content
    });
})

module.exports = router;
