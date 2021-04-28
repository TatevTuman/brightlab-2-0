// import React from 'react'
// import { act, cleanup, render, waitFor } from '@testing-library/react'
// import userEvent, { TargetElement } from '@testing-library/user-event'
// import RangeDatePicker from './RangeDatePicker'
// import { getMonthName, getNextMonth, getPreviousMonth } from '@utils'
//
// // beforeAll(() => {})
// // afterAll(() => {})
// beforeEach(() => {
//   cleanup()
//   jest.clearAllMocks()
// })
// afterEach(() => {
//   cleanup()
//   jest.clearAllMocks()
// })
//
// describe('RangeDatePicker', () => {
//   it('renders correctly', async () => {
//     const now = new Date('January 01, 2000 00:00:00')
//     const startDate = new Date('January 01, 2000 00:00:00')
//     const endDate = new Date(now.setMonth(now.getMonth() + 1))
//
//     const props = {
//       startDate,
//       endDate
//     }
//
//     const { container } = render(<RangeDatePicker {...props} />)
//     await waitFor(() => container)
//     expect(container).toMatchSnapshot()
//   })
//
//   it('renders noToday correctly', async () => {
//     const props = {
//       noToday: true
//     }
//
//     const now = new Date()
//     const { container, getAllByText } = render(<RangeDatePicker {...props} />)
//     await waitFor(() => container)
//
//     const days = getAllByText(now.getDate().toString())
//     const today = days[0]
//
//     expect(today).toBeInTheDocument()
//     expect(today).not.toHaveClass('date-picker-day__today')
//   })
//
//   it('renders selected days correctly', async () => {
//     const now = new Date()
//     const startDate = new Date()
//     const endDate = new Date(now.setMonth(now.getMonth() + 1))
//
//     const props = {
//       startDate,
//       endDate
//     }
//
//     const { container } = render(<RangeDatePicker {...props} />)
//     await waitFor(() => container)
//
//     const selected = container.querySelectorAll('div.date-picker-day__selected')
//
//     expect(selected[0]).toBeInTheDocument()
//     expect(selected[0].innerHTML).toBe(startDate.getDate().toString())
//     expect(selected[1]).toBeInTheDocument()
//     expect(selected[0].innerHTML).toBe(endDate.getDate().toString())
//     expect(selected[2]).toBeUndefined()
//   })
//
//   it('renders disabled days correctly', async () => {
//     const props = {
//       startDate: new Date('January 01, 2000 00:00:00'),
//       endDate: new Date('February 01, 2000 00:00:00'),
//       onDatesChange: jest.fn()
//     }
//
//     const { container } = render(
//       <RangeDatePicker
//         {...props}
//         disabledDays={(day: Date) => {
//           const today = new Date()
//           // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//           // @ts-ignore
//           return day - today < 0
//         }}
//       />
//     )
//     await waitFor(() => container)
//
//     const days = container.querySelectorAll('div.date-picker-day__disabled')
//
//     expect(days).toHaveLength(84)
//
//     days.forEach(day => {
//       userEvent.click(day!)
//
//       expect(props.onDatesChange).toHaveBeenCalledTimes(1)
//     })
//   })
//
//   // it('clicks on days', async () => {
//   //   const now = new Date()
//   //   const startDate = new Date()
//   //   const endDate = new Date(now.setMonth(now.getMonth() + 1))
//   //
//   //   const props = {
//   //     startDate,
//   //     endDate,
//   //     onDatesChange: jest.fn()
//   //   }
//   //
//   //   const { container } = render(<RangeDatePicker {...props} />)
//   //   await waitFor(() => container)
//   //
//   //   const selectedDays = container.querySelectorAll('div.date-picker-day__selected')
//   //   const startDay = selectedDays[0].nextSibling
//   //   const endDay = selectedDays[1].nextSibling
//   //
//   //   act(() => {
//   //     userEvent.click(startDay! as TargetElement)
//   //     userEvent.click(endDay! as TargetElement)
//   //   })
//   //
//   //   const startDayNextDay = new Date(startDate.setDate(startDate.getDate() + 1))
//   //   const endDayNextDay = new Date(endDate.setDate(endDate.getDate() + 1))
//   //
//   //   expect(props.onDatesChange).toHaveBeenCalledWith(startDayNextDay, endDate)
//   //   expect(props.onDatesChange).toHaveBeenCalledWith(startDayNextDay, endDayNextDay)
//   //
//   //   // const nextSelectedDays = container.querySelectorAll('div.date-picker-day__selected')
//   //   // const rangedDays = container.querySelectorAll('div.date-picker-day__range')
//   // })
// })
