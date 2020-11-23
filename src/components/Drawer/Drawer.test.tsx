import React from 'react'
import { render, cleanup, waitFor, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from '@elements'
import { useDrawer } from '@hooks'
import Drawer from './Drawer'

jest.useFakeTimers()

// beforeAll(() => {})
// afterAll(() => {})
// beforeEach(() => {})
afterEach(() => {
  cleanup()
  jest.clearAllMocks()
})

const TestDrawer = () => {
  const { openDrawer, closeDrawer } = useDrawer('TestDrawer')

  return (
    <>
      <div id={'drawers'} data-testid={'drawers'} />
      <Drawer drawerName={'TestDrawer'}>
        <div data-testid={'drawer'}>TestDrawer</div>
      </Drawer>
      <Button onClick={openDrawer}>Open TestDrawer</Button>
      <Button onClick={closeDrawer}>Close TestDrawer</Button>
    </>
  )
}

describe('Drawer', () => {
  it('renders correctly', async () => {
    const { container, getByText, getByTestId } = render(<TestDrawer />)
    const awaitedContainer = await waitFor(() => container)
    const drawersContainer = getByTestId('drawers')

    let drawer = awaitedContainer.querySelector('div[data-testid="drawer"]')

    expect(drawer).toBeNull()
    expect(drawersContainer.childElementCount).toBe(0)

    const openButton = getByText('Open TestDrawer')
    userEvent.click(openButton)

    drawer = awaitedContainer.querySelector('div[data-testid="drawer"]')

    expect(drawer).toBeInTheDocument()
    expect(drawersContainer.childElementCount).toBe(1)
    expect(awaitedContainer).toMatchSnapshot()

    const closeButton = getByText('Close TestDrawer')
    userEvent.click(closeButton)

    setTimeout(() => {
      drawer = awaitedContainer.querySelector('div[data-testid="drawer"]')

      expect(drawer).toBeNull()
      expect(drawersContainer.childElementCount).toBe(0)
    }, 1000)

    act(() => {
      jest.runAllTimers()
    })
  })
})
