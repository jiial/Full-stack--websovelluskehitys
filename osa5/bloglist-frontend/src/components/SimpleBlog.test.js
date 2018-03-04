import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe.only('<SimpleBlog />', () => {
    const simpleBlog = {
        title: "testi",
        author: "testaaja",
        likes: 2
    }
    const blogComponent = shallow(<SimpleBlog blog={simpleBlog} />)

    it('renders title', () => {
        const contentDiv = blogComponent.find('.title')

        expect(contentDiv.text()).toContain(simpleBlog.title)
    })

    it('renders author', () => {
        const contentDiv = blogComponent.find('.author')

        expect(contentDiv.text()).toContain(simpleBlog.author)
    })

    it('renders likes', () => {
        const contentDiv = blogComponent.find('.likes')

        expect(contentDiv.text()).toContain(simpleBlog.likes)
    })
})