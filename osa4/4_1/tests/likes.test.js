const listHelper = require('../utils/list_helper')

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

const emptyList = []

const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }  
]

describe.skip('total likes', () => {
  test('of list with only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('of list with many blogs equals the total likes of those', () => {
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(36)
  })

  test('of empty list is 0', () => {
    const result = listHelper.totalLikes(emptyList)
    expect(result).toBe(0)
  })
})

describe.skip('favorite blog', () => {
  test('of list with only one blog equals that blog', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    expect(result).toEqual(listWithOneBlog[0])
  })

  test('of list with many blogs equals the blog with the most likes among those blogs', () => {
    const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual(blogs[2])
  })

  test('of empty list is null', () => {
    const result = listHelper.favoriteBlog(emptyList)
    expect(result).toEqual(null)
  })
})

describe.skip('author with most blogs', () => {
  test('of list with only one blog equals that blogs author', () => {
    const result = listHelper.mostBlogs(listWithOneBlog)
    const expected = { author: 'Edsger W. Dijkstra', blogs:1 }
    expect(result).toEqual(expected)
  })

  test('of list with many blogs equals the author with the most blogs', () => {
    const result = listHelper.mostBlogs(blogs)
    const expected = { author: "Robert C. Martin", blogs:3 }
    expect(result).toEqual(expected)
  })

  test('of empty list is null', () => {
    const result = listHelper.mostBlogs(emptyList)
    expect(result).toEqual(null)
  })
})

describe.skip('author with most votes', () => {
  test('of list with only one blog equals that blogs author', () => {
    const result = listHelper.mostLikes(listWithOneBlog)
    const expected = { author: 'Edsger W. Dijkstra', votes:5 }
    expect(result).toEqual(expected)
  })

  test('of list with many blogs equals the author with the most votes', () => {
    const result = listHelper.mostLikes(blogs)
    const expected = { author: 'Edsger W. Dijkstra', votes:17 }
    expect(result).toEqual(expected)
  })

  test('of empty list is null', () => {
    const result = listHelper.mostLikes(emptyList)
    expect(result).toEqual(null)
  })
})