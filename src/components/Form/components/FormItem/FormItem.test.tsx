import React from 'react'
import { cleanup, waitFor, render } from '@testing-library/react'
import FormItem from './FormItem'

// beforeAll(() => {})
// afterAll(() => {})
// beforeEach(() => {})
afterEach(() => {
  cleanup()
  jest.clearAllMocks()
})

describe('FormItem', () => {
  it('renders correctly', async () => {
    const { container, getByText } = render(<FormItem>children</FormItem>)
    const awaitedContainer = await waitFor(() => container)

    expect(awaitedContainer).toMatchSnapshot()
    expect(getByText('children')).toBeInTheDocument()
  })
})
