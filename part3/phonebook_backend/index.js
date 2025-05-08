require("dotenv").config();
const express = require('express');
const logger = require('morgan');
const PhoneBookModel = require('./models/phonebook');

const app = express();
app.use(express.static("dist"));
app.use(express.json());
app.use(logger(':method :url :status :res[content-length] - :response-time ms :response'))


logger.token('response',function(req,res){
    return JSON.stringify(req.body)
})


app.get('/', (req,res)=>{
    res.send("<div>Hello from backend</div>")
})
app.get('/api/persons',(req,res)=>{
    PhoneBookModel.find({}).then((result)=>{
    
        res.json(result)
    })
    .catch(error=>console.log("error occured ", error.message))
})

app.get('/info',(req,res)=>{
    res.send(`<div><p> Phonebook has info for ${persons.length} people</p> <p>${Date()}</p></div>`)
})

app.get('/api/persons/:id', (req,res)=>{
    const id = req.params.id;
    PhoneBookModel.find({_id:id})
    .then(person=>res.json(person))
})

app.delete('/api/persons/:id',(req,res)=>{
    const id = req.params.id
    
    PhoneBookModel.findByIdAndDelete(id)
    .then(personRemoved=>res.json({id:personRemoved.id}).status(200))
    .catch(err=>console.log("error deleting user ", err.message))

})

app.post('/api/persons', (req,res)=>{
    let body = req.body;

    if(!body||!body?.name||!body?.number) return res.status(400).json({error:'name or number missing'});
    
    let newPerson = new PhoneBookModel({
        name:body.name,
        number:body.number
    })
    newPerson.save().then(person=>{
        res.json(person)
    })
})
const PORT = 3001;
app.listen(PORT,()=>{
    console.log(`app listening on port ${PORT}`)
})