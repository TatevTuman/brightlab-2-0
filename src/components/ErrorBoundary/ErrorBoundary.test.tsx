import React from 'react'
import { render, cleanup, waitFor } from '@testing-library/react'
import ErrorBoundary from './ErrorBoundary'

// beforeAll(() => {})
// afterAll(() => {})
// beforeEach(() => {})
afterEach(() => {
  cleanup()
  jest.clearAllMocks()
})

describe('ErrorBoundary', () => {
  const props = { children: 'children' }

  it('renders correctly', async () => {
    const { container, getByText } = render(<ErrorBoundary {...props} />)
    const awaitedErrorBoundary = await waitFor(() => container)

    expect(awaitedErrorBoundary).toMatchSnapshot()
    expect(getByText(props.children)).toBeInTheDocument()
  })

  // it('renders error correctly', async () => {
  //   const ErrorComponent = () => {
  //     throw new Error('Error')
  //     return <div />
  //   }
  //   const { container, getByText } = render(
  //     <ErrorBoundary>
  //       <ErrorComponent />
  //     </ErrorBoundary>
  //   )
  //
  //   expect(getByText('Something went wrong')).toBeInTheDocument()
  // })
})
