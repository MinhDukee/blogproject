const dummy = (blogs) => {
    return 1
  }

const totalLikes = (blogs) => {
    return blogs.reduce((accumulator, currentValue) => accumulator + currentValue.likes, 0)
}

const favoriteBlog = (blogs) => {
    return Math.max(...blogs.map(blog => blog.likes)) 
}

const mostBlogs = (blogs) => {
  authorsandblogs = {}
  for (let blog in blogs) {
    let current = blogs[blog].author
    console.log(current)
    if (current in authorsandblogs){
      authorsandblogs[current] += 1
      console.log(authorsandblogs)
    } else {
      authorsandblogs[current] = 1
      console.log(authorsandblogs)
    }
  }
  return Object.keys(authorsandblogs).reduce(function(a, b){ return authorsandblogs[a] > authorsandblogs[b] ? a : b })
}

const mostLikes = (blogs) => {
  authorsandlikes = {}
  for (let blog in blogs) {
    let current = blogs[blog].author
    
    if (current in authorsandlikes){
      authorsandlikes[current] += blogs[blog].likes
    
    } else {
      authorsandlikes[current] = blogs[blog].likes
    
    }
  }
  return Object.keys(authorsandlikes).reduce(function(a, b){ return authorsandlikes[a] > authorsandlikes[b] ? a : b })
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
  }