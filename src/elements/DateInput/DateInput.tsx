import React, { memo, useState } from 'react'
import { Button, SecondaryInput, Icon, DatePicker } from '@elements'
import { getMonthName } from '@utils'
import './DateInput.scss'

export interface DateInputProps {}

const DateInput: React.FC<DateInputProps> = props => {
  const nowDate = new Date()
  const [date, setNewDate] = useState<Date>(nowDate)

  const validDate =
    date.getDate().toString() + ' ' + getMonthName(date.getMonth() + 1) + ' ' + date.getFullYear().toString()

  const [open, setOpen] = useState<boolean>(false)

  return (
    <div className={'date-input'}>
      <div>
        <SecondaryInput name={'date-input'} label={'Day'} value={validDate} onChange={setNewDate} clearable={false} />
      </div>
      <Button type={'secondary'} className={'button'} onClick={() => setOpen(!open)}>
        {<Icon name={'blue-calendar'} />}
      </Button>
      <div className={'date-input-picker'} data-open={open}>
        <DatePicker onDateChange={date => setNewDate(date)} />
      </div>
    </div>
  )
}

export default memo(DateInput)
