import React from 'react'
import { render, cleanup, waitFor, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import withToggle from './withToggle'

// beforeAll(() => {})
// afterAll(() => {})
// beforeEach(() => {})
afterEach(() => {
  cleanup()
  jest.clearAllMocks()
})

describe('withToggle', () => {
  const WithToggleComponent = withToggle(props => {
    const { toggle, handleToggle } = props

    return (
      <div data-testid={'with-toggle-component'}>
        <div>{toggle.toString()}</div>
        <button onClick={() => handleToggle(!toggle)}>Toggle</button>
      </div>
    )
  })

  it('renders correctly', async () => {
    const { container } = render(<WithToggleComponent />)
    await waitFor(() => container)

    expect(container).toMatchSnapshot()
  })

  it('renders default toggle correctly', async () => {
    const { container, getByText } = render(<WithToggleComponent defaultToggle={true} />)
    await waitFor(() => container)

    expect(getByText('true')).toBeInTheDocument()
  })

  it('handles onChange', async () => {
    const { container, getByText } = render(<WithToggleComponent />)
    await waitFor(() => container)

    const button = getByText('Toggle')

    expect(getByText('false')).toBeInTheDocument()

    act(() => {
      userEvent.click(button)
    })

    expect(getByText('true')).toBeInTheDocument()
  })
})
