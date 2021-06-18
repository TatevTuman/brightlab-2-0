import React from 'react'
import { cleanup, render, waitFor, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { PageLayout } from '~layouts'

// beforeAll(() => {})
// afterAll(() => {})
// beforeEach(() => {})
afterEach(() => {
  cleanup()
  jest.clearAllMocks()
})

describe('PageLayout', () => {
  it('renders correctly', async () => {
    const props = {}

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    /* @ts-ignore */
    const { container } = render(<PageLayout {...props} />)
    await waitFor(() => container)

    expect(container).toMatchSnapshot()
  })
})
