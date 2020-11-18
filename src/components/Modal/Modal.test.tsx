import React from 'react'
import { render, cleanup, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from '@elements'
import { useModal } from '@hooks'
import Modal from './Modal'

// beforeAll(() => {})
// afterAll(() => {})
// beforeEach(() => {})
afterEach(() => {
  cleanup()
  jest.clearAllMocks()
})

const TestModal = () => {
  const { openModal, closeModal } = useModal('TestModal')

  return (
    <>
      <div id={'modals'} data-testid={'modals'} />
      <Modal modalName={'TestModal'}>
        <div data-testid={'modal'}>TestModal</div>
      </Modal>
      <Button onClick={openModal}>Open TestModal</Button>
      <Button onClick={closeModal}>Close TestModal</Button>
    </>
  )
}

describe('Modal', () => {
  it('renders correctly', async () => {
    const { container, getByText, getByTestId } = render(<TestModal />)
    const awaitedContainer = await waitFor(() => container)
    const modalsContainer = getByTestId('modals')

    let modal = awaitedContainer.querySelector('div[data-testid="modal"]')

    expect(modal).toBeNull()
    expect(modalsContainer.childElementCount).toBe(0)

    const openButton = getByText('Open TestModal')
    userEvent.click(openButton)

    modal = awaitedContainer.querySelector('div[data-testid="modal"]')

    expect(modal).toBeInTheDocument()
    expect(modalsContainer.childElementCount).toBe(1)
    expect(awaitedContainer).toMatchSnapshot()

    const closeButton = getByText('Close TestModal')
    userEvent.click(closeButton)

    modal = awaitedContainer.querySelector('div[data-testid="modal"]')

    expect(modal).toBeNull()
    expect(modalsContainer.childElementCount).toBe(0)
  })
})
