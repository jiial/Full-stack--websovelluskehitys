const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0
  }
    const likes = blogs.map( blog => blog.likes )
    var sum = likes.reduce((a, b) => a + b, 0)
    return sum
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  }
  var favorite = blogs[0]
    for (let x=0; x<blogs.length; x++) {
      if (blogs[x].likes > favorite.likes) {
        favorite = blogs[x]
      }
    }
  return favorite
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null
  }
  var authors = []
  const author = { author:blogs[0].author, blogs:1 }
  authors[0] = author
    for (let x=1; x<blogs.length; x++) {
      for (let y=0; y<authors.length; y++) {
        if(authors[y].author === blogs[x].author) {
          var newBlogs = authors[y].blogs + 1
          authors[y] = { author:authors[y].author, blogs:newBlogs }
          continue
        }
      }
      authors[authors.length] = { author:blogs[x].author, blogs:1 }
    }
    var most = authors[0]
    for (let x=0; x<authors.length; x++) {
      if (authors[x].blogs > most.blogs) {
        most = authors[x]
      }
    }
  return most
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null
  }
  var authors = []
  const author = { author:blogs[0].author, votes:blogs[0].likes }
  authors[0] = author
    for (let x=1; x<blogs.length; x++) {
      for (let y=0; y<authors.length; y++) {
        if(authors[y].author === blogs[x].author) {
          var newLikes = authors[y].votes + blogs[x].likes
          authors[y] = { author:authors[y].author, votes:newLikes }
          continue
        }
      }
      authors[authors.length] = { author:blogs[x].author, votes:blogs[x].likes }
    }
    var most = authors[0]
    for (let x=0; x<authors.length; x++) {
      if (authors[x].votes > most.votes) {
        most = authors[x]
      }
    }
  return most
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}