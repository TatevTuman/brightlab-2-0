import React from 'react'
import { cleanup, render, waitFor, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ListBox } from '~ux'

// beforeAll(() => {})
// afterAll(() => {})
// beforeEach(() => {})
afterEach(() => {
  cleanup()
  jest.clearAllMocks()
})

describe('ListBox', () => {
  it('renders correctly', async () => {
    const props = {
      show: true,
      value: 'test',
      options: [{ label: 'Test', value: 'test' }],
      onChange: jest.fn(),
      onShow: jest.fn(),
      onHide: jest.fn()
    }

    const { container } = render(<ListBox {...props}>Test</ListBox>)
    await waitFor(() => container)

    expect(container).toMatchSnapshot()
  })
})
