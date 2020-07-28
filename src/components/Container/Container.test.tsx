import React from 'react'
import renderer from 'react-test-renderer'
import Container from './Container'

describe('Container', () => {
  it('render()', () => {
    const tree = renderer
      .create(
        <Container>
          <div>child</div>
        </Container>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
