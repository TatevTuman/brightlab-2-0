import React from 'react'
import { navigate } from 'gatsby'
import { Paginated } from '@components'
import { Input } from '@elements'
import { usePagination } from '@hooks'
import { golfClubModel } from '@graphql'
import { GolfClubModel } from '@types'
import SearchImage from '@images/search.svg'
import styles from './PaginatedGolfClubModels.module.scss'

interface PaginatedGolfClubModelProps {
  listData: GolfClubModel
}

const PaginatedGolfClubModel: React.FC<PaginatedGolfClubModelProps> = props => {
  const {
    listData: { name }
  } = props

  return <div>{name}</div>
}

interface PaginatedGolfClubModelsProps {}

const PaginatedGolfClubModels: React.FC<PaginatedGolfClubModelsProps> = () => {
  /*
    Inits usePagination hook with query, variables, options, initialPage and initialPageSize.
    Pay attention for variables without pagination [see UsePaginationArgs type].
  */
  const { content, pagination, loading, error, fetchMore, refetch } = usePagination<GolfClubModel, {}>(
    golfClubModel.FetchPaginated,
    {},
    { fetchPolicy: 'cache-and-network' },
    1,
    10
  )

  const handleGolfClubModelsPageClick = (page: number) => fetchMore({}, page)
  const handleGolfClubModelsSearch = (search: string) => refetch({ term: search })
  const handleGolfClubModelClick = (golfClubModel: GolfClubModel) => navigate(`/admin/view/${golfClubModel.id}`)

  return (
    <div className={styles.gcm__paginated}>
      <h2>Golf models search</h2>
      <Input
        type={'text'}
        name={'gcmSearch'}
        placeholder={'Search golf model...'}
        prefix={<SearchImage />}
        onChange={handleGolfClubModelsSearch}
      />
      <hr />
      <Paginated
        content={content}
        pagination={pagination}
        loading={loading}
        error={error}
        list={{
          offset: 20,
          columns: {
            mobile: 1,
            landscape: 2,
            tablet: 3,
            desktop: 4
          }
        }}
        Component={PaginatedGolfClubModel}
        onItemClick={handleGolfClubModelClick}
        onPageClick={handleGolfClubModelsPageClick}
      />
    </div>
  )
}

export default PaginatedGolfClubModels
