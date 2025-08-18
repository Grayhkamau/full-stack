const blogsRouter =  require('express').Router();
const Blog = require('../models/blogs');


blogsRouter.get('/', async (req, res) => {
    const response = await Blog.find({})
    return res.status(200).json(response)
})

blogsRouter.post('/', async (req, res) => {
  const blog = new Blog(req.body)

  let response = await blog.save();

  return res.status(201).json(response)
})


module.exports = blogsRouter