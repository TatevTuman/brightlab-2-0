import { action } from '@storybook/addon-actions'

/* Should be synced with Icon element types */
export const icons = ['times', 'arrow']

export const storybook = {
  controls: {
    select(options: (string | number)[]) {
      return { type: 'select', options }
    },
    icon: { type: 'select', options: icons },
    interactive: {
      disabled: { control: 'boolean', name: 'Disabled' },
      error: { control: 'boolean', name: 'Error' },
      required: { control: 'boolean', name: 'Required' },
      onChange: { action: 'onChange' },
      onFocus: { action: 'onFocus' },
      onBlur: { action: 'onBlur' },
      onKeyDown: { action: 'onKeyDown' }
    }
  },
  actions: {
    interactive: {
      disabled: false,
      error: false,
      required: false,
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
