import React from 'react'
import { mount } from 'enzyme'
import Blog from './components/Blog'
jest.mock('./services/blogs')
import blogService from './services/blogs'
import App from './App'

describe('<App />', () => {
  let app
  beforeAll(() => {
    app = mount(<App />)
  })

  it('renders no notes if user not logged in', () => {
    app.update()
    const blogComponents = app.find(Blog)
    expect(blogComponents.length).toEqual(0)
  })
})
