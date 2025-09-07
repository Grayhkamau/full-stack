const Blog = require('../models/blogs');

const blogsRouter =  require('express').Router();
const User = require('../models/users');
const { userExtractor } = require('../utils/middlware');

blogsRouter.get('/', async (req, res) => {
    const response = await Blog.find({}).populate('creator', {name:1,username:1})
    return res.status(200).json(response)
})


blogsRouter.post('/', userExtractor, async (req, res) => {
  let {author,title,url} = req.body;
  if(!author||!title||!url) return res.status(400).end()

  let userInfo = req.user;

  let user = await User.findById({_id:userInfo.id})

  if(!user) return res.status(401).json({error:'incorrect token'})

  const blog = new Blog({
    author, title, url, creator:user._id
  })
  
  user.blogs = user.blogs.concat(blog._id)
  await user.save()

  let response = await blog.save();

  console.log('saving blog')
  return res.status(201).json(response)
})

blogsRouter.delete('/:id', userExtractor, async(req,res)=>{

  const id = req.params.id

  const userInfo = req.user;

  if(!userInfo||!userInfo.id) return res.status(401).json({error:'incorrect token'})
  
  let blogDeleted = await Blog.findOneAndDelete({_id:id,creator:userInfo.id})

  console.log('this is the blogdeleted ->', blogDeleted)
  if(!blogDeleted) return res.status(401).end();

  let user = await User.findById({_id:userInfo.id});

  console.log('this is user ->', user)

  let newBlogs = user.blogs.filter(blog=>blog.toString()!==id);

  user.blogs = newBlogs;

  await user.save()

  return res.status(204).end()

})

blogsRouter.put('/:id',userExtractor, async(req,res)=>{
  const id = req.params.id;
  console.log('hitting the likes endpoint')
  
  let blog = await Blog.findById({_id:id}).populate('creator');

  if(!blog) return res.status(404).end();

  blog.likes++

  await blog.save()

  return res.status(201).json(blog)
  
})
module.exports = blogsRouter