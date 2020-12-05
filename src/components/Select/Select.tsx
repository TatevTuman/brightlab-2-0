import React, { Dispatch, PureComponent, SetStateAction } from 'react'
import { isEqual } from 'lodash'
import { Controller } from 'react-hook-form'
import { OptionType, ValidationProps } from '@types'
import { Dropdown } from '@elements'
import SelectArrow from '@images/select-arrow.svg'
import styles from './Select.module.scss'

export interface SelectProps<T> {
  name: string
  label?: string
  value?: T | null
  defaultValue?: T
  placeholder?: string
  options: OptionType<T>[]
  onSelect?: (selectedOption: OptionType<T> | null) => void | Dispatch<SetStateAction<OptionType<T> | null>>
  useFormMethods: ValidationProps
}

export interface SelectState<T> {
  active: boolean
  selectedOption: OptionType<T> | null
  search: string // For autocomplete
  options: OptionType<T>[]
}

class Select<T> extends PureComponent<SelectProps<T>, SelectState<T>> {
  state: SelectState<T>
  /* Enables input caret */
  isAutocomplete = false

  static defaultProps = {
    placeholder: 'Select an option'
  }

  constructor(props: SelectProps<T>) {
    super(props)

    this.state = {
      active: false,
      selectedOption: null,
      search: '',
      options: []
    }

    return this
  }

  /*
    Watching props value if controlled
  */
  static getDerivedStateFromProps(props: SelectProps<any>, state: SelectState<any>) {
    const { options, value, onSelect } = props
    const { selectedOption } = state

    /* If select is controlled */
    const isControlled = onSelect && value !== undefined

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
    Handles props default value
  */
  componentDidMount() {
    const { options, defaultValue } = this.props

    if (defaultValue) {
      /* Select default value option */
      const selectedOption = options.find(option => isEqual(option.value, defaultValue))

      if (selectedOption) {
        this.setState({ selectedOption })
      }
    }

    this.setState({ options })
  }

  /*
    Handles option selecting and calls props.onSelect or setValue in parent form state
  */
  handleSelect = (selectedOption: OptionType<T> | null) => {
    const { onSelect } = this.props

    if (onSelect) {
      /* If onSelect func exists select is controlled */
      onSelect(selectedOption)
    }

    this.handleSelectFormValue(selectedOption)
  }

  /*
    Sets selected option into parent form state
    It means that you can set any type of data in this field
    Object or string for example. Depends on Controller component in render()
  */
  handleSelectFormValue = (selectedOption: OptionType<T> | null) => {
    const {
      name,
      useFormMethods: { setValue, trigger }
    } = this.props

    if (setValue) {
      /* Set form value */
      setValue(name, selectedOption, {
        shouldValidate: false,
        shouldDirty: true
      })
    }

    /* Trigger validation */
    if (trigger) trigger(name)
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
  handleInputChange = (value: string): void => {}

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
    onBlur method that closes the Dropdown before the option is selected.
    Triggers validation
  */
  handleSelectFocus = () => {
    const { active } = this.state
    const isBlur = active

    if (isBlur) this.validate()

    setTimeout(() => {
      this.setState(prevState => ({ active: !prevState.active }))
    }, 100)
  }

  /*
    Gets selected option label or placeholder
  */
  getInputValue = () => {
    const { selectedOption } = this.state

    return selectedOption ? selectedOption.label : ''
  }

  validate = () => {
    const {
      name,
      useFormMethods: { trigger }
    } = this.props

    trigger && trigger(name)
  }

  render() {
    const { active, options } = this.state
    const { name, label, placeholder, useFormMethods, onSelect } = this.props
    const { control, errors, validation } = useFormMethods

    const error = errors && errors[name]
    const isRequired = !!validation?.required

    const loading = !options.length

    return (
      <div className={styles.select}>
        {/* Should be rendered if select is not controlled - depends on this.handleSelectFormValue */}
        {!onSelect && control && <Controller render={() => <></>} name={name} control={control} rules={validation} />}
        <div className={styles.selectInput}>
          {label && (
            <label htmlFor={name} data-required={isRequired}>
              {label}
            </label>
          )}
          <input
            type={'text'}
            id={name}
            className={styles.selectInputInner}
            value={this.getInputValue()}
            onChange={e => this.handleInputChange(e.currentTarget.value)}
            onFocus={this.handleSelectFocus}
            onBlur={this.handleSelectFocus}
            onKeyDown={this.handleInputKeyDown}
            placeholder={placeholder}
            tabIndex={0}
            autoComplete={'off'}
            data-cursor={this.isAutocomplete}
          />
          <SelectArrow className={styles.selectArrow} data-active={active} />
          <Dropdown options={options} onSelect={this.handleOptionSelect} opened={active} loading={loading} />
        </div>
        {error && (
          <div role="input-error" className="validation-error">
            {error.message}
          </div>
        )}
      </div>
    )
  }
}

export default Select
