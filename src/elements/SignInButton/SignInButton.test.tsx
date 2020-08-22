import React from 'react'
import renderer from 'react-test-renderer'
import SignInButton from './SignInButton'

describe('SignInButton', () => {
  it('render()', () => {
    const button = renderer
      .create(<SignInButton type={'primary'} size={'lg'} onClick={() => null} loading={false} disabled={false} />)
      .toJSON()
    expect(button).toMatchSnapshot()
  })
})
