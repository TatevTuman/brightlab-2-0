import React from 'react'
import { render, cleanup, waitFor, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from '@elements'
import { useModal } from '@hooks'
import Modal from './Modal'

jest.useFakeTimers()

// beforeAll(() => {})
// afterAll(() => {})
// beforeEach(() => {})
afterEach(() => {
  cleanup()
  jest.clearAllMocks()
})

const TestModal = () => {
  const { modal, openModal, closeModal } = useModal('TestModal')

  return (
    <>
      <div id={'modals'} data-testid={'modals'}>
        <Modal id={'TestModal'} onClose={closeModal} opened={!!modal}>
          <div data-testid={'modal'}>TestModal</div>
        </Modal>
      </div>
      <Button onClick={openModal}>Open TestModal</Button>
      <Button onClick={closeModal}>Close TestModal</Button>
    </>
  )
}

describe('Modal', () => {
  it('renders correctly', async () => {
    const { container, getByText, getByTestId } = render(<TestModal />)
    await waitFor(() => container)

    const modalsContainer = getByTestId('modals')

    let modal = container.querySelector('div[data-testid="modal"]')

    expect(modal).toBeNull()
    expect(modalsContainer.childElementCount).toBe(0)

    const openButton = getByText('Open TestModal')
    userEvent.click(openButton)

    modal = container.querySelector('div[data-testid="modal"]')

    expect(modal).toBeInTheDocument()
    expect(modalsContainer.childElementCount).toBe(1)
    expect(container).toMatchSnapshot()

    const closeButton = getByText('Close TestModal')
    userEvent.click(closeButton)

    setTimeout(() => {
      modal = container.querySelector('div[data-testid="modal"]')

      expect(modal).toBeNull()
      expect(modalsContainer.childElementCount).toBe(0)
    }, 1000)

    act(() => {
      jest.runAllTimers()
    })
  })
})
