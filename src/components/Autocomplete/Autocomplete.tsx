import { Select, SelectProps, SelectState } from '@components'
import React from 'react'

export interface AutocompleteProps<T> extends SelectProps<T> {
  onChange?: (value: string) => void
}

export interface AutocompleteState<T> extends SelectState<T> {
  search: string
}

class Autocomplete<T> extends Select<T, AutocompleteProps<T>, AutocompleteState<T>> {
  isAutocomplete = true

  constructor(props: AutocompleteProps<T>) {
    super(props)

    this.state = {
      active: false,
      selectedOption: null,
      options: [],
      search: ''
    }
  }

  /*
    Filters state options to autocomplete
  */
  handleAutocomplete = (search: string) => {
    const { options, onChange } = this.props

    this.setState(
      {
        options: options.filter(({ label, value }) => {
          const isLabelMatched = label.toLowerCase().includes(search.toLowerCase())
          return isLabelMatched
        })
      },
      () => {
        /* Clears form field state */
        this.handleSelectFormValue(null)
        /* Runs onChange after state is changed */
        onChange && onChange(search)
      }
    )
  }

  /*
    Sorts option, set state search
    Overwrites Select handle change mock
  */
  handleInputChange = (value: string) => {
    this.setState({ selectedOption: null, search: value }, () => {
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
  handleSelectFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const { active } = this.state
    const { options, onBlur, onFocus } = this.props

    /* If select was active - validate */
    const isBlur = active

    if (isBlur) {
      this.validate()
      onBlur && onBlur(e)
    } else {
      onFocus && onFocus(e)
    }

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
