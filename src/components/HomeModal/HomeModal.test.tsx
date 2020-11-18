import React, { useEffect } from 'react'
import { render, cleanup, waitFor } from '@testing-library/react'
import { useModal } from '@hooks'
import HomeModal from './HomeModal'

// beforeAll(() => {})
// afterAll(() => {})
// beforeEach(() => {})
afterEach(() => {
  cleanup()
  jest.clearAllMocks()
})

const TestHomeModal = () => {
  const { openModal } = useModal('HomeModal')

  useEffect(() => {
    openModal()
  }, [])

  return (
    <>
      <div id={'modals'} />
      <HomeModal />
    </>
  )
}

describe('HomeModal', () => {
  it('renders correctly', async () => {
    const { container } = render(<TestHomeModal />)
    const awaitedContainer = await waitFor(() => container)

    expect(awaitedContainer).toMatchSnapshot()
  })
})
