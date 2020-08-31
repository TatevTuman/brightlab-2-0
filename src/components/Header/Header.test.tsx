import React from 'react'
import renderer from 'react-test-renderer'
import Header from './Header'

describe('Header', () => {
  it('render()', () => {
    const header = renderer.create(<Header />).toJSON()
    expect(header).toMatchSnapshot()
  })
})
