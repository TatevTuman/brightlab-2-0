import { cleanup } from '@testing-library/react'
import { renderHook, act } from '@testing-library/react-hooks'
import useWindowSize from './useWindowSize'

// beforeAll(() => {})
// afterAll(() => {})
// beforeEach(() => {})
afterEach(() => {
  cleanup()
  jest.clearAllMocks()
})

describe('UseLoadingDelay', () => {
  it('useLoadingDelay', () => {
    // TODO extend global interface in index.d.ts
    global.innerWidth = 994

    const { result } = renderHook(useWindowSize)

    expect(result.current.width).toBe(994)
    expect(result.current.breakpoint).toBe('desktop')

    const breakpoints: Record<string, number> = {
      mobile: 576,
      landscape: 768,
      tablet: 992
    }

    Object.keys(breakpoints).forEach(breakpoint => {
      const width = breakpoints[breakpoint]
      // TODO extend global interface in index.d.ts
      global.innerWidth = width

      act(() => {
        global.dispatchEvent(new Event('resize'))
      })

      expect(result.current.width).toBe(width)
      expect(result.current.breakpoint).toBe(breakpoint)
    })
  })
})
