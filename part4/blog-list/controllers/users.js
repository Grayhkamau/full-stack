const usersRouter = require('express').Router();
const User = require('../models/users');
const bcrypt = require('bcrypt');

usersRouter.post('/', async(req,res)=>{
    const {username, password, name} =  req.body;

    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
        name,username,hashPassword
    })

    let userSaved = await newUser.save()

    return res.status(201).json(userSaved)

})

usersRouter.get('/', async(req,res)=>{
    let users = await User.find({});

    if(!users.length) return res.status(404).json({msg:"no users in db"})

    return res.status(200).json(users)
})


module.exports = usersRouter