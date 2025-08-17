
const errorHandler = (error,req,res,next) => {
  if(error.name === 'CastError') res.status(400).send({ error:'malformatted id' })
  else if(error.name==='ValidationError') res.status(400).json({ error:error.message })
  next(error)
}

const unknownEnpoint = (req,res,next)=>{
  return res.status(404).json({message:'unknown endpoint'})
}

module.exports = {errorHandler, unknownEnpoint}