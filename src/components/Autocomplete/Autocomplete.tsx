import React from 'react'
import { Select, SelectProps } from '@components'

class Autocomplete<T> extends Select<T> {
  isAutocomplete = true

  constructor(props: SelectProps<T>) {
    super(props)
  }

  /*
    Filters state options to autocomplete
  */
  handleAutocomplete = (search: string) => {
    const { options } = this.props

    this.setState({
      options: options.filter(({ label }) => label.toLowerCase().includes(search.toLowerCase()))
    })
  }

  /*
    Overwrites Select handle change mock
  */
  handleInputChange = (value: string) => {
    this.setState({ selectedOption: null, search: value }, () => {
      /* Clears form field state */
      this.handleSelectFormValue(null)
      this.handleAutocomplete(value)
    })
  }

  /*
    Overwrites Select backspace logic
  */
  handleInputKeyDown = () => null

  /*
    Resets search and options in state on focus
  */
  handleSelectFocus = () => {
    const { options } = this.props

    setTimeout(
      () =>
        this.setState(prevState => ({
          active: !prevState.active,
          search: '',
          options
        })),
      100
    )
  }

  /*
    Gets autocomplete search or option label
  */
  getInputValue = () => {
    const { selectedOption, search } = this.state

    return selectedOption ? selectedOption.label : search
  }
}

export default Autocomplete
