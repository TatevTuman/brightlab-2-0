import React from 'react'
import { cleanup, render, waitFor, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Loader } from '~ux'

// beforeAll(() => {})
// afterAll(() => {})
// beforeEach(() => {})
afterEach(() => {
  cleanup()
  jest.clearAllMocks()
})

describe('Listbox', () => {
  it('renders correctly', async () => {
    const props = {}

    const { container } = render(<Loader {...props}>Test</Loader>)
    await waitFor(() => container)

    expect(container).toMatchSnapshot()
  })
})
