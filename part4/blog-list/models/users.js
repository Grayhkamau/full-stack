const mongoose =  require('mongoose');



const usersSchema = mongoose.Schema({
    name:{
        type:String,
        minlength:3,
        required:true
    },
    username:{
        type:String,
        unique:true,
        required:true
    },
    hashPassword:{
        type:String,
        required:true
    }
})


const Users = mongoose.model('user', usersSchema);

module.exports = Users;