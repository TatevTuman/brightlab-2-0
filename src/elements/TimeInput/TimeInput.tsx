import React, { memo, useState, useEffect, useRef } from 'react'
import './TimeInput.scss'

export interface TimeInputProps {
  // value: string TODO value control, not state
  label?: string
  onChange: (value: string) => void
}

enum ArrowKeys {
  Right = 'ArrowRight',
  Left = 'ArrowLeft'
}

const TimeInput: React.FC<TimeInputProps> = props => {
  const { label, onChange } = props
  const [time, setTime] = useState({
    firstInputValue: '',
    secondInputValue: ''
  })

  const firstRef: any = useRef<HTMLInputElement>(null)
  const secondRef: any = useRef<HTMLInputElement>(null)

  useEffect(() => {
    onChange && onChange(time.firstInputValue)
  }, [time.firstInputValue])

  useEffect(() => {
    onChange && onChange(time.secondInputValue)
  }, [time.secondInputValue])

  const handleFirstInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const firstCurrentRef = firstRef.current
    const firstCurrentRefValue = firstCurrentRef.value
    const maxLength = firstCurrentRef.maxLength

    if (e.target.value < '24') {
      setTime({ ...time, firstInputValue: e.target.value })

      if (firstCurrentRefValue.length === maxLength) {
        ;(secondRef.current as HTMLInputElement).focus()
      }
    }
  }

  const handleSecondInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const secondCurrentRef = secondRef.current
    const secondCurrentRefValue = secondCurrentRef.value

    if (e.target.value < '60') {
      setTime({ ...time, secondInputValue: e.target.value })
    }

    if (secondCurrentRefValue.length === 0) {
      ;(firstRef.current as HTMLInputElement).focus()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === ArrowKeys.Right) {
      if (firstRef.current.value.length == 2) {
        ;(secondRef.current as HTMLInputElement)?.focus()
      }
    }

    if (e.key === ArrowKeys.Left) {
      if (secondRef.current.value.length == 0) {
        ;(firstRef.current as HTMLInputElement)?.focus()
      }
    }
  }

  return (
    <>
      <label className={'time'}>
        {label && (
          <label htmlFor={'HH'} className={'time-label'}>
            {label}
          </label>
        )}
        <div>
          <input
            name={'HH'}
            type={'text'}
            placeholder={'HH'}
            maxLength={2}
            value={time.firstInputValue}
            ref={firstRef}
            onChange={e => handleFirstInputChange(e)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div>
          <input
            name={'mm'}
            type={'text'}
            placeholder={'mm'}
            maxLength={2}
            value={time.secondInputValue}
            ref={secondRef}
            onChange={e => handleSecondInputChange(e)}
            onKeyDown={handleKeyDown}
          />
        </div>
      </label>
    </>
  )
}

export default memo(TimeInput)
