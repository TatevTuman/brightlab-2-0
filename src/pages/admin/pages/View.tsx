import React from 'react'
import { RouteComponentProps } from '@reach/router'

interface ViewProps extends RouteComponentProps<{ id: string }> {}

const View: React.FC<ViewProps> = props => {
  return (
    <div>
      <h2>View</h2>
      <p>Id: {props.id}</p>
    </div>
  )
}

export default View
