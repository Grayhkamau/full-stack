const {PORT} = require('./utils');
const logger = require('morgan')
const app = require('./app');
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

mongoose.connect(MONGODB_URL)
  .then(() => console.log('db connected'))
  .catch((err) => console.log('error ocurred', err.message))


logger.token('response',function(req){
  
  return JSON.stringify(req.body)
})


app.listen(PORT,() => {
  console.log(`app listening on port ${PORT}`)
})