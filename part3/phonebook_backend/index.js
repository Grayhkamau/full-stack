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


app.get('/api/persons',(req,res)=>{
    PhoneBookModel.find({}).then((result)=>{
        res.json(result||[])
    })
})

app.get('/info',(req,res)=>{
    PhoneBookModel.find()
    .then(people=>{
        res.send(`<div><p> Phonebook has info for ${people.length} people</p> <p>${Date()}</p></div>`)
    })
})

app.get('/api/persons/:id', (req,res,next)=>{
    const id = req.params.id;
    PhoneBookModel.findById(id)
    .then(person=>{
        if(!person) res.status(404).end()
        res.json(person)
    })
    .catch(err=>next(err))
})

//implemented deleting people in the database and intregrated with frontend
app.delete('/api/persons/:id',(req,res, next)=>{
    const id = req.params.id
    
    PhoneBookModel.findByIdAndDelete(id)
    .then(personRemoved=>res.json({id:personRemoved.id}).status(200))
    .catch(err=>next(err))

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


app.put('/api/persons/:id', (req,res,next)=>{
    let id = req.params.id;
    let {number, name} = req.body;
    PhoneBookModel.findByIdAndUpdate(id, {number})
    .then(updatedPerson=>{
        if(!updatedPerson) res.status(404).end()
        updatedPerson.number = number
        res.json(updatedPerson)
    })
    .catch(err=>next(err))
})

const errorHandler = (error,req,res,next)=>{
        if(error.name === "CastError") res.status(400).send({error:'malformatted id'})

        next(error);
}

app.use(errorHandler);

const PORT = 3001;
app.listen(PORT,()=>{
    console.log(`app listening on port ${PORT}`)
})