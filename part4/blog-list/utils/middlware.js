const unknownEndpoint = (req,res)=>{
    return res.status(404).json({message:'unknown endpoint'})
}

const errorHandler = (error,req,res,next)=>{
    return res.status(500).json({msg:error.message})
}


module.exports = {unknownEndpoint,errorHandler}