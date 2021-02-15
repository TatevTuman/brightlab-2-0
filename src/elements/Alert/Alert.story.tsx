import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import { action } from '@storybook/addon-actions'
import { Provider as AlertProvider, transitions, useAlert, AlertProviderProps } from 'react-alert'
import Alert, { AlertProps } from './Alert'
import { Button } from '@elements'
import { storybook } from '@utils'

interface AlertStoryProps extends Omit<AlertProviderProps, 'template'> {
  type: AlertProps['options']['type']
  onClose: AlertProps['options']['onClose']
  onOpen: AlertProps['options']['onOpen']
  message: AlertProps['message']
  close: AlertProps['close']
  style: AlertProps['style']
}

const ALERT_PROVIDER_POSITIONS = [
  'top left',
  'top center',
  'top right',
  'middle left',
  'middle',
  'middle right',
  'bottom left',
  'bottom center',
  'bottom right'
] as const

export default {
  title: 'elements/Alert',
  argTypes: {
    message: { control: 'text', name: 'Message' },
    position: {
      control: {
        type: 'select',
        options: ALERT_PROVIDER_POSITIONS
      },
      name: 'Position'
    },
    type: { control: 'text', name: 'Message' },
    transition: { control: { type: 'select', options: ['fade', 'scale'] }, name: 'Transition' },
    timeout: { control: 'number', name: 'Timeout' },
    offset: { control: 'text', name: 'Offset' },
    style: { control: 'object', name: 'Style' },
    onOpen: { action: 'onOpen' },
    onClose: { action: 'onClose' },
    id: storybook.args.disabled
  }
} as Meta

const AlertButton: React.FC<AlertProps> = props => {
  const { message, options } = props
  const alert = useAlert()

  const handleAlertShow = () => alert.show(message, options)

  return (
    <Button onClick={handleAlertShow} size={'sm'}>
      Show
    </Button>
  )
}

const AlertStory: Story<AlertStoryProps> = args => {
  const { id, style, message, close, type, onOpen, onClose, ...alertProviderProps } = args

  const alertOptions = {
    id,
    style,
    message,
    close,
    options: {
      type,
      onOpen,
      onClose,
      position: alertProviderProps.position
    }
  }

  return (
    <AlertProvider template={Alert} {...alertProviderProps}>
      <AlertButton {...alertOptions} />
    </AlertProvider>
  )
}

AlertStory.args = {
  id: 'story',
  position: ALERT_PROVIDER_POSITIONS[4],
  timeout: 2000,
  offset: '0px 0px 0px 0px',
  transition: transitions.SCALE,
  style: {},
  type: 'success',
  message: 'Alert',
  onOpen: action('onOpen'),
  onClose: action('onClose')
}

export const SuccessAlert = AlertStory.bind({})
SuccessAlert.args = {
  ...AlertStory.args,
  message: 'Success'
}

export const InfoAlert = AlertStory.bind({})
InfoAlert.args = {
  ...AlertStory.args,
  message: 'Info',
  type: 'info'
}

export const ErrorAlert = AlertStory.bind({})
ErrorAlert.args = {
  ...AlertStory.args,
  message: 'Error',
  type: 'error'
}
