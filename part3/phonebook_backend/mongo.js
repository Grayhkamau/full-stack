const mongoose = require('mongoose');

console.log(process.argv)
if(process.argv.length<3) process.exit(1);

const password = process.argv[2] || null
const name = process.argv[3] || null
const number = process.argv[4] || null

const db = 'phonebook'

mongoose.set("strictQuery", false)

const url =  `mongodb+srv://hkamau263:${password}@cluster0.iqohxtx.mongodb.net/${db}?retryWrites=true&w=majority&appName=Cluster0`
0

mongoose.connect(url).then(()=>console.log('db connected'))

const phoneBookSchema = new mongoose.Schema({
        name:'string',
        number:'string'
})

const PhoneBookModel = mongoose.model('person',phoneBookSchema);

if(process.argv.length>3){
    let NewPerson = new PhoneBookModel({ name,number})

    NewPerson.save().then((result)=>{
        console.log(`added ${result.name} number ${result.number} to phonebook`)
        mongoose.connection.close()
    })
    .catch(error=>console.log(error.message))
    return
}

    PhoneBookModel.find({}).then((phoneBook)=>{
        phoneBook.forEach(person=>{
            console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
    })

