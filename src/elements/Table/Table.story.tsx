import React from 'react'
import { Meta, Story } from '@storybook/react/types-6-0'
import Table, { TableProps } from './Table'
import { storybook } from '@utils'
import { AnyObject } from '@types'

interface TableStoryTemplateProps extends TableProps<AnyObject> {}

export default {
  title: 'Elements/Table',
  argTypes: {
    columns: { control: 'object', name: 'Columns' },
    data: { control: 'object', name: 'Data' }
  }
} as Meta

const TableStoryTemplate: Story<TableStoryTemplateProps> = args => {
  return <Table {...args} />
}

const columns = [
  {
    key: 'column1',
    title: 'Column1'
  },
  {
    key: 'column2',
    title: 'Column2'
  },
  {
    key: 'column3',
    title: 'Column3'
  },
  {
    key: 'column4',
    title: 'Column4'
  },
  {
    key: 'column5',
    title: 'Column5'
  },
  {
    key: 'column6',
    title: 'Column6'
  }
]

const data = new Array(10).fill(0).map((_, index) => {
  return columns.reduce<{ [x: string]: string }>((acc, column) => {
    return {
      ...acc,
      [column.key]: 'Lorem ipsum dolores sit amet'
    }
  }, {})
})

TableStoryTemplate.args = {
  columns,
  data
}

export const TableStory = TableStoryTemplate.bind({})
TableStory.args = {
  ...TableStoryTemplate.args
}
