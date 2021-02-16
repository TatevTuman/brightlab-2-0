import { action } from '@storybook/addon-actions'

export const storybook = {
  controls: {
    select(options: (string | number)[]) {
      return { type: 'select', options }
    },
    interactive: {
      disabled: { control: 'boolean', name: 'Disabled' },
      required: { control: 'boolean', name: 'Required' },
      focusable: { control: 'boolean', name: 'Focusable' },
      onChange: { action: 'onChange' },
      onFocus: { action: 'onFocus' },
      onBlur: { action: 'onBlur' },
      onKeyDown: { action: 'onKeyDown' }
    }
  },
  actions: {
    interactive: {
      disabled: false,
      required: false,
      focusable: true,
      onChange: action('onChange'),
      onFocus: action('onFocus'),
      onBlur: action('onBlur'),
      onKeyDown: action('onKeyDown')
    }
  },
  args: {
    disabled: { control: false, disabled: true }
  }
}
