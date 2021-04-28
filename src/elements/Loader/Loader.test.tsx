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
    color: 'primary',
    height: 60,
    width: 60,
    timeout: 15000
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
})
