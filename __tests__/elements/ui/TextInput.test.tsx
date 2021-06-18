import React from 'react'
import { cleanup, render, waitFor, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TextInput } from '~ui'

// beforeAll(() => {})
// afterAll(() => {})
// beforeEach(() => {})
afterEach(() => {
  cleanup()
  jest.clearAllMocks()
})

describe('TextInput', () => {
  it('renders correctly', async () => {
    const props = {
      name: 'test',
      value: '',
      onChange: jest.fn()
    }

    const { container } = render(<TextInput {...props}>Test</TextInput>)
    await waitFor(() => container)

    expect(container).toMatchSnapshot()
  })
})
