import React, { useEffect } from 'react'
import { RouteComponentProps } from '@reach/router'
import { useLazyQuery } from '@apollo/client'
import { golfClubModel } from '@graphql'
import { GolfClubModel } from '@types'
import { Loader } from '@elements'

const FETCH_ONE_GOLF_CLUB_MODEL = golfClubModel.FetchOne

interface ViewProps extends RouteComponentProps<{ id: string }> {}

const View: React.FC<ViewProps> = props => {
  const [fetchGolfClubModel, { data, loading, error }] = useLazyQuery<{ res: GolfClubModel }>(
    FETCH_ONE_GOLF_CLUB_MODEL,
    {
      variables: { id: props.id }
    }
  )

  useEffect(fetchGolfClubModel, [])
  const golfClubModel = data?.res

  const renderGolfClubModel = () => {
    if (error) {
      return (
        <div className="">
          <p className="danger">{error.message}</p>
          {JSON.stringify(error)}
        </div>
      )
    }

    if (loading) {
      return <Loader type={'Oval'} />
    }

    if (golfClubModel) {
      return (
        <p>
          Name: {golfClubModel?.name}
          <br />
          Id: {props.id}
        </p>
      )
    }
  }

  return (
    <div>
      <h2>View</h2>
      {renderGolfClubModel()}
    </div>
  )
}

export default View
