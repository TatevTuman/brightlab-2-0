import React from 'react'
import { RouteComponentProps } from '@reach/router'

interface CreateProps extends RouteComponentProps<{ id: string }> {}

const Create: React.FC<CreateProps> = props => {
  return (
    <div>
      <h2>Create</h2>
      <p>Id: {props.id}</p>
    </div>
  )
}

export default Create
