import React from 'react'
import { cleanup, render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Navigation from './Navigation'

beforeAll(() => {
  const location = window.location
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  delete global.window.location
  global.window.location = Object.assign({ href: '/1' }, location)
})
// afterAll(() => {})
// beforeEach(() => {})
afterEach(() => {
  cleanup()
  jest.clearAllMocks()
})

describe('Navigation', () => {
  const navigation = new Array(4).fill(0).map((_, index) => ({
    path: `/page${index}`,
    label: `Page${index}`
  }))

  it('renders correctly', async () => {
    const { container } = render(<Navigation navigation={navigation} />)
    const awaitedContainer = await waitFor(() => container)

    expect(awaitedContainer).toMatchSnapshot()
  })

  it('renders matched link correctly', async () => {
    // TODO
    // const { container, getByText } = render(<Navigation navigation={navigation} activeMatch />)
    //
    // await waitFor(() => container)
    //
    // navigation.forEach(route => {
    //   const label = getByText(route.label)
    //
    //   userEvent.click(label)
    //
    //   console.log(global.location.pathname)
    //
    //   // expect(label).toBeInTheDocument()
    //   // expect(label).toHaveAttribute('data-active', 'true')
    // })
  })
})
