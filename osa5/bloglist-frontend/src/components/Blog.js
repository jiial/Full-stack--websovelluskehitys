import React from 'react'
import blogService from '../services/blogs'

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }

  handleClick = (event) => {
    this.setState({ visible: !this.state.visible })
  }

  handleLike = (event) => {
    event.preventDefault()
    const blogObject = {
      title: this.props.blog.title,
      author: this.props.blog.author,
      url: this.props.blog.url,
      likes: this.props.blog.likes + 1,
      user: this.props.blog.user
    }

    blogService
      .update(event.target.name, blogObject)
      .then(newBlog => {
        console.log('blog updated')
        this.setState({ visible: this.state.visible })
      })
    this.props.update()
  }

  render() {
    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }
    if (this.state.visible === false) {
      return (
        <div onClick={this.handleClick}>
          {this.props.blog.title} {this.props.blog.author}
        </div>
      )
    }
    if (this.props.blog.user === null || this.props.blog.user === undefined) {
      return (
        <div>
          <p onClick={this.handleClick}>{this.props.blog.title} {this.props.blog.author}</p>
          <a href={this.props.blog.url}>{this.props.blog.url}</a>
          <p>{this.props.blog.likes} likes</p><form onSubmit={this.props.update} ><button onClick={this.handleLike} name={this.props.blog._id} type="button" value="Submit" >like</button></form>
          <p>added by unknown</p>
          <button name={this.props.blog._id} onClick={this.props.delete} >delete</button>
        </div>
      )
    } else {
      if (this.props.blog.user.username === this.props.user.username) {
        return (
          <div>
            <p onClick={this.handleClick}>{this.props.blog.title} {this.props.blog.author}</p>
            <a href={this.props.blog.url}>{this.props.blog.url}</a>
            <p>{this.props.blog.likes} likes</p><form onSubmit={this.props.update} ><button onClick={this.handleLike} name={this.props.blog._id} type="button" value="Submit" >like</button></form>
            <p>added by {this.props.blog.user.name}</p>
            <button name={this.props.blog._id} onClick={this.props.delete} >delete</button>
          </div>
        )
      } else {
        return (
          <div>
            <p onClick={this.handleClick}>{this.props.blog.title} {this.props.blog.author}</p>
            <a href={this.props.blog.url}>{this.props.blog.url}</a>
            <p>{this.props.blog.likes} likes</p><form onSubmit={this.props.update} ><button onClick={this.handleLike} name={this.props.blog._id} type="button" value="Submit" >like</button></form>
            <p>added by {this.props.blog.user.name}</p>
          </div>
        )
      }
    }
  }
}

export default Blog