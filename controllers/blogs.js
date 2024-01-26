const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      })
  })
  
  blogsRouter.post('/', (request, response) => {
    const blog = new Blog(request.body)
  
    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
  })
  
  blogsRouter.delete('/:id', (request, response) => {
      Blog.findByIdAndDelete(request.params.id)
          .then(result => {
              response.json(result)
              response.status(204).end()
          })
  })
  
  blogsRouter.put('/:id', (request, response) => {
      const body = request.body
      const blog = {
      author: body.author,
      title: body.title,
      url: body.url,
      likes: body.likes
    }
  
      Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
          .then(updatedBlog => {
              response.json(updatedBlog)
          })
  })

  module.exports = blogsRouter