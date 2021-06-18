import React from 'react'
import { cleanup, render, waitFor, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Dynamic, IconType } from '~svg'

// beforeAll(() => {})
// afterAll(() => {})
// beforeEach(() => {})
afterEach(() => {
  cleanup()
  jest.clearAllMocks()
})

describe('Button', () => {
  it('renders correctly', async () => {
    const props = {
      icon: 'Logo' as IconType
    }

    const { container } = render(<Dynamic {...props} />)
    await waitFor(() => container)

    expect(container).toMatchSnapshot()
  })
})
