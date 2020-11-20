import { cleanup } from '@testing-library/react'
import { renderHook, act } from '@testing-library/react-hooks'
import useModal from './useModal'

jest.useFakeTimers()

// beforeAll(() => {})
// afterAll(() => {})
// beforeEach(() => {})
afterEach(() => {
  cleanup()
  jest.clearAllMocks()
})

describe('UseModal', () => {
  it('useModal', async () => {
    const modalName = 'HomeModal'
    const { result } = renderHook(() => useModal(modalName))
    const { openModal, closeModal } = result.current

    expect(result.current.modal).toBeFalsy()

    act(openModal)

    expect(result.current.modal).toBeTruthy()
    expect(result.current.modal!.name).toBe(modalName)

    act(() => openModal({ counter: 1 }))

    expect(result.current.modal).toBeTruthy()
    expect(result.current.modal!.state!.counter).toBe(1)

    act(closeModal)

    expect(result.current.modal).toBeTruthy()

    setTimeout(() => {
      expect(result.current.modal).toBeFalsy()
    }, 500)

    act(() => {
      jest.runAllTimers()
    })
  })
})
