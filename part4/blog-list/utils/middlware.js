const unknownEndpoint = (req,res)=>{
    return res.status(404).json({message:'unknown endpoint'})
}

const errorHandler = (error,req,res,next)=>{
    if(error.name === "MongoServerError" && error.message.includes("E11000 duplicate key error")) return res.status(400).json({error:'expected username to be unique'})
    
    
    return res.status(500).json({msg:error.message})
}


module.exports = {unknownEndpoint,errorHandler}