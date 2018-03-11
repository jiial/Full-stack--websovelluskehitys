import React from 'react'
import { voting } from '../reducers/anecdoteReducer'
import { notificationChange } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

class AnecdoteList extends React.Component {

  handleVote = async (anecdote) => {
    this.props.voting(anecdote)
    const notification = 'Vote added!'
    this.props.notificationChange(notification)
    setTimeout(() => {
      this.props.notificationChange('')
    }, 5000)
  }

  render() {
    console.log(this.props.filter)
    return (
      <div>
        <h2>Anecdotes</h2>
        {this.props.anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() =>
                this.handleVote(anecdote)
              }>
                vote
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

const anecdotesToShow = (anecdotes, filter) => {
  if (filter === '') {
    return anecdotes
  }
  return anecdotes.filter(a => a.content.includes(filter))
}

const mapStateToProps = (state) => {
  return {
    anecdotes: anecdotesToShow(state.anecdotes, state.filter)
  }
}

const mapDispatchToProps = {
  notificationChange,
  voting
}

const ConnectedAnecdoteList = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)

export default ConnectedAnecdoteList
