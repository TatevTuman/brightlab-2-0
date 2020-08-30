import React from 'react'
import renderer from 'react-test-renderer'
import Link from './Link'

describe('Link', () => {
  it('render()', () => {
    const button = renderer.create(<Link to={'/'}>Home</Link>).toJSON()
    expect(button).toMatchSnapshot()
  })
})
