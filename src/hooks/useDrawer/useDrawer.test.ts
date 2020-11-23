import { cleanup } from '@testing-library/react'
import { renderHook, act } from '@testing-library/react-hooks'
import useDrawer from './useDrawer'

jest.useFakeTimers()

// beforeAll(() => {})
// afterAll(() => {})
// beforeEach(() => {})
afterEach(() => {
  cleanup()
  jest.clearAllMocks()
})

describe('UseDrawer', () => {
  it('useDrawer', async () => {
    const drawerName = 'HomeDrawer'
    const { result } = renderHook(() => useDrawer(drawerName))
    const { openDrawer, closeDrawer } = result.current

    expect(result.current.drawer).toBeFalsy()

    act(openDrawer)

    expect(result.current.drawer).toBeTruthy()
    expect(result.current.drawer!.name).toBe(drawerName)

    act(() => openDrawer({ counter: 1 }))

    expect(result.current.drawer).toBeTruthy()
    expect(result.current.drawer!.state!.counter).toBe(1)

    act(closeDrawer)

    expect(result.current.drawer).toBeTruthy()

    setTimeout(() => {
      expect(result.current.drawer).toBeFalsy()
    }, 500)

    act(() => {
      jest.runAllTimers()
    })
  })
})
