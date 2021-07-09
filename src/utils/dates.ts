/* (int) The current year */
import { Day, DayShort, DayMiniShort, OptionType } from '~types'

export const SECOND = 1000
export const MINUTE = 1000 * 60
export const HOUR = MINUTE * 60
export const DAY = HOUR * 24
export const WEEK = DAY * 7
export const MONTH = WEEK * 4
export const YEAR = MONTH * 12
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

/* Week days names and shortnames */
export const WEEK_SHORT_DAYS: { [x: string]: DayMiniShort } = {
  Monday: 'Mo',
  Tuesday: 'Tu',
  Wednesday: 'We',
  Thursday: 'Th',
  Friday: 'Fr',
  Saturday: 'Sa',
  Sunday: 'Su'
}

/* Week days names and shortnames */
export const WEEK_FULL_DAYS: { [x: string]: Day } = {
  Monday: 'Monday',
  Tuesday: 'Tuesday',
  Wednesday: 'Wednesday',
  Thursday: 'Thursday',
  Friday: 'Friday',
  Saturday: 'Saturday',
  Sunday: 'Sunday'
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

/* (bool) Checks if two date values are the same time */
export const isSameTime = (date: Date, basedate = new Date()) => {
  if (!(isDate(date) && isDate(basedate))) return false

  const basedateHours = basedate.getHours()
  const basedateMinutes = basedate.getMinutes()

  const dateHours = date.getHours()
  const dateMinutes = date.getMinutes()

  return basedateHours === dateHours && basedateMinutes === dateMinutes
}

/* (string) Formats the given date as YYYY-MM-DD */
/* Months and Days are zero padded */
export const getDateISO = (date = new Date()) => {
  return [date.getFullYear(), zeroPad(+date.getMonth() + 1, 2), zeroPad(+date.getDate(), 2)].join('-')
}

/* TODO test and description */
export const getDateHoursMinutesFormat = (date = new Date()) => {
  return [zeroPad(+date.getHours(), 2), zeroPad(+date.getMinutes(), 2)].join(':')
}

/* TODO test and description */
export const getDateHoursMinutesAMPMFormat = (date = new Date()) => {
  let hours = date.getHours()
  let minutes: string | number = date.getMinutes()

  const ampm = hours >= 12 ? 'pm' : 'am'
  hours = hours % 12
  hours = hours ? hours : 12 // the hour '0' should be '12'

  minutes = minutes < 10 ? '0' + minutes : minutes

  return hours + ':' + minutes + ' ' + ampm
}

/* TODO test and description */
export const getDateDayMonthYearFormat = (date = new Date(), defaultValue?: any) => {
  if (!isDate(date)) return defaultValue || null

  return [zeroPad(+date.getDate(), 2), getMonthName(getMonth(date), true), date.getFullYear()].join(' ')
}

/* TODO test and description */
export const getDateMonthYearFormat = (date = new Date(), defaultValue?: any) => {
  if (!isDate(date)) return defaultValue || null

  return [getMonthName(getMonth(date), true), date.getFullYear()].join(' ')
}

export const getMonth = (date?: Date | null) => +(date ? date.getMonth() + 1 : new Date().getMonth() + 1)
export const getYear = (date?: Date | null) => +(date ? date.getFullYear() : new Date().getFullYear())
export const getDay = (date?: Date | null) => +(date ? date.getDay() : new Date().getDay())

export const startOfDate = (date?: Date) => {
  date = date || new Date()

  date.setHours(0)
  date.setMinutes(0)
  date.setSeconds(0)
  date.setMilliseconds(0)

  return date
}

/* Gets dates array with time set from startHour to endHour divided by step in minutes */
/* For example: getDateTimeline(new Date(), 8, 12, 30) => [Date(now, 08:00), Date(now, 08:30), Date(now, 09:00), ...etc] */
/* TODO test */
export const getDateTimeline = (
  date = new Date(),
  startHour: number,
  endHour: number,
  step: number,
  timezone?: string
) => {
  date.setHours(0)
  date.setMinutes(0)
  date.setSeconds(0)
  date.setMilliseconds(0)

  const startMinutes = startHour * 60
  const endMinutes = endHour * 60

  const dateTimeline = []

  for (let i = startMinutes; i <= endMinutes; i += step) {
    const nextTimelineDate = new Date(date)

    const hour = i / 60
    const minutes = i % 60

    nextTimelineDate.setHours(hour)
    nextTimelineDate.setMinutes(minutes)

    dateTimeline.push(nextTimelineDate)
  }

  return dateTimeline
}

/* Gets passed date week and its dates array */
/* For example: getWeekDaysDates(new Date()) => array of dates from start of passed date week to the end of this week */
/* TODO test */
export const getWeekDaysDates = (baseDate: Date) => {
  const date = new Date(baseDate)

  date.setHours(0)
  date.setMinutes(0)
  date.setSeconds(0)
  date.setMilliseconds(0)

  const day = date.getDate()
  const weekDay = getDay(date) === 0 ? 7 : getDay(date)

  date.setDate(day - (weekDay - 1))

  const weekDaysDates = []

  for (let i = 0; i < 7; i++) {
    const nextWeekDayDate = new Date(date)
    nextWeekDayDate.setDate(nextWeekDayDate.getDate() + i)

    weekDaysDates.push(nextWeekDayDate)
  }

  return weekDaysDates
}

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
export const getDatesDiff = (
  firstDate: Date,
  lastDate: Date,
  by?: 'years' | 'months' | 'weeks' | 'days' | 'hours' | 'minutes' | 'seconds'
) => {
  let millisecondsDiff = 0

  switch (by) {
    case 'years':
      millisecondsDiff = YEAR
      break
    case 'months':
      millisecondsDiff = MONTH
      break
    case 'weeks':
      millisecondsDiff = WEEK
      break
    case 'days':
      millisecondsDiff = DAY
      break
    case 'hours':
      millisecondsDiff = HOUR
      break
    case 'minutes':
      millisecondsDiff = MINUTE
      break
    case 'seconds':
      millisecondsDiff = SECOND
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

  const baseTime = baseDate.getTime()
  const startTime = startDate.getTime()
  const endTime = endDate.getTime()

  // baseDate.setHours(0, 0, 0, 0)
  const isAfterStartDate = baseTime >= startTime

  // baseDate.setHours(23, 59, 59, 999)
  const isBeforeEndDate = baseTime < endTime

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
export const getWeekDayName = (date: Date) => {
  const weekDayIndex = (+date.getDay() + 6) % 7
  const weekDay = Object.keys(WEEK_DAYS)[weekDayIndex]
  const weekDayShort = Object.values(WEEK_SHORT_DAYS)[weekDayIndex]
  const weekDayFull = Object.values(WEEK_FULL_DAYS)[weekDayIndex]

  return {
    name: weekDay,
    shortName: weekDayShort,
    fullName: weekDayFull
  }
}

export const formatDate = (date: Date) => {
  const month = getMonthName(date.getMonth())
  const day = date.getDate()
  const hours = date.getHours()
  const minutes = date.getMinutes()
  return day + ' ' + month + ' ' + hours + ':' + minutes
}

export const formatTime = (date: Date) => {
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const seconds = date.getSeconds()
  return hours + ':' + minutes + ':' + seconds
}

export const formatHourMinute = (date: Date) => {
  const hours = zeroPad(date.getHours(), 2)
  const minutes = zeroPad(date.getMinutes(), 2)
  return hours + ':' + minutes
}

export const parseHourMinute = (input: string) => {
  const parts = input.split(':')

  if (parts && parts.length > 0) {
    return {
      hour: parseInt(parts[0]),
      minute: parseInt(parts[1])
    }
  }

  return {
    hour: 0,
    minute: 0
  }
}

export const getZones = () => {
  const currentZone = Intl.DateTimeFormat().resolvedOptions().timeZone
  const currentCountry = currentZone && currentZone.split('/')[0]
  const zones: OptionType[] = [
    'Africa/Abidjan',
    'Africa/Accra',
    'Africa/Algiers',
    'Africa/Bissau',
    'Africa/Cairo',
    'Africa/Casablanca',
    'Africa/Ceuta',
    'Africa/El_Aaiun',
    'Africa/Johannesburg',
    'Africa/Juba',
    'Africa/Khartoum',
    'Africa/Lagos',
    'Africa/Maputo',
    'Africa/Monrovia',
    'Africa/Nairobi',
    'Africa/Ndjamena',
    'Africa/Tripoli',
    'Africa/Tunis',
    'Africa/Windhoek',
    'America/Adak',
    'America/Anchorage',
    'America/Araguaina',
    'America/Argentina/Buenos_Aires',
    'America/Argentina/Catamarca',
    'America/Argentina/Cordoba',
    'America/Argentina/Jujuy',
    'America/Argentina/La_Rioja',
    'America/Argentina/Mendoza',
    'America/Argentina/Rio_Gallegos',
    'America/Argentina/Salta',
    'America/Argentina/San_Juan',
    'America/Argentina/San_Luis',
    'America/Argentina/Tucuman',
    'America/Argentina/Ushuaia',
    'America/Asuncion',
    'America/Atikokan',
    'America/Bahia',
    'America/Bahia_Banderas',
    'America/Barbados',
    'America/Belem',
    'America/Belize',
    'America/Blanc-Sablon',
    'America/Boa_Vista',
    'America/Bogota',
    'America/Boise',
    'America/Cambridge_Bay',
    'America/Campo_Grande',
    'America/Cancun',
    'America/Caracas',
    'America/Cayenne',
    'America/Chicago',
    'America/Chihuahua',
    'America/Costa_Rica',
    'America/Creston',
    'America/Cuiaba',
    'America/Curacao',
    'America/Danmarkshavn',
    'America/Dawson',
    'America/Dawson_Creek',
    'America/Denver',
    'America/Detroit',
    'America/Edmonton',
    'America/Eirunepe',
    'America/El_Salvador',
    'America/Fort_Nelson',
    'America/Fortaleza',
    'America/Glace_Bay',
    'America/Godthab',
    'America/Goose_Bay',
    'America/Grand_Turk',
    'America/Guatemala',
    'America/Guayaquil',
    'America/Guyana',
    'America/Halifax',
    'America/Havana',
    'America/Hermosillo',
    'America/Indiana/Indianapolis',
    'America/Indiana/Knox',
    'America/Indiana/Marengo',
    'America/Indiana/Petersburg',
    'America/Indiana/Tell_City',
    'America/Indiana/Vevay',
    'America/Indiana/Vincennes',
    'America/Indiana/Winamac',
    'America/Inuvik',
    'America/Iqaluit',
    'America/Jamaica',
    'America/Juneau',
    'America/Kentucky/Louisville',
    'America/Kentucky/Monticello',
    'America/La_Paz',
    'America/Lima',
    'America/Los_Angeles',
    'America/Maceio',
    'America/Managua',
    'America/Manaus',
    'America/Martinique',
    'America/Matamoros',
    'America/Mazatlan',
    'America/Menominee',
    'America/Merida',
    'America/Metlakatla',
    'America/Mexico_City',
    'America/Miquelon',
    'America/Moncton',
    'America/Monterrey',
    'America/Montevideo',
    'America/Nassau',
    'America/New_York',
    'America/Nipigon',
    'America/Nome',
    'America/Noronha',
    'America/North_Dakota/Beulah',
    'America/North_Dakota/Center',
    'America/North_Dakota/New_Salem',
    'America/Ojinaga',
    'America/Panama',
    'America/Pangnirtung',
    'America/Paramaribo',
    'America/Phoenix',
    'America/Port_of_Spain',
    'America/Port-au-Prince',
    'America/Porto_Velho',
    'America/Puerto_Rico',
    'America/Punta_Arenas',
    'America/Rainy_River',
    'America/Rankin_Inlet',
    'America/Recife',
    'America/Regina',
    'America/Resolute',
    'America/Rio_Branco',
    'America/Santarem',
    'America/Santiago',
    'America/Santo_Domingo',
    'America/Sao_Paulo',
    'America/Scoresbysund',
    'America/Sitka',
    'America/St_Johns',
    'America/Swift_Current',
    'America/Tegucigalpa',
    'America/Thule',
    'America/Thunder_Bay',
    'America/Tijuana',
    'America/Toronto',
    'America/Vancouver',
    'America/Whitehorse',
    'America/Winnipeg',
    'America/Yakutat',
    'America/Yellowknife',
    'Antarctica/Casey',
    'Antarctica/Davis',
    'Antarctica/DumontDUrville',
    'Antarctica/Macquarie',
    'Antarctica/Mawson',
    'Antarctica/Palmer',
    'Antarctica/Rothera',
    'Antarctica/Syowa',
    'Antarctica/Troll',
    'Antarctica/Vostok',
    'Asia/Almaty',
    'Asia/Amman',
    'Asia/Anadyr',
    'Asia/Aqtau',
    'Asia/Aqtobe',
    'Asia/Ashgabat',
    'Asia/Atyrau',
    'Asia/Baghdad',
    'Asia/Baku',
    'Asia/Bangkok',
    'Asia/Barnaul',
    'Asia/Beirut',
    'Asia/Bishkek',
    'Asia/Brunei',
    'Asia/Chita',
    'Asia/Choibalsan',
    'Asia/Colombo',
    'Asia/Damascus',
    'Asia/Dhaka',
    'Asia/Dili',
    'Asia/Dubai',
    'Asia/Dushanbe',
    'Asia/Famagusta',
    'Asia/Gaza',
    'Asia/Hebron',
    'Asia/Ho_Chi_Minh',
    'Asia/Hong_Kong',
    'Asia/Hovd',
    'Asia/Irkutsk',
    'Asia/Jakarta',
    'Asia/Jayapura',
    'Asia/Jerusalem',
    'Asia/Kabul',
    'Asia/Kamchatka',
    'Asia/Karachi',
    'Asia/Kathmandu',
    'Asia/Khandyga',
    'Asia/Kolkata',
    'Asia/Krasnoyarsk',
    'Asia/Kuala_Lumpur',
    'Asia/Kuching',
    'Asia/Macau',
    'Asia/Magadan',
    'Asia/Makassar',
    'Asia/Manila',
    'Asia/Novokuznetsk',
    'Asia/Novosibirsk',
    'Asia/Omsk',
    'Asia/Oral',
    'Asia/Pontianak',
    'Asia/Pyongyang',
    'Asia/Qatar',
    'Asia/Qyzylorda',
    'Asia/Riyadh',
    'Asia/Sakhalin',
    'Asia/Samarkand',
    'Asia/Seoul',
    'Asia/Shanghai',
    'Asia/Singapore',
    'Asia/Srednekolymsk',
    'Asia/Taipei',
    'Asia/Tashkent',
    'Asia/Tbilisi',
    'Asia/Tehran',
    'Asia/Thimphu',
    'Asia/Tokyo',
    'Asia/Tomsk',
    'Asia/Ulaanbaatar',
    'Asia/Urumqi',
    'Asia/Ust-Nera',
    'Asia/Vladivostok',
    'Asia/Yakutsk',
    'Asia/Yangon',
    'Asia/Yekaterinburg',
    'Asia/Yerevan',
    'Atlantic/Azores',
    'Atlantic/Bermuda',
    'Atlantic/Canary',
    'Atlantic/Cape_Verde',
    'Atlantic/Faroe',
    'Atlantic/Madeira',
    'Atlantic/Reykjavik',
    'Atlantic/South_Georgia',
    'Atlantic/Stanley',
    'Australia/Adelaide',
    'Australia/Brisbane',
    'Australia/Broken_Hill',
    'Australia/Currie',
    'Australia/Darwin',
    'Australia/Eucla',
    'Australia/Hobart',
    'Australia/Lindeman',
    'Australia/Lord_Howe',
    'Australia/Melbourne',
    'Australia/Perth',
    'Australia/Sydney',
    'Etc/GMT',
    'Etc/GMT+1',
    'Etc/GMT+10',
    'Etc/GMT+11',
    'Etc/GMT+12',
    'Etc/GMT+2',
    'Etc/GMT+3',
    'Etc/GMT+4',
    'Etc/GMT+5',
    'Etc/GMT+6',
    'Etc/GMT+7',
    'Etc/GMT+8',
    'Etc/GMT+9',
    'Etc/GMT-1',
    'Etc/GMT-10',
    'Etc/GMT-11',
    'Etc/GMT-12',
    'Etc/GMT-13',
    'Etc/GMT-14',
    'Etc/GMT-2',
    'Etc/GMT-3',
    'Etc/GMT-4',
    'Etc/GMT-5',
    'Etc/GMT-6',
    'Etc/GMT-7',
    'Etc/GMT-8',
    'Etc/GMT-9',
    'Etc/UTC',
    'Europe/Amsterdam',
    'Europe/Andorra',
    'Europe/Astrakhan',
    'Europe/Athens',
    'Europe/Belgrade',
    'Europe/Berlin',
    'Europe/Brussels',
    'Europe/Bucharest',
    'Europe/Budapest',
    'Europe/Chisinau',
    'Europe/Copenhagen',
    'Europe/Dublin',
    'Europe/Gibraltar',
    'Europe/Helsinki',
    'Europe/Istanbul',
    'Europe/Kaliningrad',
    'Europe/Kiev',
    'Europe/Kirov',
    'Europe/Lisbon',
    'Europe/London',
    'Europe/Luxembourg',
    'Europe/Madrid',
    'Europe/Malta',
    'Europe/Minsk',
    'Europe/Monaco',
    'Europe/Moscow',
    'Europe/Nicosia',
    'Europe/Oslo',
    'Europe/Paris',
    'Europe/Prague',
    'Europe/Riga',
    'Europe/Rome',
    'Europe/Samara',
    'Europe/Saratov',
    'Europe/Simferopol',
    'Europe/Sofia',
    'Europe/Stockholm',
    'Europe/Tallinn',
    'Europe/Tirane',
    'Europe/Ulyanovsk',
    'Europe/Uzhgorod',
    'Europe/Vienna',
    'Europe/Vilnius',
    'Europe/Volgograd',
    'Europe/Warsaw',
    'Europe/Zaporozhye',
    'Europe/Zurich',
    'Indian/Chagos',
    'Indian/Christmas',
    'Indian/Cocos',
    'Indian/Kerguelen',
    'Indian/Mahe',
    'Indian/Maldives',
    'Indian/Mauritius',
    'Indian/Reunion',
    'Pacific/Apia',
    'Pacific/Auckland',
    'Pacific/Bougainville',
    'Pacific/Chatham',
    'Pacific/Chuuk',
    'Pacific/Easter',
    'Pacific/Efate',
    'Pacific/Enderbury',
    'Pacific/Fakaofo',
    'Pacific/Fiji',
    'Pacific/Funafuti',
    'Pacific/Galapagos',
    'Pacific/Gambier',
    'Pacific/Guadalcanal',
    'Pacific/Guam',
    'Pacific/Honolulu',
    'Pacific/Kiritimati',
    'Pacific/Kosrae',
    'Pacific/Kwajalein',
    'Pacific/Majuro',
    'Pacific/Marquesas',
    'Pacific/Nauru',
    'Pacific/Niue',
    'Pacific/Norfolk',
    'Pacific/Noumea',
    'Pacific/Pago_Pago',
    'Pacific/Palau',
    'Pacific/Pitcairn',
    'Pacific/Pohnpei',
    'Pacific/Port_Moresby',
    'Pacific/Rarotonga',
    'Pacific/Tahiti',
    'Pacific/Tarawa',
    'Pacific/Tongatapu',
    'Pacific/Wake',
    'Pacific/Wallis'
  ]
    .sort((a, b) => {
      if (currentZone && currentZone === a) {
        return -1
      }
      if (currentCountry && a.includes(currentCountry) && !b.includes(currentCountry)) {
        return -1
      }
      return 0
    })
    .map(item => ({ label: item, value: item }))

  return zones
}

export const dateWithTimeZone = (date: Date, timeZone: string) => {
  const newDate = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), 0)
  )

  const utcDate = new Date(newDate.toLocaleString('en-US', { timeZone: 'UTC' }))
  const tzDate = new Date(newDate.toLocaleString('en-US', { timeZone }))
  const offset = utcDate.getTime() - tzDate.getTime()

  // TODO offset doesn't work for negative Timezone
  if (offset > 0) {
    newDate.setTime(newDate.getTime() - offset)
  } else {
    newDate.setTime(newDate.getTime() + offset)
  }

  return newDate
}

export const getLocale = () =>
  navigator.languages && navigator.languages.length ? navigator.languages[0] : navigator.language

export const getDateWithTimezone = (date: Date, timezone: string) => {
  const options = {
    timeZone: timezone,
    year: 'numeric' as const,
    month: 'numeric' as const,
    day: 'numeric' as const,
    hour: 'numeric' as const,
    minute: 'numeric' as const,
    second: 'numeric' as const
  }

  const formatter = new Intl.DateTimeFormat([], options)

  return formatter.format(date)
}
