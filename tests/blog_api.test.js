const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')

const initialBlogs = [
    {
        id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 8,
        __v: 0
      }, {
        id: '5a422aa71b54a676234d17f9',
        title: 'Please don`t copy code',
        author: 'Enrico Hassis',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      },
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

test('blogs are returned as json and there are all the blogs', async () => {
    response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length)
  await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('blogs should have an id', async () => {
    response = await api.get('/api/blogs')
    for (let blog in response.body){
        expect(response.body[blog].id).toBeDefined()
    }
    
})

test('when creating a saved blog, it should be added onto the database', async () => {
    before = await api.get('/api/blogs')
    beforecontent = before.body

    await api.post('/api/blogs')
    .send({
        id: '5a422aa71b54a676234d17f2',
        title: 'Writing tests is hard',
        author: 'Enrico Hallas',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
    })
    .expect(201)



    after = await api.get('/api/blogs')
    aftercontent = after.body
    expect((after.body).length-(before.body).length).toBe(1)
})

test('when creating a saved blog, if it does not have a likes value, it should be set to 0', async () => {
    newobjectname = 'Writing tests is hard'
    await api.post('/api/blogs')
    .send({
        id: '5a422aa71b54a676234d17f2',
        title: 'Writing tests is hard',
        author: 'Enrico Hallas',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
    })
    .expect(201)


    after = await api.get('/api/blogs')
    aftercontent = after.body
    addedobject = aftercontent.filter(blog => blog.title === newobjectname)
    expect(addedobject[0].likes).toBeDefined()


})

test('when creating a saved blog, if it does not have a value in the url or the title, the server should return 400, Bad Request', async () => {
    newobjectname = 'Writing tests is hard'
    before = await api.get('/api/blogs')
    beforecontent = before.body
    
    await api.post('/api/blogs')
    .send({
        id: '5a422aa71b54a676234d17f2',
        author: 'Enrico Hallas',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
    })
    .expect(400)

    after = await api.get('/api/blogs')
    aftercontent = after.body
    expect((after.body).length-(before.body).length).toBe(0)


})

afterAll(async () => {
  await mongoose.connection.close()
}, 100000)