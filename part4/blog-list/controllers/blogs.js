const Blog = require('../models/blogs');

const blogsRouter =  require('express').Router();
const User = require('../models/users');
const { verify } = require('../utils/jwt');

blogsRouter.get('/', async (req, res) => {
    const response = await Blog.find({}).populate('creator', {name:1,username:1})
    return res.status(200).json(response)
})



blogsRouter.post('/', async (req, res) => {
  let {author,title,url} = req.body;
  let header = req.headers.authorization;

  if(!header) return res.status(401).json({error:'no token attached'});

  let token = header.replace('Bearer ', '');

  if(!token) return res.status(401).json({error:'no token attached'});

  let userInfo = verify(token);

  if(!userInfo||!userInfo.id) return res.status(401).json({error:'incorrect token'})

  let user = await User.findById({_id:userInfo.id})

  if(!user) return res.status(401).json({error:'incorrect token'})

  if(!author||!title||!url) return res.status(400).end()

  const randomUser =  await User.find({})
  console.log(randomUser[0]._id)
  const blog = new Blog({
    author, title, url, creator:randomUser[0]._id
  })
  
  randomUser[0].blogs = randomUser[0].blogs.concat(blog._id)
  await randomUser[0].save()

  let response = await blog.save();

  return res.status(201).json(response)
})

blogsRouter.delete('/:id', async(req,res)=>{
  const id = req.params.id
  
  await Blog.findByIdAndDelete({_id:id})

  return res.status(204).end()

})

blogsRouter.put('/:id', async(req,res)=>{
  const id = req.params.id;
  
  let blog = await Blog.findById({_id:id});

  if(!blog) return res.status(404).end();

  blog.likes++

  await blog.save()

  return res.status(201).json(blog)
  
})
module.exports = blogsRouter