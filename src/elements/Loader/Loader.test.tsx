import React from 'react'
import { act, render, cleanup, waitFor } from '@testing-library/react'
import Loader from './Loader'

jest.useFakeTimers()

// beforeAll(() => {})
// afterAll(() => {})
// beforeEach(() => {})
afterEach(() => {
  cleanup()
  jest.clearAllMocks()
})

describe('Loader', () => {
  const props = {
    type: 'Triangle' as const,
    color: 'var(--primary)',
    height: 60,
    width: 60,
    timeout: 5000,
    noMessage: 'Failed to load'
  }

  it('renders correctly', async () => {
    const { container } = render(<Loader {...props} />)
    await waitFor(() => container)

    expect(container).toMatchSnapshot()
  })

  it('renders color correctly', async () => {
    const { container } = render(<Loader {...props} />)
    const polygon = container.querySelector('polygon')
    expect(polygon).toHaveAttribute('stroke', 'var(--primary)')
  })

  it('renders size correctly', async () => {
    const { container } = render(<Loader {...props} />)
    const svg = container.querySelector('svg')
    expect(svg).toHaveAttribute('width', props.width.toString())
    expect(svg).toHaveAttribute('height', props.height.toString())
  })

  it('renders loaded state correctly', async () => {
    const { getByText } = render(<Loader {...props} />)

    setTimeout(() => {
      const noMessage = getByText(props.noMessage)
      expect(noMessage).toBeInTheDocument()
    }, props.timeout)

    act(() => {
      jest.runAllTimers()
    })
  })
})
