import React from 'react'
import renderer from 'react-test-renderer'
import Page from './Page'

describe('Page', () => {
  it('render()', () => {
    const button = renderer
      .create(
        <Page>
          <div>Hello World</div>
        </Page>
      )
      .toJSON()
    expect(button).toMatchSnapshot()
  })
})
