const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })
})

describe('the favorite blog', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]
  const listWithTwoBlogs = [{
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }, {
    _id: '5a422aa71b54a676234d17f9',
    title: 'Please don`t copy code',
    author: 'Endina Richards',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 8,
    __v: 0
  }]
  const result1 = listHelper.favoriteBlog(listWithOneBlog)
  test('when the list only has one blog is the amount of likes it has', () => {
    expect(result1).toBe(5);
  })
  const result2 = listHelper.favoriteBlog(listWithTwoBlogs)
  test('when the list has many blogs, the favorite is the one that has the most likes', () => {
    expect(result2).toBe(8);
  })
})

describe('the author with most blogs', () => {
  const listWithTwoBlogs = [{
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }, {
    _id: '5a422aa71b54a676234d17f9',
    title: 'Please don`t copy code',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 8,
    __v: 0
  }]
  const result2 = listHelper.mostBlogs(listWithTwoBlogs)
  test('when the list has many blogs, the author with the most blogs is returned', () => {
    expect(result2).toBe('Edsger W. Dijkstra');
  })
})

describe('the author with most likes', () => {
  const listWithTwoBlogs = [{
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 8,
    __v: 0
  }, {
    _id: '5a422aa71b54a676234d17f9',
    title: 'Please don`t copy code',
    author: 'Enrico Hassis',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }]
  const result2 = listHelper.mostLikes(listWithTwoBlogs)
  test('when the list has many blogs, the author with the most likes is returned', () => {
    expect(result2).toBe('Edsger W. Dijkstra');
  })
})

