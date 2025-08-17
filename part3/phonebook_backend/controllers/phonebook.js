const PhoneBookModel = require('../models/phonebook')
const PhoneBookRouter = require('express').Router();

PhoneBookRouter.get('/',(req,res) => {
  PhoneBookModel.find({}).then((result) => {
    res.json(result||[])
  })
})

PhoneBookRouter.get('/info',(req,res) => {
  PhoneBookModel.find()
    .then(people => {
      res.send(`<div><p> Phonebook has info for ${people.length} people</p> <p>${Date()}</p></div>`)
    })
})

PhoneBookRouter.get(':id', (req,res,next) => {
  const id = req.params.id
  PhoneBookModel.findById(id)
    .then(person => {
      if(!person) res.status(404).end()
      res.json(person)
    })
    .catch(err => next(err))
})

//implemented deleting people in the database and intregrated with frontend
PhoneBookRouter.delete(':id',(req,res, next) => {
  const id = req.params.id

  PhoneBookModel.findByIdAndDelete(id)
    .then(personRemoved => res.json({ id:personRemoved.id }).status(200))
    .catch(err => next(err))

})

PhoneBookRouter.post('/', (req,res, next) => {
  let body = req.body

  let newPerson = new PhoneBookModel({
    name:body.name,
    number:body.number
  })
  newPerson.save().then(person => {
    res.json(person)
  })
    .catch(error => next(error))
})


PhoneBookRouter.put(':id', (req,res,next) => {
  let id = req.params.id
  let { number } = req.body
  PhoneBookModel.findByIdAndUpdate(id, { number })
    .then(updatedPerson => {
      if(!updatedPerson) res.status(404).end()
      updatedPerson.number = number
      res.json(updatedPerson)
    })
    .catch(err => next(err))
})




module.exports = PhoneBookRouter;