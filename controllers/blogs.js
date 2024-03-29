const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response,) => {
    const blogs = await Blog.find({}).populate('user')
    response.json(blogs)
  })

blogsRouter.post('/', async (request, response, next) => {
    const body = request.body
    const user = request.user
    console.log(user)
    
    const blog = new Blog({
      title: body.title ,
      author: body.author ,
      url: body.url ,
      likes: body.likes === undefined ? 0 : body.likes,
      user: user.id
    })

    try {
    const savedblog = await blog.save()
    user.blogs = user.blogs.concat(savedblog._id)
    await user.save()    
    response.status(201).json(savedblog)
  } catch(exception) {
    next(exception)
  }
  })
  
  blogsRouter.delete('/:id', async (request, response, next) => {
    const blog = await Blog.findById(request.params.id)
    const userId = request.user.id
    if (userId.toString() === blog.user.toString()) {
      const blogtodelete = await Blog.findByIdAndDelete(request.params.id)
        response.json(blogtodelete)
        try {
        response.status(204).end()
      } catch(exception) {
        next(exception)
      }
    }
    else{
      response.status(400).end()
    }

    
  })
  
  blogsRouter.put('/:id', async (request, response, next) => {
      const body = request.body
      const blog = {
      author: body.author,
      title: body.title,
      url: body.url,
      likes: body.likes
    }
  
    const blogtoupdate  = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    try {
    response.json(blogtoupdate)
  } catch(exception) {
    next(exception)
  }
  })

  module.exports = blogsRouter