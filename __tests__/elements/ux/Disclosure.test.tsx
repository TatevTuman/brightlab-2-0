import React from 'react'
import { cleanup, render, waitFor, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Disclosure } from '~ux'

// beforeAll(() => {})
// afterAll(() => {})
// beforeEach(() => {})
afterEach(() => {
  cleanup()
  jest.clearAllMocks()
})

describe('Disclosure', () => {
  it('renders correctly', async () => {
    const props = {
      title: 'Test',
      description: 'Test'
    }

    const { container } = render(<Disclosure {...props} />)
    await waitFor(() => container)

    expect(container).toMatchSnapshot()
  })
})
