import { cleanup, act } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'
import useLoadingDelay from './useLoadingDelay'

jest.useFakeTimers()

// beforeAll(() => {})
// afterAll(() => {})
// beforeEach(() => {})
afterEach(() => {
  cleanup()
  jest.clearAllMocks()
})

describe('UseLoadingDelay', () => {
  it('useLoadingDelay', async () => {
    const { result, rerender, waitForNextUpdate } = renderHook(({ loading }) => useLoadingDelay(loading), {
      initialProps: { loading: true }
    })

    expect(result.current).toBeTruthy()

    rerender({ loading: false })

    setImmediate(() => {
      act(() => {
        jest.runAllTimers()
      })
    })

    await waitForNextUpdate()

    expect(result.current).toBeFalsy()
  })
})
