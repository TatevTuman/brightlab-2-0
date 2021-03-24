import React from 'react'
import { cleanup, render, waitFor } from '@testing-library/react'
import { icons } from '@utils'
import Icon, { IconName } from './Icon'

jest.useFakeTimers()

// beforeAll(() => {})
// afterAll(() => {})
// beforeEach(() => {})
afterEach(() => {
  cleanup()
  jest.clearAllMocks()
})

describe('Icon', () => {
  it('renders correctly', async () => {
    const { container, rerender } = render(<Icon name={icons[0] as IconName} />)
    await waitFor(() => container)

    icons.forEach(icon => {
      rerender(<Icon name={icon as IconName} />)
      expect(container).toMatchSnapshot()
    })
  })
})
