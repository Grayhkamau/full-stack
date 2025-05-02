const express = require('express');

const app = express();

app.use(express.json());

const persons = [
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


const PORT = 3001;
app.listen(PORT,()=>{
    console.log(`app listening on port ${PORT}`)
})