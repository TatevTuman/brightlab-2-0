import React from 'react'
import renderer from 'react-test-renderer'
import ErrorBoundary from './ErrorBoundary'

describe('ErrorBoundary', () => {
  it('render()', () => {
    const errorBoundary = renderer.create(<ErrorBoundary />).toJSON()
    expect(errorBoundary).toMatchSnapshot()
  })
})
