import React, { PureComponent } from 'react'
import { OptionType, ValidationProps } from '@types'
import { Input, Dropdown } from '@elements'
import styles from './Select.module.scss'

export interface SelectProps<T> {
  name: string
  label: string
  value: T
  placeholder?: string
  options: OptionType<T>[]
  onSelect?: (selectedOption: OptionType<T> | null) => void
  useFormMethods: ValidationProps
}

export interface SelectState<T> {
  selectedOption: OptionType<T> | null
}

class Select<T> extends PureComponent<SelectProps<T>, SelectState<T>> {
  static defaultProps = {
    placeholder: 'Select an option',
    onSelect: () => null
  }

  state: SelectState<T> = {
    selectedOption: null
  }

  componentDidMount() {}

  handleOptionSelect = (selectedOption: OptionType<T>) => {
    this.setState({ selectedOption }, () => this.props.onSelect!(selectedOption))
  }

  handleInputChange = (optionLabel: string) => {
    const { options } = this.props
    const selectedOption = options.find(({ label }) => label === optionLabel) || null

    this.setState({ selectedOption }, () => this.props.onSelect!(selectedOption))
  }

  getSelectedOptionLabel = () => {
    const { selectedOption } = this.state
    return selectedOption ? selectedOption.label : ''
  }

  render() {
    const { name, label, placeholder, options, useFormMethods } = this.props

    return (
      <div className={styles.select}>
        <Input
          {...useFormMethods}
          name={name}
          label={label}
          placeholder={placeholder}
          value={this.getSelectedOptionLabel()}
          onChange={this.handleInputChange}
          autoComplete={'off'}
        />
        <Dropdown options={options} onSelect={this.handleOptionSelect} />
      </div>
    )
  }
}

export default Select
