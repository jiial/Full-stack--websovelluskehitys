const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const { format, initialBlogs, nonExistingId, blogsInDb, usersInDb } = require('./test_helper')


beforeAll(async () => {
    await Blog.remove({})

    const blogObjects = initialBlogs.map(n => new Blog(n))
    await Promise.all(blogObjects.map(n => n.save()))
})

test('blogs are returned as json', async () => {
    const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
    const blogsInDatabase = await blogsInDb()

    const response = await api
        .get('/api/blogs')

    expect(response.body.length).toBe(blogsInDatabase.length)
})

test('a specific blog is within the returned blogs', async () => {
    const response = await api
        .get('/api/blogs')

    const titles = response.body.map(r => r.title)

    expect(titles).toContain('React patterns')
})

test('a valid blog can be added ', async () => {
    const blogsAtStart = await blogsInDb()

    const newBlog = {
        title: "Test",
        author: "Tester",
        url: "http://www.test.com",
        likes: 7,
        user: "5a9314d003454d516704fce0"
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const blogsAfterOperation = await blogsInDb()

    expect(blogsAfterOperation.length).toBe(blogsAtStart.length + 1)

    const titles = blogsAfterOperation.map(r => r.title)
    expect(titles).toContain('Test')
})


test('blog without title is not added ', async () => {
    const newBlog = {
        author: "Simo"
    }

    const initialBlogs = await blogsInDb()

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

    const response = await blogsInDb()

    expect(response.length).toBe(initialBlogs.length)
})

test('blog without likes will have 0 likes', async () => {
    const newBlog = {
        author: "Simo",
        title: "Blogi",
        url: "https://www.blogit.fi",
        user: "5a9314d003454d516704fce0"
    }

    const initialBlogs = await blogsInDb()

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)

    const response = await blogsInDb()
    const likes = response.map(r => r.likes)

    expect(response.length).toBe(initialBlogs.length + 1)
    expect(likes).toContain(0)
})
/*
test('a specific blog can be viewed', async () => {
    const resultAll = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const aBlogFromAll = resultAll.body[0]

    const resultBlog = await api
        .get(`/api/blogs/${aBlogFromAll.id}`)

    const blogObject = resultBlog.body

    expect(blogObject).toEqual(aBlogFromAll)
})
*/
test('a blog can be deleted', async () => {
    const newBlog = {
        title: 'Hieno blogi',
        author: 'Blogaaja',
        url: 'www.blogi.com',
        likes: 2,
        user: "5a9314d003454d516704fce0"
    }

    const addedBlog = await api
        .post('/api/blogs')
        .send(newBlog)

    const blogsAtBeginningOfOperation = await blogsInDb()

    await api
        .delete(`/api/blogs/${addedBlog.body.id}`)
        .expect(204)

    const blogsAfterDelete = await blogsInDb()

    const titles = blogsAfterDelete.map(r => r.title)

    expect(titles).not.toContain('Hieno blogi')
    expect(blogsAfterDelete.length).toBe(blogsAtBeginningOfOperation.length - 1)
})

test('a blog can be edited', async () => {
    const blogsAtBeginningOfOperation = await blogsInDb()

    const blog = blogsAtBeginningOfOperation[0]

    const editedBlog = {
        id: blog.id,
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: 2
    }

    await api
        .put(`/api/blogs/${blog.id}`)
        .send(editedBlog)
        .expect(200)

    const blogsAfterEdit = await blogsInDb()

    const likes = blogsAfterEdit.map(r => r.likes)

    expect(likes).toContain(2)
    expect(blogsAfterEdit.length).toBe(blogsAtBeginningOfOperation.length)
})

describe('when there is initially one user at db', async () => {
    beforeAll(async () => {
        await User.remove({})
        const user = new User({ username: 'root', password: 'sekret', name: 'Ron', adult: true })
        await user.save()
    })

    test('POST /api/users succeeds with a fresh username', async () => {
        const usersBeforeOperation = await usersInDb()

        const newUser = {
            username: 'mluukkai',
            name: 'Matti Luukkainen',
            adult: true,
            password: 'salainen'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const usersAfterOperation = await usersInDb()
        expect(usersAfterOperation.length).toBe(usersBeforeOperation.length + 1)
        const usernames = usersAfterOperation.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })

    test('POST /api/users fails with proper statuscode and message if username already taken', async () => {
        const usersBeforeOperation = await usersInDb()

        const newUser = {
            username: 'root',
            name: 'Superuser',
            password: 'salainen'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body).toEqual({ error: 'username must be unique' })

        const usersAfterOperation = await usersInDb()
        expect(usersAfterOperation.length).toBe(usersBeforeOperation.length)
    })

    test('POST /api/users fails with proper statuscode and message if password is too short', async () => {
        const usersBeforeOperation = await usersInDb()

        const newUser = {
            username: 'root2',
            name: 'Superuser',
            password: 's'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body).toEqual({ error: 'password must be at least 3 characters long' })

        const usersAfterOperation = await usersInDb()
        expect(usersAfterOperation.length).toBe(usersBeforeOperation.length)
    })

    test('User is adult by default if not defined', async () => {
        const usersBeforeOperation = await usersInDb()

        const newUser = {
            username: 'testikayttaja',
            name: 'Testi Testinen',
            password: 'salainen'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const usersAfterOperation = await usersInDb()
        expect(usersAfterOperation.length).toBe(usersBeforeOperation.length + 1)
        const adults = usersAfterOperation.map(u => u.adult)
        expect(adults[adults.length - 1]).toBe(true)
    })
})


afterAll(() => {
    server.close()
})
