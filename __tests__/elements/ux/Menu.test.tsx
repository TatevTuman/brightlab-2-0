import React from 'react'
import { cleanup, render, waitFor, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Menu } from '~ux'

// beforeAll(() => {})
// afterAll(() => {})
// beforeEach(() => {})
afterEach(() => {
  cleanup()
  jest.clearAllMocks()
})

describe('Listbox', () => {
  it('renders correctly', async () => {
    const props = {
      show: true,
      options: [{ label: 'Test', value: 'test' }],
      onShow: jest.fn(),
      onHide: jest.fn()
    }

    const { container } = render(<Menu {...props}>Test</Menu>)
    await waitFor(() => container)

    expect(container).toMatchSnapshot()
  })
})
