import React from 'react'
import { Story, Meta } from '@storybook/react'
import { Table, TableProps, TableColumnType, TableRowType, Button } from '~ui'

export default {
  title: 'UI/Table',
  component: Table,
  argTypes: {
    className: {
      name: 'Class',
      type: { name: 'string', required: false }
    },
    variant: {
      name: 'Variant',
      type: { name: 'string', required: false },
      control: { type: 'select', options: ['primary'] }
    }
  },
  args: {
    className: '',
    variant: 'primary'
  }
} as Meta

const TableTemplate: Story<Omit<TableProps, 'columns' | 'rows'>> = args => {
  const thClass = 'py-12'
  const tdClass = 'min-w-168 p-24 flex flex-col items-center justify-center text-center'
  const columns: TableColumnType[] = [
    {
      title: 'Name',
      key: 'name',
      thClassName: thClass,
      tdClassName: tdClass
    },
    {
      title: 'Surname',
      key: 'surname',
      thClassName: thClass,
      tdClassName: tdClass
    },
    {
      title: 'Age',
      key: 'age',
      thClassName: thClass,
      tdClassName: tdClass
    },
    {
      title: 'Custom Column',
      key: 'custom',
      thClassName: 'flex items-center justify-center',
      tdClassName: tdClass,
      thRender(title, key) {
        return <div className={'text-red-1 '}>{title}</div>
      },
      tdRender(cell: any) {
        return <Button variant={'inline'}>Remove</Button>
      }
    }
  ]
  const rows: TableRowType[] = new Array(10).fill(0).map((_, index) => ({
    name: 'John' + index,
    surname: 'Doe' + index,
    age: index.toString(),
    disabled: index === 4
  }))

  return <Table columns={columns} rows={rows} {...args} />
}

export const PrimaryStory = TableTemplate.bind({})
PrimaryStory.args = {
  variant: 'primary'
}
