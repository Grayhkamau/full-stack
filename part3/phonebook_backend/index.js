const express = require('express');

const app = express();

app.use(express.json());

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

app.delete('/api/persons/:number',(req,res)=>{
    const number = req.params.number
    
    persons = persons.filter(person=>person.number!==number);

    res.status(204).end()

})

app.post('/api/persons', (req,res)=>{
    let body = req.body;

    if(!body) return res.status(400).end();

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