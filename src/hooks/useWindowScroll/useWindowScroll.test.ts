import { cleanup } from '@testing-library/react'
import { renderHook, act } from '@testing-library/react-hooks'
import useWindowScroll from './useWindowScroll'

// beforeAll(() => {})
// afterAll(() => {})
// beforeEach(() => {})
afterEach(() => {
  cleanup()
  jest.clearAllMocks()
})

describe('UseLoadingDelay', () => {
  it('useDelayEffect', () => {
    const { result } = renderHook(useWindowScroll)

    expect(result.current).toBe(0)

    // TODO extend global interface in index.d.ts
    global.pageYOffset = 100

    act(() => {
      global.dispatchEvent(new Event('scroll'))
    })

    expect(result.current).toBe(100)
  })
})
