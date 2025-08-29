const testRouter = require('express').Router();
const User = require('../models/users');
const Blogs = require('../models/blogs');

testRouter.post('/reset', async(req,res)=>{
    await User.deleteMany();
    await Blogs.deleteMany();

    return res.status(201).end()

})

module.exports = testRouter;