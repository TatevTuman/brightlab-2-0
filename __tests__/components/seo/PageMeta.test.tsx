import React from 'react'
import { cleanup, render, waitFor, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { PageMeta } from '~seo'

// beforeAll(() => {})
// afterAll(() => {})
// beforeEach(() => {})
afterEach(() => {
  cleanup()
  jest.clearAllMocks()
})

describe('PageMeta', () => {
  it('renders correctly', async () => {
    const props = {
      title: 'Title'
    }

    const { container } = render(<PageMeta {...props} />)
    await waitFor(() => container)

    expect(container).toMatchSnapshot()
  })
})
