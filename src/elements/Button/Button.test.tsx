import React from 'react'
import renderer from 'react-test-renderer'
import Button from './Button'

describe('Button', () => {
  it('render()', () => {
    const button = renderer
      .create(
        <Button type={'primary'} size={'lg'} onClick={() => null} loading={false} disabled={false}>
          Button
        </Button>
      )
      .toJSON()
    expect(button).toMatchSnapshot()
  })
})
