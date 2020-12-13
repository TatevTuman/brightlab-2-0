import React, { Dispatch, PureComponent, SetStateAction } from 'react'
import { isEqual } from 'lodash'
import { Controller } from 'react-hook-form'
import { OptionType, ReactHookFormProps } from '@types'
import { Dropdown, ValidationErrorMessage } from '@elements'
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
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
  loading?: boolean
  disabled?: boolean
  useFormMethods?: ReactHookFormProps
}

export interface SelectState<T> {
  active: boolean
  selectedOption: OptionType<T> | null
  options: OptionType<T>[]
}

class Select<
  T,
  P extends SelectProps<T> = SelectProps<T>,
  S extends SelectState<T> = SelectState<T>
> extends PureComponent<P, S> {
  state: SelectState<T>
  /* Enables input caret */
  isAutocomplete = false
  /* Focus timeout to choose option before dropdown closes */
  focusTimeout: NodeJS.Timeout | number = 0

  static defaultProps = {
    placeholder: 'Select an option'
  }

  constructor(props: P) {
    super(props)

    this.state = {
      active: false,
      selectedOption: null,
      options: []
    }
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
    Cancels all subscriptions
  */
  componentWillUnmount() {
    clearTimeout(this.focusTimeout as number)
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
    const { name, useFormMethods } = this.props

    if (useFormMethods && useFormMethods.setValue) {
      /* Set form value */
      useFormMethods.setValue(name, selectedOption, {
        shouldValidate: false,
        shouldDirty: true
      })
    }

    /* Trigger validation */
    this.validate()
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
  // eslint-disable-next-line @typescript-eslint/no-empty-function
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
  handleSelectFocus = async (e: React.FocusEvent<HTMLInputElement>) => {
    const { active } = this.state
    const { onFocus, onBlur } = this.props

    /* If select was active - validate */
    const isBlur = active

    if (isBlur) {
      this.validate()
      onBlur && onBlur(e)
    } else {
      onFocus && onFocus(e)
    }

    clearTimeout(this.focusTimeout as number)
    this.focusTimeout = setTimeout(() => {
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
    const { name, useFormMethods } = this.props

    if (useFormMethods && useFormMethods.trigger) {
      useFormMethods.trigger(name)
    }
  }

  render() {
    const { active, options } = this.state
    const { name, label, placeholder, defaultValue, loading, disabled, useFormMethods, onSelect } = this.props

    const control = useFormMethods && useFormMethods.control
    const validation = useFormMethods && useFormMethods.validation
    const errors = useFormMethods && useFormMethods.errors

    /* Is required check */
    const isRequired = !!validation?.required
    /* If disabled no focus */
    const tabIndex = disabled ? -1 : 0

    return (
      <div className={styles.select} data-disabled={disabled}>
        {/* Should be rendered if select is not controlled - depends on this.handleSelectFormValue */}
        {!onSelect && control && (
          <Controller
            render={() => <></>}
            name={name}
            control={control}
            rules={validation}
            defaultValue={defaultValue || null}
          />
        )}
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
            tabIndex={tabIndex}
            autoComplete={'off'}
            data-disabled={disabled}
            data-cursor={this.isAutocomplete}
          />
          <SelectArrow className={styles.selectArrow} data-active={active} />
          <Dropdown options={options} onSelect={this.handleOptionSelect} opened={active} loading={loading} />
        </div>
        <ValidationErrorMessage name={name} errors={errors} />
      </div>
    )
  }
}

export default Select
