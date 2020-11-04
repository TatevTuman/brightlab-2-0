import React from 'react'
import renderer from 'react-test-renderer'
import Checkbox from './Checkbox'

describe('Checkbox', () => {
  it('render()', () => {
    const checkbox = renderer.create(<Checkbox />).toJSON()
    expect(checkbox).toMatchSnapshot()
  })
})
