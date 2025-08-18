const blogsRouter =  require('express').Router();
const Blog = require('../models/blogs');


blogsRouter.get('/', async (req, res) => {
    const response = await Blog.find({})
    return res.status(200).json(response)
})

blogsRouter.post('/', async (req, res) => {
  const blog = new Blog(req.body)
  
  if(!blog.author||!blog.title) return res.status(400).end()

  let response = await blog.save();

  return res.status(201).json(response)
})

blogsRouter.delete('/:id', async(req,res)=>{
  const id = req.params.id
  
  await Blog.findByIdAndDelete({_id:id})

  return res.status(204).end()

})

module.exports = blogsRouter