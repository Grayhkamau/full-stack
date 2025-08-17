const mongoose = require('mongoose')
const {MONGODB_URL} = require('../utils')


const phoneBookSchema = new mongoose.Schema({
  name:{
    type:String,
    minlength: 3,
    required:true
  },

  number:{
    type:String,
    minlength:8,
    required:true,
    validate:[function (number){
      return (number.includes('-') && number.split('-').length===2 && (number.split('-')[0].length===3 || number.split('-')[0].length===2))
    }, 'invalid phone number']
  }
})

phoneBookSchema.set('toJSON',{
  transform:(document,returnedObject) => {
    returnedObject.id = returnedObject._id.toString()

    delete returnedObject._id
    delete returnedObject.__v
  }
})
const PhoneBookModel = mongoose.model('person',phoneBookSchema)


module.exports = PhoneBookModel
