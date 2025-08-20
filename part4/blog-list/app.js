const app = require('express')()
const express = require('express')
const mongoose = require('mongoose')
const blogsRouter =  require('./controllers/blogs');
const {errorHandler, unknownEndpoint} =  require('./utils/middlware');
const {MONGODB_URL} = require('./utils/config');
const usersRouter =  require('./controllers/users');
const loginRouter = require('./controllers/login');
mongoose
.connect(MONGODB_URL)
.then(()=>console.log('mongo db connected'))
.catch((error)=>console.error('mongo db connection error-> ', error.message))

app.use(express.json())

app.use('/api/login', loginRouter);
app.use('/api/users', usersRouter);
app.use('/api/blogs', blogsRouter);

app.use(unknownEndpoint);

app.use(errorHandler);


module.exports = app