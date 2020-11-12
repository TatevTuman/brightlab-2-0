import React from 'react'
import { render, cleanup, waitFor } from '@testing-library/react'
import Page from './Page'

beforeAll(() => {})
afterAll(() => {})
beforeEach(() => {})
afterEach(() => {
  cleanup()
  jest.clearAllMocks()
})

describe('Page', () => {
  const props = { children: 'children' }

  it('renders correctly', async () => {
    const { container, getByText } = render(<Page {...props} />)
    const awaitedContainer = await waitFor(() => container)

    expect(awaitedContainer).toMatchSnapshot()
    expect(getByText(props.children)).toBeInTheDocument()
  })
})
