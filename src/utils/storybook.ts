import { action } from '@storybook/addon-actions'

export const colors = [
  'primary',
  'secondary-d',
  'secondary',
  'secondary-l',
  'secondary-lst',
  'purple',
  'purple-d',
  'purple-dst',
  'w-white',
  'white-p',
  'white-pst',
  'blue',
  'blue-d',
  'blue-dst',
  'danger',
  'danger-l',
  'yellow',
  'black',
  'info',
  'success',
  'disabled'
]

/* Should be synced with Icon element types */
export const icons = ['times', 'arrow']

export const storybook = {
  controls: {
    select(options: (string | number)[]) {
      return { type: 'select', options }
    },
    color: { type: 'select', options: colors },
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
