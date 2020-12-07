import React from 'react'
import { render, cleanup, waitFor } from '@testing-library/react'
import ModalFooter from './ModalFooter'

// beforeAll(() => {})
// afterAll(() => {})
// beforeEach(() => {})
afterEach(() => {
  cleanup()
  jest.clearAllMocks()
})

describe('ModalFooter', () => {
  it('renders correctly', async () => {
    const { container, getByText } = render(<ModalFooter>children</ModalFooter>)
    await waitFor(() => container)

    expect(container).toMatchSnapshot()
    expect(getByText('children')).toBeInTheDocument()
  })
})
