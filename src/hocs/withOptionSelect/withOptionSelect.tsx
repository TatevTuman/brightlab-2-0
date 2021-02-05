import React, { useEffect, useState } from 'react'
import { OptionType } from '@types'

export type WithOptionSelectProps = {
  value: string | null
  options: OptionType[]
  onChange: (value: string | null) => void
  defaultValue?: string
}

export type WithOptionSelectState = {
  selectedOption: OptionType | null
  options: OptionType[]
}

export type WithOptionSelectPropsPassed = {
  options: WithOptionSelectProps['options']
  selectedOption: WithOptionSelectState['selectedOption']
  handleOptionSelect: (option: OptionType | null) => void
}

const withOptionSelect = <P,>(WrappedComponent: React.ComponentType<WithOptionSelectPropsPassed & P>) => {
  const OptionSelect: React.FC<WithOptionSelectProps & P> = props => {
    const { value, defaultValue, options, onChange, ...parentProps } = props

    const [state, changeState] = useState<WithOptionSelectState>({
      selectedOption: null,
      options: []
    })

    /* Like React.Component setState function */
    const setState = (nextState: Partial<WithOptionSelectState>) => {
      changeState({ ...state, ...nextState })
    }

    /*
      Sets selectedOption from props defaultValue
      Sets options from props
    */
    useEffect(() => {
      if (defaultValue) {
        const defaultSelectedOption = options.find(option => option.value === defaultValue)
        setState({ selectedOption: defaultSelectedOption })
      }

      setState({ options })
    }, [])

    /* Set selectedOption from props value */
    useEffect(() => {
      const nextSelectedOption = options.find(option => option.value === value)
      setState({ selectedOption: nextSelectedOption })
    }, [value])

    /* Handles option selecting and calls props.onSelect */
    const handleOptionSelect = (option: OptionType | null) => {
      setState({ selectedOption: option })

      const optionValue = option && option.value
      onChange && onChange(optionValue)
    }

    return (
      <WrappedComponent
        options={options}
        selectedOption={state.selectedOption}
        handleOptionSelect={handleOptionSelect}
        {...(parentProps as P)}
      />
    )
  }

  OptionSelect.defaultProps = ({
    value: null,
    options: [],
    onSelect: () => null
  } as unknown) as WithOptionSelectProps & P

  return OptionSelect
}

export default withOptionSelect
