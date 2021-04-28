/* (int) The current year */
import { DayShort } from '@types'

export const MINUTE = 1000 * 60
export const DAY = 1000 * 60 * 60 * 24
export const THIS_YEAR = +new Date().getFullYear()

/* (int) The current month starting from 1 - 12 */
/* 1 => January, 12 => December */
export const THIS_MONTH = +new Date().getMonth() + 1

/* Week days names and shortnames */
export const WEEK_DAYS: { [x: string]: DayShort } = {
  Monday: 'Mon',
  Tuesday: 'Tue',
  Wednesday: 'Wed',
  Thursday: 'Thu',
  Friday: 'Fri',
  Saturday: 'Sat',
  Sunday: 'Sun'
}

/* Calendar months names and shortnames */
export const CALENDAR_MONTHS = {
  January: 'Jan',
  February: 'Feb',
  March: 'Mar',
  April: 'Apr',
  May: 'May',
  June: 'Jun',
  July: 'Jul',
  August: 'Aug',
  September: 'Sep',
  October: 'Oct',
  November: 'Nov',
  December: 'Dec'
}

export const FULL_CALENDAR_MONTHS = {
  January: 'January',
  February: 'February',
  March: 'March',
  April: 'April',
  May: 'May',
  June: 'June',
  July: 'July',
  August: 'August',
  September: 'September',
  October: 'October',
  November: 'November',
  December: 'December'
}

export const getMonthName = (month: number, fullName?: boolean) => {
  const calendarMonths = fullName ? FULL_CALENDAR_MONTHS : CALENDAR_MONTHS
  return Object.keys(calendarMonths)[Math.max(0, Math.min(month - 1, 11))]
}

/* Weeks displayed on calendar */
export const CALENDAR_WEEKS = 6

/* Pads a string value with leading zeroes(0) until length is reached */
/* For example: zeroPad(5, 2) => "05" */
export const zeroPad = (value: number, length: number) => {
  return `${value}`.padStart(length, '0')
}

/* (int) Number days in a month for a given year from 28 - 31 */
export const getMonthDays = (month = THIS_MONTH, year = THIS_YEAR) => {
  const months30 = [4, 6, 9, 11]
  const leapYear = year % 4 === 0

  return month === 2 ? (leapYear ? 29 : 28) : months30.includes(month) ? 30 : 31
}

/* (int) First day of the month for a given year from 1 - 7 */
/* 1 => Sunday, 7 => Saturday */
export const getMonthFirstDay = (month = THIS_MONTH, year = THIS_YEAR) => {
  return +new Date(`${year}-${zeroPad(month, 2)}-01`).getDay()
}

export const getMonthLastDay = (month = THIS_MONTH, year = THIS_YEAR) => {
  return +new Date(`${year} - ${zeroPad(month, 2)}`)
}

/* (bool) Checks if a value is a date - this is just a simple check */
export const isDate = (date: Date) => {
  const isDate = Object.prototype.toString.call(date) === '[object Date]'
  const isValidDate = date && !Number.isNaN(date.valueOf())

  return isDate && isValidDate
}

/* (bool) Checks if two date values are of the same month and year */
export const isSameMonth = (date: Date, basedate = new Date()) => {
  if (!(isDate(date) && isDate(basedate))) return false

  const basedateMonth = +basedate.getMonth() + 1
  const basedateYear = basedate.getFullYear()

  const dateMonth = +date.getMonth() + 1
  const dateYear = date.getFullYear()

  return +basedateMonth === +dateMonth && +basedateYear === +dateYear
}

/* (bool) Checks if two date values are the same day */
export const isSameDay = (date: Date, basedate = new Date()) => {
  if (!(isDate(date) && isDate(basedate))) return false

  const basedateDate = basedate.getDate()
  const basedateMonth = +basedate.getMonth() + 1
  const basedateYear = basedate.getFullYear()

  const dateDate = date.getDate()
  const dateMonth = +date.getMonth() + 1
  const dateYear = date.getFullYear()

  return +basedateDate === +dateDate && +basedateMonth === +dateMonth && +basedateYear === +dateYear
}

/* (string) Formats the given date as YYYY-MM-DD */
/* Months and Days are zero padded */
export const getDateISO = (date = new Date()) => {
  if (!isDate(date)) return null

  return [date.getFullYear(), zeroPad(+date.getMonth() + 1, 2), zeroPad(+date.getDate(), 2)].join('-')
}

/* TODO test and description */
export const getDateHoursMinutesFormat = (date = new Date()) => {
  if (!isDate(date)) return null

  return [+date.getHours(), zeroPad(+date.getMinutes(), 2)].join(':')
}

