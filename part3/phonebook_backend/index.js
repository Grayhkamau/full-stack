const express = require('express');
const logger = require('morgan');

const app = express();

app.use(express.static("dist"));

app.use(express.json());

app.use(logger(':method :url :status :res[content-length] - :response-time ms :response'))

logger.token('response',function(req,res){
    return JSON.stringify(req.body)
})

let persons = [
    {
        id:"1",
        name:"Arto Hellas",
        number:"040-123456"
    },
    {
        id:"2",
        name:"Ada Lovelace",
        number:"3-44-5323523"
    },
    {
        id:"3",
        name:"Dan Abramov",
        number:"12-43-234345"
    }
]

app.get('/', (req,res)=>{
    res.send("<div>Hello from backend</div>")
})
app.get('/api/persons',(req,res)=>{
    res.json(persons)
})

app.get('/info',(req,res)=>{
    res.send(`<div><p> Phonebook has info for ${persons.length} people</p> <p>${Date()}</p></div>`)
})

app.get('/api/persons/:id', (req,res)=>{
    const id = req.params.id;
    console.log('id', id)

    const person = persons.find(person=>person.id===id);

    if(!person){
        return res.status(404).end();
    }
    res.json(person);
})

app.delete('/api/persons/:id',(req,res)=>{
    const id = req.params.id
    
    persons = persons.filter(person=>person.id!==id);

    res.json({id}).status(200)

})

app.post('/api/persons', (req,res)=>{
    let body = req.body;

    if(!body||!body?.name||!body?.number) return res.status(400).json({error:'name or number missing'});
    let personExists = persons.find(person=>person.name===body.name)

    if(personExists) return res.status(400).json({error:'name must be unique'});

    let personObject = {
        id:String(Math.floor(Math.random()*100)),
        name:body.name,
        number:body.number
    }
    persons = persons.concat(personObject)

    res.status(200).json(personObject);
})
const PORT = 3001;
app.listen(PORT,()=>{
    console.log(`app listening on port ${PORT}`)
})