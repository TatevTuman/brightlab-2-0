import { navigate } from 'gatsby'
import { renderHook } from '@testing-library/react-hooks'
import useUrlSearchParams from './useUrlSearchParams'
import { cleanup } from '@testing-library/react'

// beforeAll(() => {})
// afterAll(() => {})
// beforeEach(() => {})
afterEach(() => {
  cleanup()
  jest.clearAllMocks()
})

const mockWindow = (search: string) => {
  const url = 'http://localhost'

  Object.defineProperty(window, 'location', {
    value: {
      href: url,
      search
    },
    writable: true
  })
}

describe('useUrlSearchParams', () => {
  it('params', () => {
    mockWindow('?test=hello')

    const {
      result: {
        current: { params }
      }
    } = renderHook(() => useUrlSearchParams('test'))

    expect(params).toBe('?test=hello')
  })

  it('getUrlSearchParam', () => {
    mockWindow('?test=hello')

    const {
      result: {
        current: { getUrlSearchParam }
      }
    } = renderHook(() => useUrlSearchParams('test'))

    expect(getUrlSearchParam()).toBe('hello')
  })

  it('getUrlSearchParams', () => {
    mockWindow('?test=hello')

    const {
      result: {
        current: { getUrlSearchParams }
      }
    } = renderHook(() => useUrlSearchParams('test'))

    expect(getUrlSearchParams()).toStrictEqual({ test: ['hello'] })
  })

  it('has UrlSearchParam', () => {
    mockWindow('?test=hello')

    const {
      result: {
        current: { hasUrlSearchParam }
      }
    } = renderHook(() => useUrlSearchParams('test'))

    expect(hasUrlSearchParam('hello')).toBeTruthy()
  })

  it('hasnt UrlSearchParam', () => {
    mockWindow('?test=')

    const {
      result: {
        current: { hasUrlSearchParam }
      }
    } = renderHook(() => useUrlSearchParams('test'))

    expect(hasUrlSearchParam('hello')).toBeFalsy()
  })

  it('setUrlSearchParam', () => {
    const {
      result: {
        current: { setUrlSearchParam }
      }
    } = renderHook(() => useUrlSearchParams('test'))

    setUrlSearchParam('hello')
    expect(navigate).toHaveBeenCalledWith('?test=hello')
  })

  it('setUrlSearchParam with multiple option', () => {
    mockWindow('?test=hello')

    const {
      result: {
        current: { setUrlSearchParam }
      }
    } = renderHook(() => useUrlSearchParams('test'))

    setUrlSearchParam('world', { multiple: true })
    expect(navigate).toHaveBeenCalledWith('?test=hello,world')
  })

  it('setUrlSearchParam with multiple redirect', () => {
    const {
      result: {
        current: { setUrlSearchParam }
      }
    } = renderHook(() => useUrlSearchParams('test'))

    setUrlSearchParam('hello', { redirect: '/home' })
    expect(navigate).toHaveBeenCalledWith('/home?test=hello')
  })
})
