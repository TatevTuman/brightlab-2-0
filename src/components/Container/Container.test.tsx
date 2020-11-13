import React from 'react'
import { render, cleanup, waitFor } from '@testing-library/react'
import Container from './Container'

// beforeAll(() => {})
// afterAll(() => {})
// beforeEach(() => {})
afterEach(() => {
  cleanup()
  jest.clearAllMocks()
})

describe('Container', () => {
  const props = { children: 'children' }

  it('renders correctly', async () => {
    const { container, getByText } = render(<Container {...props} />)
    const awaitedContainer = await waitFor(() => container)

    expect(awaitedContainer).toMatchSnapshot()
    expect(getByText(props.children)).toBeInTheDocument()
  })
})
