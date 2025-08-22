const jwt = require('jsonwebtoken');
const {SECRET} = require('./config');

const sign = (userInfo)=>{
    const token = jwt.sign(userInfo,SECRET);

    return token
}

const verify = (token)=>{
    const userInfo =  jwt.verify(token,SECRET)

    return userInfo
}


module.exports = {verify,sign}