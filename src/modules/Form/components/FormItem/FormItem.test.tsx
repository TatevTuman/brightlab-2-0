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
    await waitFor(() => container)

    expect(container).toMatchSnapshot()
    expect(getByText('children')).toBeInTheDocument()
  })
})
