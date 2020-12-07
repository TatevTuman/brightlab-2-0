import { cleanup } from '@testing-library/react'
import { renderHook, act } from '@testing-library/react-hooks'
import useDelayedState from './useDelayedState'

jest.useFakeTimers()

// beforeAll(() => {})
// afterAll(() => {})
// beforeEach(() => {})
afterEach(() => {
  cleanup()
  jest.clearAllMocks()
})

describe('UseDelayedState', () => {
  it('useDelayedState', async () => {
    const { result } = renderHook(() => useDelayedState(true))

    expect(result.current[0]).toBeTruthy()

    act(() => {
      result.current[1](false)
    })

    setTimeout(() => {
      expect(result.current[0]).toBeFalsy()
    }, 1000)

    act(() => {
      jest.runAllTimers()
    })

    act(() => {
      result.current[1](true)
    })

    expect(result.current[0]).toBeTruthy()

    act(() => {
      result.current[1](false, 5000)
    })

    setTimeout(() => {
      expect(result.current[0]).toBeFalsy()
    }, 5000)

    act(() => {
      jest.runAllTimers()
    })
  })
})
