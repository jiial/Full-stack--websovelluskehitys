import anecdoteService from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

export const anecdoteCreation = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'CREATE',
      data: newAnecdote
    })
  }
}

export const voting = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.update(content)
    dispatch({
      type: 'VOTE',
      data: newAnecdote
    })
  }
}

const reducer = (store = [], action) => {
  switch (action.type) {
  case 'CREATE':
    return [...store, action.data]
  case 'INIT_ANECDOTES':
    return action.data
  case 'VOTE':
    console.log(action)
    const old = store.filter(a => a.id !== action.data.id)
    console.log(old)
    const voted = store.find(a => a.id === action.data.id)
    console.log(voted)
    return [...old, { ...voted, votes: voted.votes + 1 }]
  default:
    return store
  }
}

export const anecdoteInitialization = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export default reducer