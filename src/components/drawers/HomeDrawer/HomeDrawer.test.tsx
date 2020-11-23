import React, { useEffect } from 'react'
import { render, cleanup, waitFor } from '@testing-library/react'
import { useModal } from '@hooks'
import HomeDrawer from './HomeDrawer'

// beforeAll(() => {})
// afterAll(() => {})
// beforeEach(() => {})
afterEach(() => {
  cleanup()
  jest.clearAllMocks()
})

const TestHomeDrawer = () => {
  const { openModal } = useModal('HomeDrawer')

  useEffect(() => {
    openModal()
  }, [])

  return (
    <>
      <div id={'drawers'} />
      <HomeDrawer />
    </>
  )
}

describe('HomeDrawer', () => {
  it('renders correctly', async () => {
    const { container } = render(<TestHomeDrawer />)
    const awaitedContainer = await waitFor(() => container)

    expect(awaitedContainer).toMatchSnapshot()
  })
})
