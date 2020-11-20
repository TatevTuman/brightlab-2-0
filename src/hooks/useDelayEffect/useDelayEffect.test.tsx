import { cleanup } from '@testing-library/react'
import { renderHook, act } from '@testing-library/react-hooks'
import useDelayEffect from './useDelayEffect'

jest.useFakeTimers()

// beforeAll(() => {})
// afterAll(() => {})
// beforeEach(() => {})
afterEach(() => {
  cleanup()
  jest.clearAllMocks()
})

describe('UseDelayEffect', () => {
  it('useDelayEffect', async () => {
    const { result, rerender } = renderHook(({ loading, delay }) => useDelayEffect(loading, delay), {
      initialProps: { loading: true, delay: 1000 }
    })

    expect(result.current).toBeTruthy()

    rerender({ loading: false, delay: 1000 })

    setTimeout(() => {
      expect(result.current).toBeFalsy()
    }, 1000)

    act(() => {
      jest.runAllTimers()
    })

    rerender({ loading: true, delay: 5000 })
    rerender({ loading: false, delay: 5000 })

    setTimeout(() => {
      expect(result.current).toBeFalsy()
    }, 5000)

    act(() => {
      jest.runAllTimers()
    })
  })
})
