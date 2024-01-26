const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
app.use(cors())
var morgan = require('morgan')
app.use(morgan(function (tokens, req, res) {
	app.use(express.static('dist'))
	const errorHandler = (error, request, response, next) => {
		console.error(error.message)

		if (error.name === 'CastError') {
			return response.status(400).send({ error: 'malformatted id' })
		} else if (error.name === 'ValidationError') {
			return response.status(400).send({ error: error.message })
		}

		next(error)
	}

	app.use(errorHandler)

	return [
		tokens.method(req, res),
		tokens.url(req, res),
		tokens.status(req, res),
		tokens.res(req, res, 'content-length'), '-',
		tokens['response-time'](req, res), 'ms',
		JSON.stringify(req.body)
	].join(' ')
}))
const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

mongoose.set('strictQuery', false)
const password = 'BestbelieveImstillbejeweled'

const url =
  `mongodb+srv://MD:${password}@cluster0.dpqj8dr.mongodb.net/?retryWrites=true&w=majority`


const connectToDb = async () => {
	await mongoose.connect(url)
		.then(() => {
			console.log('connected to MongoDB')
		})
		.catch((error) => {
			console.log('error connecting to MongoDB:', error.message)
		})
}
connectToDb()

blogSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})

app.use(cors())
app.use(express.json())

app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

app.delete('/api/blogs/:id', (request, response) => {
	Blog.findByIdAndDelete(request.params.id)
		.then(result => {
			response.json(result)
			response.status(204).end()
		})
})

app.put('/api/blogs/:id', (request, response) => {
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

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})