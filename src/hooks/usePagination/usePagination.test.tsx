/* eslint-disable @typescript-eslint/ban-ts-comment */

import React from 'react'
import { cleanup, render } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'
import { MockedProvider } from '@apollo/client/testing'
import { gql } from '@apollo/client'
import { AnyObject } from '@types'
import usePagination, { UsePaginationArgs } from './usePagination'

const FetchPaginatedItems = gql`
  query FetchPaginatedItems($pagination: PaginationArgs!, $filters: FilterArgs, $sortBy: String) {
    res: paginatedItems(pagination: $pagination, filters: $filters, sortBy: $sortBy) {
      id
      name
    }
  }
`

const requests = new Array(100).fill(0).map((_, index) => {
  return {
    request: {
      query: FetchPaginatedItems,
      variables: {
        pagination: {
          page: index,
          pageSize: 20
        }
      }
    },
    result: {
      data: {
        res: {
          content: [],
          pagination: {
            page: index,
            pageSize: 20
          }
        }
      }
    }
  }
})

const mocks = requests

type TestUsePaginationItem = {
  id: string
  name: string
}

const TestUsePagination = (props: UsePaginationArgs<AnyObject>) => {
  const { query, variables, options, initialPage, initialPageSize } = props

  const { result } = renderHook(() =>
    usePagination<TestUsePaginationItem, AnyObject>(query, variables, options, initialPage, initialPageSize)
  )

  console.log('result', result.current)

  return <div>Test</div>
}

const TestUsePaginationComponent = (props: Omit<UsePaginationArgs<AnyObject>, 'query'>) => {
  const usePaginationProps = {
    ...props,
    query: FetchPaginatedItems
  }

  return (
    <MockedProvider mocks={mocks} addTypename={false}>
      <TestUsePagination {...usePaginationProps} {...props} />
    </MockedProvider>
  )
}

// beforeAll(() => {})
// afterAll(() => {})
// beforeEach(() => {})
afterEach(() => {
  cleanup()
  jest.clearAllMocks()
})

describe('UsePagination', () => {
  // TODO tests
  const props = {
    variables: {},
    options: {},
    initialPage: 1,
    initialPageSize: 20
  }

  it('usePagination', async () => {
    // const { container } = render(<TestUsePaginationComponent {...props} />)
    //
    // await new Promise(resolve => setTimeout(resolve, 0));

    // expect(result.current.data).toHaveLength(5)
    // expect(result.current.page).toBe(2)
    // expect(result.current.pageSize).toBe(5)
    //
    // // @ts-ignore
    // act(result.current.fetchMore)
    //
    // expect(result.current.data).toHaveLength(10)
    // expect(result.current.page).toBe(3)
    // expect(result.current.pageSize).toBe(5)
    //
    // // @ts-ignore
    // act(result.current.fetchMore)
    //
    // expect(result.current.data).toHaveLength(15)
    // expect(result.current.page).toBe(4)
    // expect(result.current.pageSize).toBe(5)
    //
    // // @ts-ignore
    // act(() => result.current.fetchMore(1, 4))
    //
    // expect(result.current.data).toHaveLength(4)
    // expect(result.current.page).toBe(1)
    // expect(result.current.pageSize).toBe(4)
  })
})
