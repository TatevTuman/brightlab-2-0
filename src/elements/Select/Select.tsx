import React, { useState, useEffect, memo } from 'react'
import { OptionType, ValidationProps } from '@types'
import { Input, Dropdown } from '@elements'
import { isEqual } from 'lodash'
import styles from './Select.module.scss'

export interface SelectProps<T> extends ValidationProps {
  name: string
  options: OptionType<T>[]
  defaultValue?: string
  value?: T
  onSelect?: (option: OptionType<T>) => void
  label?: string
  onOptionFind?: (option: OptionType<T>) => OptionType<T> | undefined
}

const Select = <T,>(props: SelectProps<T>) => {
  const { name, options, label, defaultValue, value, onSelect, ...useFormMethods } = props
  const [selectedOption, selectOption] = useState<OptionType<T> | undefined>()

  useEffect(() => {
    if (value) {
      // Select initial option if value
      selectOption(options.find(onOptionFind))
    }
  }, [])

  useEffect(() => {
    // Select new option from value
    selectOption(options.find(onOptionFind))
  }, [value])

  const onOptionFind = (option: OptionType<T>) => {
    // Custom find function of value is complex object
    if (props.onOptionFind) {
      return props.onOptionFind(option)
    }

    // Default condition
    return isEqual(option.value, value || defaultValue)
  }

  const handleSelect = (option: OptionType<T>) => {
    // If not value update local state option
    !value && selectOption(option)
    // If onSelect
    onSelect && onSelect(option)
  }

  const MemoizedSelect = memo(() => {
    const listId = name + 's'

    return (
      <div className={styles.select}>
        <Input
          {...useFormMethods}
          type={'text'}
          list={listId}
          name={name}
          value={selectedOption?.label}
          onChange={() => null}
          label={label}
        />
        <Dropdown id={listId} options={options} onSelect={handleSelect} />
      </div>
    )
  })

  MemoizedSelect.displayName = 'Select'

  return <MemoizedSelect />
}

Select.defaultProps = {}

export default Select
