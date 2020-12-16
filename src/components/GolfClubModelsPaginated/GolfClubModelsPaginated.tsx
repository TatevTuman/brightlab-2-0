import React, { useState, memo } from 'react'
import { usePagination } from '@hooks'
import { golfClubModel } from '@graphql'
import { List } from '@components'
import { Input, Pagination } from '@elements'
import { handleEvent } from '@utils'
import { AnyObject, GolfClubModel, PaginateGolfClubModelResponse, QueryPaginateGolfClubModelsArgs } from '@types'
import SearchImage from '@images/search.svg'
import styles from './GolfClubModelsPaginated.module.scss'

type UsePaginationData = PaginateGolfClubModelResponse
type UsePaginationArgs = Omit<QueryPaginateGolfClubModelsArgs, 'pagination'>

interface GolfClubModelsPaginatedProps {
  onPageChange?: (page: number) => void
  onItemClick?: (item: AnyObject) => void
}

const GolfClubModelPaginated = (props: GolfClubModel) => {
  return <div>{props.name}</div>
}

const GolfClubModelsPaginated: React.FC<GolfClubModelsPaginatedProps> = props => {
  const { onPageChange, onItemClick } = props

  /* Filters logic */
  const [search, setSearch] = useState('')
  const variables = {
    filters: {
      term: search
    }
  }

  /*
    Inits usePagination hook with query, variables, options, initialPage and initialPageSize.
    Pay attention for variables without pagination [see UsePaginationArgs type].
  */
  const { data, loading, error, refetch, fetchMore } = usePagination<UsePaginationData, UsePaginationArgs>(
    golfClubModel.FetchPaginated,
    variables as UsePaginationArgs,
    { fetchPolicy: 'cache-and-network' },
    1,
    20
  )

  /* handles golf club model click */
  const handleGolfClubModelClick = (golfClubModel: GolfClubModel) => handleEvent(onItemClick, { value: golfClubModel })
  /* handles page change */
  const handlePageChange = async (page: number) => {
    await fetchMore(variables, page)
    handleEvent(onPageChange, { value: page })
  }
  /* handles filters search */
  const handleSearch = async (search: string) => {
    setSearch(search)

    /* Refetch the same query with new search term */
    const { data } = await refetch({
      ...variables,
      filters: {
        ...variables.filters,
        term: search
      }
    })

    const content = data?.res.content
    const pagination = data?.res.pagination

    /*
      If after search we have no content, we should use fetchMore to set a new page.
    */
    if (content && !content.length && pagination) {
      const lastPage = pagination.totalPages! || 1
      await fetchMore(
        {
          ...variables,
          filters: {
            ...variables.filters,
            term: search
          }
        },
        lastPage
      )
    }
  }

  const pagination = data?.res.pagination
  /* Todo hot cake backend fix */
  const golfClubModelsPaginated = ((data && data.res && data.res.content) as GolfClubModel[]) || []

  return (
    <div className={styles.golfClubModelsPaginated}>
      <strong>
        <h2>Golf club models example</h2>
      </strong>
      <Input
        type={'text'}
        name={'search'}
        label={'Search'}
        value={search}
        onChange={handleSearch}
        prefix={<SearchImage />}
      />
      <hr />
      <List<GolfClubModel>
        items={golfClubModelsPaginated}
        columns={{
          mobile: 1,
          landscape: 2,
          tablet: 3,
          desktop: 4
        }}
        offset={20}
        Component={GolfClubModelPaginated}
        onItemClick={handleGolfClubModelClick}
        loading={loading}
        error={error}
      />
      <Pagination {...pagination} onPageClick={handlePageChange} />
    </div>
  )
}

export default memo(GolfClubModelsPaginated)
