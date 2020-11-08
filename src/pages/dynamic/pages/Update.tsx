import React from 'react'
import { RouteComponentProps } from '@reach/router'

interface UpdateProps extends RouteComponentProps<{ id: string }> {}

const Update: React.FC<UpdateProps> = props => {
  return (
    <div>
      <h2>Update</h2>
      <p>Id: {props.id}</p>
    </div>
  )
}

export default Update
