const usersRouter = require('express').Router();
const User = require('../models/users');
const {hash_password} = require('../utils/encrypt_password');


usersRouter.post('/', async(req,res)=>{
    console.log('hitting the CREATE user endpoint');
    const {username, password, name} =  req.body;

    if(name.length<3||password.length<3) return res.status(400).json({error:'invalid username or password'})
    const saltRounds = 10;
    const hashPassword = await hash_password(password, saltRounds);

    const newUser = new User({
        name,username,hashPassword
    })

    
     
    let userSaved = await newUser.save()

    return res.status(201).json(userSaved)

})

usersRouter.get('/', async(req,res)=>{
    let users = await User.find({}).populate('blogs', {title:1,author:1,url:1,likes:1});

    if(!users.length) return res.status(404).json({msg:"no users in db"})

    return res.status(200).json(users)
})


module.exports = usersRouter