const mongoose = require('mongoose');


mongoose.set("strictQuery", false)

const url =  process.env.MONGODB_URL;

mongoose.connect(url)
.then(()=>console.log('db connected'))
.catch((err)=>console.log('error ocurred', err.message))

const phoneBookSchema = new mongoose.Schema({
        name:{
            type:String,
            minlength: 3,
            required:true
        },
        number:{
            type:String,
            required:true
        }
})

phoneBookSchema.set('toJSON',{
    transform:(document,returnedObject)=>{
        returnedObject.id = returnedObject._id.toString()

        delete returnedObject._id
        delete returnedObject.__v
    }
})
const PhoneBookModel = mongoose.model('person',phoneBookSchema);


module.exports = PhoneBookModel;
