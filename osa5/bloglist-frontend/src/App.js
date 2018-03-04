import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import SimpleBlog from './components/SimpleBlog'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      user: null,
      username: '',
      password: '',
      newTitle: '',
      newAuthor: '',
      newUrl: '',
      notification: '',
      loginVisible: false
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )

    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({ user })
      blogService.setToken(user.token)
    }
  }

  update = () => {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )
  }

  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleBlogChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: this.state.newTitle,
      author: this.state.newAuthor,
      url: this.state.newUrl,
      likes: 0,
      user: this.state.user
    }

    blogService
      .create(blogObject)
      .then(newBlog => {
        this.setState({
          blogs: this.state.blogs.concat(newBlog),
          newTitle: '',
          newAuthor: '',
          newUrl: '',
          notification: 'blog added'
        })
        setTimeout(() => {
          this.setState({ notification: null })
        }, 5000)
      })
  }

  deleteBlog = (event) => {
    event.preventDefault()
    const id = event.target.name
    console.log(id)
    blogService
      .remove(id)
      .then(
        console.log("removed"),
        this.update(),
        this.setState({ notification: 'blog removed' })
      )
      setTimeout(() => {
        this.setState({ notification: null })
      }, 5000)
  }

  login = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      this.setState({ username: '', password: '', user })
    } catch (exception) {
      this.setState({
        notification: 'käyttäjätunnus tai salasana virheellinen',
      })
      setTimeout(() => {
        this.setState({ notification: null })
      }, 5000)
    }
  }

  logout = async (event) => {
    event.preventDefault()
    try {
      window.localStorage.clear()
      this.setState({ user: null, username: '', password: '' })
    } catch (error) {
      console.log(error)
    }
  }


  render() {
    const blogForm = () => (
      <div>
        <h2>Luo uusi blogi</h2>

        <form onSubmit={this.addBlog}>
          <label>Title</label>
          <input
            value={this.state.newTitle}
            name="newTitle"
            onChange={this.handleBlogChange}
          />
          <label>Author</label>
          <input
            value={this.state.newAuthor}
            name="newAuthor"
            onChange={this.handleBlogChange}
          />
          <label>Url</label>
          <input
            value={this.state.newUrl}
            name="newUrl"
            onChange={this.handleBlogChange}
          />
          <button>tallenna</button>
        </form>
      </div>
    )

    const loginForm = () => (
      <div>

        <LoginForm
          username={this.state.username}
          password={this.state.password}
          handleChange={this.handleLoginFieldChange}
          handleSubmit={this.login}
        />
        <button onClick={e => this.setState({ loginVisible: false })}>cancel</button>

      </div>
    )



    if (this.state.user === null) {
      if (this.state.loginVisible) {
        return (
          <div>
            <Notification message={this.state.notification} />
            {loginForm()}
          </div>
        )
      } else {
        return (
          <div>
            <Notification message={this.state.notification} />
            <button onClick={e => this.setState({ loginVisible: true })}>login</button>
          </div>
        )
      }
    }

    const blogs = this.state.blogs.sort(function (a, b) {
      var keyA = a.likes,
        keyB = b.likes
      if (keyA < keyB) return 1
      if (keyA > keyB) return -1
      return 0
    })

    return (
      <div>
        <Notification message={this.state.notification} />
        <h2>blogs</h2>
        <p>{this.state.user.name} logged in</p>
        <button onClick={this.logout}>Kirjaudu ulos</button>
        {blogs.map(blog =>
          <Blog user={this.state.user} delete={this.deleteBlog} update={this.update} key={blog._id} blog={blog} ref={component => this.blogForm = component} />
        )}
        {blogForm()}
        {blogs.map(blog => 
          <SimpleBlog blog={blog} />
        )}
      </div>
    )
  }

}

export default App;
