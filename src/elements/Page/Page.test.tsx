import React from 'react'
import renderer from 'react-test-renderer'
import Page from './Page'

describe('Page', () => {
  it('render()', () => {
    const page = renderer
      .create(
        <Page>
          <div>Hello World</div>
        </Page>
      )
      .toJSON()
    expect(page).toMatchSnapshot()
  })
})
