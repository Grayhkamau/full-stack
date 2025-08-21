const User = require('../models/users');
const { sign } = require('../utils/jwt');

const loginRouter = require('express').Router();


loginRouter.post('/', async(req,res)=>{

    let {username, password} = req.body;

    if(!username||!password) return res.status(400).end();

    let user = await User.find({username})

    if(!user.length) return res.status(400).json({error:'incorrect password or username'});

    let token = sign({username,name:user[0].name,id:user[0]._id.toString()});

    console.log('getting login second')

    return res.status(200).json({token})
})

module.exports = loginRouter