const express = require('express')
const phoneBookRouter = require('./controllers/phonebook');
const {errorHandler,unknownEnpoint} =  require('./utils/middleware');
const app = express()
app.use(express.static('dist'))
app.use(express.json())
app.use(logger(':method :url :status :res[content-length] - :response-time ms :response'))
app.use('/api/persons', phoneBookRouter)

app.use(unknownEnpoint);
app.use(errorHandler);


module.exports = app;