import React from 'react'
import { render, cleanup, waitFor } from '@testing-library/react'
import List from './List'
import { AnyObject } from '@types'

// beforeAll(() => {})
// afterAll(() => {})
// beforeEach(() => {})
afterEach(() => {
  cleanup()
  jest.clearAllMocks()
})

describe('List', () => {
  const items = [1, 2, 3, 4, 5, 6, 7, 8]
  const Item = jest.fn(props => {
    return <div>{props.listData.number}</div>
  })
  const list = (props?: AnyObject) => {
    return render(
      <List<number>
        items={items}
        columns={{
          mobile: 1,
          landscape: 2,
          tablet: 3,
          desktop: 4
        }}
        offset={20}
        Component={Item}
        onItemClick={jest.fn()}
        {...props}
      />
    )
  }

  it('renders correctly', async () => {
    const { container } = list()

    expect(container).toMatchSnapshot()
    expect(Item).toHaveBeenCalledTimes(items.length)
  })

  it('renders error correctly', async () => {
    const errorMessage = 'Test error'
    const { getByText } = list({ error: new Error(errorMessage) })
    expect(getByText(errorMessage)).toBeInTheDocument()
  })

  it('renders loading correctly', async () => {
    const { container, getByTestId } = list({ loading: true })
    await waitFor(() => container)

    expect(getByTestId('loader')).toBeInTheDocument()
  })

  it('renders noMessage correctly', async () => {
    const { getByText } = list({ items: [] })

    expect(getByText('Not found')).toBeInTheDocument()
  })
})
