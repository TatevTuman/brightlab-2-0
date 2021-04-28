import React, { memo } from 'react'
import { ApolloError } from '@apollo/client'
import './QueryResponseError.scss'

interface QueryResponseErrorProps {
  title: string
  error: ApolloError
}

const QueryResponseError: React.FC<QueryResponseErrorProps> = props => {
  const { title, error } = props

  return (
    <div className={'query-response-error danger'}>
      <h3>{title}</h3>
      <p className={'fs-12'}>{error.message}</p>
    </div>
  )
}

export default memo(QueryResponseError)
