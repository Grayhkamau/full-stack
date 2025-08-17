const app = require('express')()
const express = require('express')
const mongoose = require('mongoose')
const blogsRouter =  require('./controllers/blogs');
const {errorHandler, unknownEndpoint} =  require('./utils/middlware');
mongoose
.connect(process.env.MONGODB_URL)
.then((response)=>console.log('mongo db connected'))
.catch((error)=>console.error('mongo db connection error-> ', error.message))

app.use(express.json())

app.use('/api/blogs', blogsRouter)

app.use(unknownEndpoint);

app.use(errorHandler);


module.exports = app