/* TODO test and description */
export const getDateDayMonthYearFormat = (date = new Date(), defaultValue?: any) => {
  if (!isDate(date)) return defaultValue || null

  return [zeroPad(+date.getDate(), 2), getMonthName(getMonth(date), true), date.getFullYear()].join(' ')
}

export const getMonth = (date?: Date | null) => +(date ? date.getMonth() + 1 : new Date().getMonth() + 1)
export const getYear = (date?: Date | null) => +(date ? date.getFullYear() : new Date().getFullYear())

/* ({month, year}) Gets the month and year before the given month and year */
/* For example: getPreviousMonth(1, 2000) => {month: 12, year: 1999} */
/* while: getPreviousMonth(12, 2000) => {month: 11, year: 2000} */
export const getPreviousMonth = (month: number, year: number) => {
  const prevMonth = month > 1 ? month - 1 : 12
  const prevMonthYear = month > 1 ? year : year - 1

  return { month: prevMonth, year: prevMonthYear }
}

/* ({month, year}) Gets the month and year after the given month and year */
/* For example: getNextMonth(1, 2000) => {month: 2, year: 2000} */
/* while: getNextMonth(12, 2000) => {month: 1, year: 2001} */
export const getNextMonth = (month: number, year: number) => {
  const nextMonth = month < 12 ? month + 1 : 1
  const nextMonthYear = month < 12 ? year : year + 1

  return { month: nextMonth, year: nextMonthYear }
}

/*
  TODO tests and description
*/
export const getDatesDiff = (firstDate: Date, lastDate: Date, by?: 'days' | 'minutes') => {
  let millisecondsDiff = 0

  switch (by) {
    case 'days':
      millisecondsDiff = DAY
      break
    case 'minutes':
      millisecondsDiff = MINUTE
      break
    default:
      millisecondsDiff = 1
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return (firstDate - lastDate) / millisecondsDiff
}

/*
  TODO tests and description
*/
export const addMinutes = (date: Date, minutes: number) => {
  const nextHours = Math.floor(minutes / 60)
  const nextMinutes = nextHours > 0 ? minutes % nextHours : minutes

  const copy = new Date(Number(date))
  nextHours && copy.setHours(date.getHours() + nextHours)
  copy.setMinutes(date.getMinutes() + nextMinutes)

  return copy
}

/*
  TODO tests and description
*/
export const addDays = (date: Date, days: number) => {
  const copy = new Date(Number(date))
  copy.setDate(date.getDate() + days)
  return copy
}

/*
  TODO tests and description
*/
export const addMonths = (date: Date, months: number) => {
  const copy = new Date(Number(date))
  copy.setMonth(date.getMonth() + months)
  return copy
}

/*
  TODO tests and description
*/
export const isDateBetween = (baseDate: Date, startDate: Date | null, endDate: Date | null) => {
  if (!startDate || !endDate) return false

  // baseDate.setHours(0, 0, 0, 0)
  const isAfterStartDate = baseDate.getTime() > startDate.getTime()

  // baseDate.setHours(23, 59, 59, 999)
  const isBeforeEndDate = baseDate.getTime() < endDate.getTime()

  return isAfterStartDate && isBeforeEndDate
}

/*
  TODO tests and description
*/
export const disabledPastDays = (day: Date) => {
  const today = new Date()
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return day - today < -DAY
}

/*
  TODO tests and description
*/
export const disabledPastMonths = (month: number, year: number) => {
  const currentMonth = getMonth()
  const currentYear = new Date().getFullYear()

  return month < currentMonth && currentYear === year
}

/* (date) returns monday date by provided date */
export const getMondayDate = (date: Date) => {
  const currentDate = new Date(date)
  const currentDayIndex = (currentDate.getDay() + 6) % 7
  const currentMondayDate = new Date(date)
  let currentMondayDateNumber = currentDate.getDate() - currentDayIndex
  if (currentMondayDateNumber < 1) {
    const { month: prevMonth, year: prevYear } = getPreviousMonth(currentDate.getMonth() + 1, currentDate.getFullYear())
    const prevMonthDays = getMonthDays(prevMonth, prevYear)
    currentMondayDateNumber += prevMonthDays
    currentMondayDate.setFullYear(prevYear, prevMonth, currentMondayDateNumber)
  } else {
    currentMondayDate.setDate(currentMondayDateNumber)
  }

  return currentMondayDate
}

/* (date) returns { name: monday, shortName: mon } */
export const getWeekDay = (date: Date) => {
  const weekDayIndex = (+date.getDay() + 6) % 7
  const weekDay = Object.keys(WEEK_DAYS)[weekDayIndex]
  const weekDayShort = Object.values(WEEK_DAYS)[weekDayIndex]

  return {
    name: weekDay,
    shortName: weekDayShort
  }
}
