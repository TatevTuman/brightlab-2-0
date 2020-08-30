import React from 'react'
import renderer from 'react-test-renderer'
import Form from './Form'

describe('Form', () => {
  it('render()', () => {
    const button = renderer
      .create(
        <Form defaultValues={{ name: 'test', password: 'test' }} onSubmit={data => null}>
          <input type="text" />
        </Form>
      )
      .toJSON()
    expect(button).toMatchSnapshot()
  })
})
