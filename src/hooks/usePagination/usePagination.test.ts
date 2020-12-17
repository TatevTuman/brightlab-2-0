/* eslint-disable @typescript-eslint/ban-ts-comment */

import { cleanup } from '@testing-library/react'
import { act, renderHook } from '@testing-library/react-hooks'
import usePagination from './usePagination'

jest.mock('./usePagination.ts')

// beforeAll(() => {})
// afterAll(() => {})
// beforeEach(() => {})
afterEach(() => {
  cleanup()
  jest.clearAllMocks()
})

describe('UsePagination', () => {
  // TODO tests
  it('usePagination', async () => {
    const { result } = renderHook(() => usePagination(2 as any, 5))

    expect(result.current.data).toHaveLength(5)
    expect(result.current.page).toBe(2)
    expect(result.current.pageSize).toBe(5)

    // @ts-ignore
    act(result.current.fetchMore)

    expect(result.current.data).toHaveLength(10)
    expect(result.current.page).toBe(3)
    expect(result.current.pageSize).toBe(5)

    // @ts-ignore
    act(result.current.fetchMore)

    expect(result.current.data).toHaveLength(15)
    expect(result.current.page).toBe(4)
    expect(result.current.pageSize).toBe(5)

    // @ts-ignore
    act(() => result.current.fetchMore(1, 4))

    expect(result.current.data).toHaveLength(4)
    expect(result.current.page).toBe(1)
    expect(result.current.pageSize).toBe(4)
  })
})
