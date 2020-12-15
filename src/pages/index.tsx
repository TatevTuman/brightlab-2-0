import React, { memo, useEffect } from 'react'
import { RouteComponentProps } from '@reach/router'
import { SEO, List } from '@components'
import { Pagination } from '@elements'
import { useModal, usePagination, useDelayedState } from '@hooks'
import { golfClubModel } from '@graphql'
import { GolfClubModel, PaginateGolfClubModelResponse, QueryPaginateGolfClubModelsArgs } from '@types'

type UsePaginationData = PaginateGolfClubModelResponse
type UsePaginationArgs = Omit<QueryPaginateGolfClubModelsArgs, 'pagination'>

interface HomeProps extends RouteComponentProps {}

const Home: React.FC<HomeProps> = props => {
  const { openModal } = useModal('HomeModal')

  const { data, loading, fetchMore } = usePagination<UsePaginationData, UsePaginationArgs>(
    golfClubModel.FetchPaginated,
    {},
    1,
    20
  )
  const pagination = data?.res.pagination

  const test = async (page: number) => await fetchMore({}, page)

  const [delayedLoading, setDelayedLoading] = useDelayedState(loading)

  useEffect(() => {
    setDelayedLoading(loading)
  }, [loading])

  const items = (data && data.res && data.res.content) || []

  const RenderItem = (props: GolfClubModel) => {
    return <div>{props.name}</div>
  }

  return (
    <section>
      <SEO title={'Home'} />
      <h1>
        <mark>Brightlab</mark>
        <br />
        <strong>Gatsby</strong>
        <br />
        <div>Boilerplate</div>
        <div onClick={() => openModal({ number: Math.random() })}>Modal</div>
      </h1>
      <List<GolfClubModel | null>
        items={items}
        columns={{
          mobile: 1,
          landscape: 2,
          tablet: 3,
          desktop: 4
        }}
        offset={20}
        Component={RenderItem}
        loading={delayedLoading}
      />
      <Pagination {...pagination} onClick={test} />
    </section>
  )
}

export default memo(Home)
