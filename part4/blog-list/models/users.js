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
    },
    blogs:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Blog"
        }
    ]
})


usersSchema.set('toJson', {
    tranform: (document,returnedObject)=>{
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject.__v
        delete returnedObject._id

        delete returnedObject.hashPassword
    }
})

const User = mongoose.model('user', usersSchema);

module.exports = User;