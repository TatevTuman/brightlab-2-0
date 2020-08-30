import React from 'react'
import renderer from 'react-test-renderer'
import Input from './Input'

describe('Input', () => {
  it('render()', () => {
    const button = renderer.create(<Input name={'name'} />).toJSON()
    expect(button).toMatchSnapshot()
  })
})
