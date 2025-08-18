const blogsRouter =  require('express').Router();
const Blog = require('../models/blogs');


blogsRouter.get('/', async (req, res) => {
    const response = await Blog.find({})
    return res.status(200).json(response)
})

blogsRouter.post('/', (request, response) => {
  const blog = new Blog(request.body)

  blog.save().then((result) => {
    response.status(201).json(result)
  })
})


module.exports = blogsRouter