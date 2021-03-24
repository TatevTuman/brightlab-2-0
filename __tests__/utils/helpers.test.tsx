import { handleEvent, objectsToOptions } from '@utils'

// beforeAll(() => {})
// afterAll(() => {})
// beforeEach(() => {})
afterEach(() => {
  jest.clearAllMocks()
})

describe('utils/helpers', () => {
  describe('handleEvent', () => {
    const event = jest.fn(value => value)

    it('handles event', () => {
      const handledEvent = () => handleEvent(event)

      handledEvent()
      expect(event).toHaveBeenCalledTimes(1)
    })

    it('handles disabled event', () => {
      const handledEvent = () => handleEvent(event, { disabled: true })

      handledEvent()
      expect(event).toHaveBeenCalledTimes(0)
    })

    it('handles event with value', () => {
      const value = 'Test'
      const handledEvent = () => handleEvent(event, { value: 'Test' })

      const handledValue = handledEvent()
      expect(handledValue).toBe(value)
    })
  })

  describe('objectsToOptions', () => {
    it('handles string args', () => {
      const arr = [{ id: 1, title: 'Test' }]
      const result = objectsToOptions(arr, 'title', 'id')

      expect(result).toStrictEqual([{ label: 'Test', value: 1 }])
    })

    it('handles functional args', () => {
      const arr = [{ id: 1, title: 'Test' }]
      const result = objectsToOptions(
        arr,
        item => item.title,
        item => item.id
      )

      expect(result).toStrictEqual([{ label: 'Test', value: 1 }])
    })
  })
})
