import axios from 'axios'
import anecdoteService from '../services/anecdotes'

const url = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(url)
  return response.data
}

const createNew = async (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}

const update = async (anecdote) => {
  const a = { ...anecdote, votes: anecdote.votes + 1 }
  const response = await axios.put(`${url}/${anecdote.id}`, a)
  return response.data
}

export default { getAll, createNew, update }