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
        <Button type={'secondary'} size={'lm'} onClick={() => null} loading={false} disabled={false}>
          Secondary Large
        </Button>
      </div>
      <div className="story-row">
        <Button type={'danger'} size={'md'} onClick={() => null} loading={false} disabled={false}>
          Danger Medium
        </Button>
      </div>
      <div className="story-row">
        <Button type={'primary'} size={'sm'} onClick={() => null} loading={false} disabled={false}>
          Primary Small
        </Button>
      </div>
      <div className="story-row">
        <Button type={'secondary'} size={'ms'} onClick={() => null} loading={false} disabled={false}>
          Secondary Smallest
        </Button>
      </div>
      <div className="story-row">
        <Button type={'danger'} size={'xs'} onClick={() => null} loading={false} disabled={false}>
          Danger Extra Small
        </Button>
      </div>
    </div>
  )
}
