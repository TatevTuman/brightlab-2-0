import useRequestErrorHandler from './useRequestErrorHandler'
import { ApolloError } from '@apollo/client'
import { renderHook } from '@testing-library/react-hooks'
import { cleanup } from '@testing-library/react'

// beforeAll(() => {})
// afterAll(() => {})
// beforeEach(() => {})
afterEach(() => {
  cleanup()
  jest.clearAllMocks()
})

describe('useRequestErrorHandler', () => {
  it('returns null on requestError', () => {
    const { result } = renderHook(useRequestErrorHandler)
    const handleRequestError = result.current

    expect(handleRequestError(null, new Error('test') as ApolloError)).toBeNull()
  })

  it('returns undefined with nulls', () => {
    const { result } = renderHook(useRequestErrorHandler)
    const handleRequestError = result.current

    expect(handleRequestError(null)).toBeUndefined()
  })

  it('returns success request data', () => {
    const { result } = renderHook(useRequestErrorHandler)
    const handleRequestError = result.current

    const response = handleRequestError({
      data: {
        res: {
          result: 'Test',
          status: 'success',
          error: null
        }
      }
    })

    expect(response).toStrictEqual({
      result: 'Test',
      status: 'success',
      error: null
    })
  })

  it('returns null with no request data', () => {
    const { result } = renderHook(useRequestErrorHandler)
    const handleRequestError = result.current

    expect(handleRequestError({ data: null })).toBeNull()
  })

  it('returns success request data', () => {
    const { result } = renderHook(useRequestErrorHandler)
    const handleRequestError = result.current

    const response = handleRequestError({
      data: {
        res: {
          result: null,
          status: 'failure',
          error: {
            code: '200',
            detail: 'Test error'
          }
        }
      }
    })

    expect(response).toBeNull()
  })
})
