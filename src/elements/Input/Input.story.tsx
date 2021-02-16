// import React from 'react'
// import { Meta, Story } from '@storybook/react/types-6-0'
// import Input, { InputProps } from './Input'
// import { storybook } from '@utils'
//
// interface InputStoryTemplateProps extends InputProps {}
//
// export default {
//   title: 'Elements/Input',
//   argTypes: {
//     value: { control: 'text', name: 'Value' },
//     label: { control: 'text', name: 'Label' },
//     placeholder: { control: 'text', name: 'Placeholder' },
//     type: { control: storybook.controls.select(['text', 'number']), name: 'Type' },
//     prefix
//     suffix
//     autoComplete: { control: storybook.controls.select(['on', 'off']), name: 'Autocomplete' },
//     error
//     clearable
//     ...storybook.controls.interactive,
//     onClear: { action: 'onClear' },
//     min
//     ref: storybook.args.disabled,
//     role: storybook.args.disabled,
//     defaultValue: storybook.args.disabled,
//     id: storybook.args.disabled,
//   }
// } as Meta
//
// const InputStoryTemplate: Story<InputStoryTemplateProps> = args => {
//   return <Input {...args} />
// }
//
// InputStoryTemplate.args = {
//   ...storybook.actions.interactive
// }
//
// export const InputStory = InputStoryTemplate.bind({})
// InputStory.args = {
//   ...InputStoryTemplate.args
// }
