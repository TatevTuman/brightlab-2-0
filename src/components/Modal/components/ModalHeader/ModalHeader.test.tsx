import React from 'react'
import { render, cleanup, waitFor } from '@testing-library/react'
import ModalHeader from './ModalHeader'

// beforeAll(() => {})
// afterAll(() => {})
// beforeEach(() => {})
afterEach(() => {
  cleanup()
  jest.clearAllMocks()
})

describe('ModalHeader', () => {
  it('renders correctly', async () => {
    const { container, getByText } = render(<ModalHeader>children</ModalHeader>)
    const awaitedContainer = await waitFor(() => container)

    expect(awaitedContainer).toMatchSnapshot()
    expect(getByText('children')).toBeInTheDocument()
  })
})
