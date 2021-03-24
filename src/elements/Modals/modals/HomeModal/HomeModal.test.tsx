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
  const modal = useModal('HomeModal')

  useEffect(() => {
    modal.openModal()
  }, [])

  return (
    <>
      <div id={'modals'} />
      <HomeModal {...modal} />
    </>
  )
}

describe('HomeModal', () => {
  it('renders correctly', async () => {
    const { container } = render(<TestHomeModal />)
    await waitFor(() => container)

    expect(container).toMatchSnapshot()
  })
})
