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

usersSchema.set('toJson', {
    tranform: (document,object)=>{
        object.id = object._id.toString()
        delete object._v
        delete object._id

        delete object.hashPassword
    }
})

const Users = mongoose.model('user', usersSchema);

module.exports = Users;