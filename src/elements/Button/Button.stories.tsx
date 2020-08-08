import React from 'react'
import Button from './Button'

export default {
  title: 'Button',
  component: Button
}

export const Story = () => {
  return (
    <div className="story">
      <div className="story-row">
        <Button type={'primary'} size={'lg'} onClick={() => null} loading={false} disabled={false}>
          Primary Largest
        </Button>
      </div>
      <div className="story-row">
        <Button type={'secondary'} size={'md'} onClick={() => null} loading={false} disabled={false}>
          Secondary Medium
        </Button>
      </div>
      <div className="story-row">
        <Button type={'danger'} size={'sm'} onClick={() => null} loading={false} disabled={false}>
          Danger Small
        </Button>
      </div>
    </div>
  )
}
