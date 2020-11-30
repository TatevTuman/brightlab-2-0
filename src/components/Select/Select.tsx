import React, { Dispatch, PureComponent, SetStateAction } from 'react'
import { isEqual } from 'lodash'
import { Controller } from 'react-hook-form'
import { OptionType, ValidationProps } from '@types'
import { Dropdown } from '@elements'
import SelectArrow from '@images/select-arrow.svg'
import styles from './Select.module.scss'

export interface SelectProps<T> {
  name: string
  label: string
  value?: T
  defaultValue?: T
  placeholder?: string
  options: OptionType<T>[]
  onSelect?: (selectedOption: OptionType<T> | null) => void | Dispatch<SetStateAction<OptionType<T> | null>>
  useFormMethods: ValidationProps
}

export interface SelectState<T> {
  active: boolean
  selectedOption: OptionType<T> | null
}

class Select<T> extends PureComponent<SelectProps<T>, SelectState<T>> {
  static defaultProps = {
    placeholder: 'Select an option'
  }

  state: SelectState<T> = {
    active: false,
    selectedOption: null
  }

  /*
    Handles props default value
  */
  componentDidMount() {
    const { options, defaultValue } = this.props

    if (defaultValue) {
      // Select default value option
      const selectedOption = options.find(option => isEqual(option.value, defaultValue))

      if (selectedOption) {
        this.setState({ selectedOption })
      }
    }
  }

  /*
    Watching props value if controlled
  */
  static getDerivedStateFromProps(props: SelectProps<any>, state: SelectState<any>) {
    const { options, value, onSelect } = props
    const { selectedOption } = state

    /* If select is controlled */
    const isControlled = value && onSelect && selectedOption

    if (isControlled) {
      /* If new value was passed */
      const isValueChanged = !isEqual(value, selectedOption?.value)

      if (isValueChanged) {
        /* Select option from props value */
        const nextSelectedOption = options.find(option => isEqual(option.value, value))

        return {
          selectedOption: nextSelectedOption
        }
      }
    }

    return null
  }

  /*
    Handles option selecting and calls props.onSelect or setValue in parent form state
  */
  handleSelect = (selectedOption: OptionType<T> | null) => {
    const { onSelect } = this.props

    if (onSelect) {
      /* If onSelect func exists select is controlled */
      onSelect(selectedOption)
    } else {
      /* set value into form state */
      this.handleSelectFormValue(selectedOption)
    }
  }

  /*
    Sets selected option into parent form state
    It means that you can set any type of data in this field
    Object or string for example. Depends on Controller component in render()
  */
  handleSelectFormValue = (selectedOption: OptionType<T> | null) => {
    const {
      name,
      useFormMethods: { setValue }
    } = this.props

    if (setValue) {
      setValue(name, selectedOption, {
        shouldValidate: false,
        shouldDirty: true
      })
    }
  }

  /*
    Sets selected option into state
  */
  handleOptionSelect = (selectedOption: OptionType<T>) => {
    this.setState({ selectedOption }, () => this.handleSelect(selectedOption))
  }

  /*
    Mocks input change
  */
  handleInputChange = () => null

  /*
    Clears selected option on Backspace
  */
  handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const isBackspaceKey = e.key === 'Backspace'

    if (isBackspaceKey) {
      this.setState({ selectedOption: null }, () => this.handleSelect(null))
    }
  }

  /*
    Handles select focus with 100ms timeout
    because clicking the option from dropdown calls
    onBlur method that closes the Dropdown before the option is selected
  */
  handleSelectFocus = () => setTimeout(() => this.setState(prevState => ({ active: !prevState.active })), 100)

  /*
    Renders selected option label or placeholder
  */
  renderSelectedOptionLabel = () => {
    const { selectedOption } = this.state
    const { placeholder } = this.props

    if (!selectedOption) {
      return <div className={styles.selectInputInnerPlaceholder}>{placeholder}</div>
    }

    return selectedOption.label
  }

  render() {
    const { active } = this.state
    const { name, label, options, useFormMethods, onSelect } = this.props
    const { control, errors, validation } = useFormMethods

    const error = errors && errors[name]
    const isRequired = !!validation?.required

    return (
      <div className={styles.select}>
        <div className={styles.selectInput}>
          {label && (
            <label htmlFor={name} data-required={isRequired}>
              {label}
            </label>
          )}
          <div
            className={styles.selectInputInner}
            onChange={this.handleInputChange}
            onFocus={this.handleSelectFocus}
            onBlur={this.handleSelectFocus}
            onKeyDown={this.handleInputKeyDown}
            tabIndex={0}
          >
            {this.renderSelectedOptionLabel()}
            {/* Should be rendered if select is not controlled - depends on this.handleSelectFormValue */}
            {!onSelect && <Controller render={() => <></>} name={name} control={control} rules={validation} />}
          </div>
          {error && (
            <div role="input-error" className="validation-error">
              {error.message}
            </div>
          )}
        </div>
        <Dropdown options={options} onSelect={this.handleOptionSelect} opened={active} />
        <SelectArrow className={styles.selectArrow} data-active={active} />
      </div>
    )
  }
}

export default Select
