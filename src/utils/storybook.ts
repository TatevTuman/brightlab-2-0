export const storybook = {
  controls: {
    select(options: (string | number)[]) {
      return { type: 'select', options }
    }
  },
  args: {
    disabled: { control: false, disabled: true }
  }
}
