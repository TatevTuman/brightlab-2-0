import React from 'react'
import { render, cleanup, waitFor } from '@testing-library/react'
import Link from './Link'

// beforeAll(() => {})
// afterAll(() => {})
// beforeEach(() => {})
afterEach(() => {
  cleanup()
  jest.clearAllMocks()
})

describe('Link', () => {
  it('renders correctly', async () => {
    const { container, getByText } = render(<Link to={'/'}>Link</Link>)
    await waitFor(() => container)

    expect(getByText('Link')).toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })

  it('renders active correctly', () => {
    const { getByText } = render(
      <Link to={'/'} active={true}>
        Link
      </Link>
    )

    const link = getByText('Link')
    expect(link).toHaveAttribute('data-active', 'true')
  })

  it('renders underlined correctly', () => {
    const { getByText } = render(
      <Link to={'/'} underlined={true}>
        Link
      </Link>
    )

    const link = getByText('Link')
    expect(link).toHaveAttribute('data-underlined', 'true')
  })

  it('renders active and underlined correctly', () => {
    const { getByText } = render(
      <Link to={'/'} underlined={true} active={true}>
        Link
      </Link>
    )

    const link = getByText('Link')
    expect(link).toHaveAttribute('data-active', 'true')
    expect(link).toHaveAttribute('data-underlined', 'true')
  })
})
