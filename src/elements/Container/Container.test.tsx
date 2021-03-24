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
    await waitFor(() => container)

    expect(container).toMatchSnapshot()
    expect(getByText(props.children)).toBeInTheDocument()
  })
})
