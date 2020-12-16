import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  Upload: any
}

export type ErrorResponse = {
  __typename?: 'ErrorResponse'
  code?: Maybe<Scalars['Int']>
  detail?: Maybe<Scalars['String']>
}

export type StatusResponse = {
  __typename?: 'StatusResponse'
  status?: Maybe<Scalars['String']>
  error?: Maybe<ErrorResponse>
}

export type Query = {
  __typename?: 'Query'
  _empty?: Maybe<Scalars['String']>
  signIn?: Maybe<SignResponse>
  forgotPassword?: Maybe<StatusResponse>
  currentUser?: Maybe<User>
  golfClub?: Maybe<GolfClub>
  golfClubs?: Maybe<Array<Maybe<GolfClub>>>
  golfClubConditions?: Maybe<GolfClubConditionsResponse>
  brand?: Maybe<Brand>
  brands?: Maybe<Array<Maybe<Brand>>>
  golfClubModel?: Maybe<GolfClubModel>
  golfClubModels?: Maybe<Array<Maybe<GolfClubModel>>>
  paginateGolfClubModels?: Maybe<PaginateGolfClubModelResponse>
  category?: Maybe<Category>
  categories?: Maybe<Array<Maybe<Category>>>
  filters?: Maybe<FilterResponse>
}

export type QuerySignInArgs = {
  email: Scalars['String']
  password: Scalars['String']
}

export type QueryForgotPasswordArgs = {
  email: Scalars['String']
}

export type QueryGolfClubArgs = {
  id: Scalars['String']
}

export type QueryGolfClubsArgs = {
  golfClubModelId: Scalars['String']
}

export type QueryGolfClubConditionsArgs = {
  golfClubModelId: Scalars['String']
  golfClubFilters?: Maybe<GolfClubFilterArgs>
}

export type QueryBrandArgs = {
  id: Scalars['String']
}

export type QueryGolfClubModelArgs = {
  id: Scalars['String']
}

export type QueryPaginateGolfClubModelsArgs = {
  pagination: PaginationArgs
  filters?: Maybe<FilterArgs>
  sortBy?: Maybe<Scalars['String']>
}

export type QueryCategoryArgs = {
  id: Scalars['String']
}

export type Mutation = {
  __typename?: 'Mutation'
  null?: Maybe<Scalars['Boolean']>
  signUp?: Maybe<SignResponse>
  updateCurrentUser?: Maybe<StatusResponse>
  updateCurrentPassword?: Maybe<StatusResponse>
  createGolfClub?: Maybe<GolfClubResponse>
  deleteGolfClub?: Maybe<GolfClubResponse>
  updateGolfClub?: Maybe<GolfClubResponse>
  createBrand?: Maybe<BrandResponse>
  deleteBrand?: Maybe<BrandResponse>
  updateBrand?: Maybe<BrandResponse>
  createGolfClubModel?: Maybe<GolfClubModelResponse>
  deleteGolfClubModel?: Maybe<GolfClubModelResponse>
  updateGolfClubModel?: Maybe<GolfClubModelResponse>
  createCategory?: Maybe<CategoryResponse>
  deleteCategory?: Maybe<CategoryResponse>
  updateCategory?: Maybe<CategoryResponse>
}

export type MutationSignUpArgs = {
  firstName: Scalars['String']
  lastName: Scalars['String']
  email: Scalars['String']
  password: Scalars['String']
}

export type MutationUpdateCurrentUserArgs = {
  user?: Maybe<UserArgs>
}

export type MutationUpdateCurrentPasswordArgs = {
  newPassword: Scalars['String']
  oldPassword: Scalars['String']
}

export type MutationCreateGolfClubArgs = {
  golfClub?: Maybe<GolfClubArgs>
}

export type MutationDeleteGolfClubArgs = {
  id: Scalars['String']
}

export type MutationUpdateGolfClubArgs = {
  id: Scalars['String']
  golfClub?: Maybe<GolfClubArgs>
}

export type MutationCreateBrandArgs = {
  brand?: Maybe<BrandArgs>
}

export type MutationDeleteBrandArgs = {
  id: Scalars['String']
}

export type MutationUpdateBrandArgs = {
  id: Scalars['String']
  brand?: Maybe<BrandArgs>
}

export type MutationCreateGolfClubModelArgs = {
  golfClubModel?: Maybe<GolfClubModelArgs>
}

export type MutationDeleteGolfClubModelArgs = {
  id: Scalars['String']
}

export type MutationUpdateGolfClubModelArgs = {
  id: Scalars['String']
  golfClubModel?: Maybe<GolfClubModelArgs>
}

export type MutationCreateCategoryArgs = {
  category?: Maybe<CategoryArgs>
}

export type MutationDeleteCategoryArgs = {
  id: Scalars['String']
}

export type MutationUpdateCategoryArgs = {
  id: Scalars['String']
  category?: Maybe<CategoryArgs>
}

export type User = {
  __typename?: 'User'
  id?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['String']>
  firstName?: Maybe<Scalars['String']>
  lastName?: Maybe<Scalars['String']>
  userName?: Maybe<Scalars['String']>
  avatar?: Maybe<Scalars['String']>
  basicInfo?: Maybe<BasicInfo>
}

export type UserArgs = {
  password?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['String']>
  firstName?: Maybe<Scalars['String']>
  lastName?: Maybe<Scalars['String']>
  userName?: Maybe<Scalars['String']>
  basicInfo?: Maybe<BasicInfoArgs>
  avatarFile?: Maybe<Scalars['Upload']>
}

export type BasicInfo = {
  __typename?: 'BasicInfo'
  gripSize?: Maybe<Scalars['Int']>
  height?: Maybe<Scalars['Int']>
  dexterity?: Maybe<Scalars['String']>
  flex?: Maybe<Scalars['String']>
}

export type BasicInfoArgs = {
  gripSize?: Maybe<Scalars['Int']>
  height?: Maybe<Scalars['Int']>
  dexterity?: Maybe<Scalars['String']>
  flex?: Maybe<Scalars['String']>
}

export type SignResponse = {
  __typename?: 'SignResponse'
  token?: Maybe<Scalars['String']>
  status?: Maybe<Scalars['String']>
  error?: Maybe<ErrorResponse>
}

export type GolfClub = {
  __typename?: 'GolfClub'
  id?: Maybe<Scalars['String']>
  condition?: Maybe<Scalars['String']>
  loft?: Maybe<Scalars['Float']>
  price?: Maybe<Scalars['Float']>
  name?: Maybe<Scalars['String']>
  golfClubModel?: Maybe<GolfClubModel>
}

export type GolfClubArgs = {
  name?: Maybe<Scalars['String']>
  condition?: Maybe<Scalars['String']>
  loft?: Maybe<Scalars['Float']>
  price?: Maybe<Scalars['Float']>
  golfClubModelId?: Maybe<Scalars['String']>
}

export type GolfClubFilterArgs = {
  flexes?: Maybe<Array<Maybe<Scalars['String']>>>
  dexterities?: Maybe<Array<Maybe<Scalars['String']>>>
}

export type GolfClubResponse = {
  __typename?: 'GolfClubResponse'
  status?: Maybe<Scalars['String']>
  error?: Maybe<ErrorResponse>
  result?: Maybe<GolfClub>
}

export type GolfClubConditionsResponse = {
  __typename?: 'GolfClubConditionsResponse'
  excellent?: Maybe<Array<Maybe<GolfClub>>>
  good?: Maybe<Array<Maybe<GolfClub>>>
  new?: Maybe<Array<Maybe<GolfClub>>>
}

export type Brand = {
  __typename?: 'Brand'
  id?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
}

export type BrandArgs = {
  name?: Maybe<Scalars['String']>
}

export type BrandResponse = {
  __typename?: 'BrandResponse'
  status?: Maybe<Scalars['String']>
  error?: Maybe<ErrorResponse>
  result?: Maybe<Brand>
}

export type GolfClubModel = {
  __typename?: 'GolfClubModel'
  id?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  releaseYear?: Maybe<Scalars['Int']>
  retailPrice?: Maybe<Scalars['Float']>
  flex?: Maybe<Scalars['String']>
  dexterity?: Maybe<Scalars['String']>
  category?: Maybe<Category>
  brand?: Maybe<Brand>
  golfClubs?: Maybe<Array<Maybe<GolfClub>>>
  avatar?: Maybe<Scalars['String']>
}

export type GolfClubModelArgs = {
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  releaseYear?: Maybe<Scalars['Int']>
  retailPrice?: Maybe<Scalars['Float']>
  flex?: Maybe<Scalars['String']>
  dexterity?: Maybe<Scalars['String']>
  categoryId?: Maybe<Scalars['String']>
  brandId?: Maybe<Scalars['String']>
  avatarFile?: Maybe<Scalars['Upload']>
}

export type PaginationArgs = {
  page: Scalars['Int']
  pageSize: Scalars['Int']
}

export type PriceFilterArgs = {
  maxPrice?: Maybe<Scalars['Int']>
  minPrice?: Maybe<Scalars['Int']>
}

export type FilterArgs = {
  categoryIds?: Maybe<Array<Maybe<Scalars['String']>>>
  releaseYears?: Maybe<Array<Maybe<Scalars['Int']>>>
  brandIds?: Maybe<Array<Maybe<Scalars['String']>>>
  flexes?: Maybe<Array<Maybe<Scalars['String']>>>
  dexterities?: Maybe<Array<Maybe<Scalars['String']>>>
  price?: Maybe<Array<Maybe<PriceFilterArgs>>>
  term?: Maybe<Scalars['String']>
}

export type GolfClubModelResponse = {
  __typename?: 'GolfClubModelResponse'
  status?: Maybe<Scalars['String']>
  error?: Maybe<ErrorResponse>
  result?: Maybe<GolfClubModel>
}

export type PaginateGolfClubModelResponse = {
  __typename?: 'PaginateGolfClubModelResponse'
  content?: Maybe<Array<Maybe<GolfClubModel>>>
  pagination?: Maybe<PaginationResponse>
}

export type PaginationResponse = {
  __typename?: 'PaginationResponse'
  itemCount?: Maybe<Scalars['Int']>
  total?: Maybe<Scalars['Int']>
  pageSize?: Maybe<Scalars['Int']>
  totalPages?: Maybe<Scalars['Int']>
  current?: Maybe<Scalars['Int']>
}

export type Category = {
  __typename?: 'Category'
  id?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
}

export type CategoryArgs = {
  name?: Maybe<Scalars['String']>
}

export type CategoryResponse = {
  __typename?: 'CategoryResponse'
  status?: Maybe<Scalars['String']>
  error?: Maybe<ErrorResponse>
  result?: Maybe<Category>
}

export type FilterResponse = {
  __typename?: 'FilterResponse'
  releaseYears?: Maybe<Array<Maybe<Scalars['Int']>>>
  flexes?: Maybe<Array<Maybe<Scalars['String']>>>
  brands?: Maybe<Array<Maybe<Brand>>>
  categories?: Maybe<Array<Maybe<Category>>>
}

export type GolfClubModelAttrsFragment = { __typename?: 'GolfClubModel' } & Pick<
  GolfClubModel,
  'id' | 'name' | 'description' | 'releaseYear' | 'retailPrice' | 'flex' | 'dexterity'
> & {
    category?: Maybe<{ __typename?: 'Category' } & CategoryAttrsFragment>
    brand?: Maybe<{ __typename?: 'Brand' } & BrandAttrsFragment>
  }

export type BrandAttrsFragment = { __typename?: 'Brand' } & Pick<Brand, 'id' | 'name'>

export type CategoryAttrsFragment = { __typename?: 'Category' } & Pick<Category, 'id' | 'name'>

export type PaginationAttrsFragment = { __typename?: 'PaginationResponse' } & Pick<
  PaginationResponse,
  'itemCount' | 'total' | 'pageSize' | 'totalPages' | 'current'
>

export type FetchGolfClubModelsQueryVariables = Exact<{ [key: string]: never }>

export type FetchGolfClubModelsQuery = { __typename?: 'Query' } & {
  res?: Maybe<Array<Maybe<{ __typename?: 'GolfClubModel' } & GolfClubModelAttrsFragment>>>
}

export type FetchPaginatedGolfClubModelsQueryVariables = Exact<{
  pagination: PaginationArgs
}>

export type FetchPaginatedGolfClubModelsQuery = { __typename?: 'Query' } & {
  res?: Maybe<
    { __typename?: 'PaginateGolfClubModelResponse' } & {
      content?: Maybe<Array<Maybe<{ __typename?: 'GolfClubModel' } & GolfClubModelAttrsFragment>>>
      pagination?: Maybe<{ __typename?: 'PaginationResponse' } & PaginationAttrsFragment>
    }
  >
}

export type FetchGolfClubModelQueryVariables = Exact<{
  id: Scalars['String']
}>

export type FetchGolfClubModelQuery = { __typename?: 'Query' } & {
  res?: Maybe<{ __typename?: 'GolfClubModel' } & GolfClubModelAttrsFragment>
}

export const CategoryAttrsFragmentDoc = gql`
  fragment CategoryAttrs on Category {
    id
    name
  }
`
export const BrandAttrsFragmentDoc = gql`
  fragment BrandAttrs on Brand {
    id
    name
  }
`
export const GolfClubModelAttrsFragmentDoc = gql`
  fragment GolfClubModelAttrs on GolfClubModel {
    id
    name
    description
    releaseYear
    retailPrice
    flex
    dexterity
    category {
      ...CategoryAttrs
    }
    brand {
      ...BrandAttrs
    }
  }
  ${CategoryAttrsFragmentDoc}
  ${BrandAttrsFragmentDoc}
`
export const PaginationAttrsFragmentDoc = gql`
  fragment PaginationAttrs on PaginationResponse {
    itemCount
    total
    pageSize
    totalPages
    current
  }
`
export const FetchGolfClubModelsDocument = gql`
  query FetchGolfClubModels {
    res: golfClubModels {
      ...GolfClubModelAttrs
    }
  }
  ${GolfClubModelAttrsFragmentDoc}
`

/**
 * __useFetchGolfClubModelsQuery__
 *
 * To run a query within a React component, call `useFetchGolfClubModelsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchGolfClubModelsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchGolfClubModelsQuery({
 *   variables: {
 *   },
 * });
 */
export function useFetchGolfClubModelsQuery(
  baseOptions?: Apollo.QueryHookOptions<FetchGolfClubModelsQuery, FetchGolfClubModelsQueryVariables>
) {
  return Apollo.useQuery<FetchGolfClubModelsQuery, FetchGolfClubModelsQueryVariables>(
    FetchGolfClubModelsDocument,
    baseOptions
  )
}
export function useFetchGolfClubModelsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<FetchGolfClubModelsQuery, FetchGolfClubModelsQueryVariables>
) {
  return Apollo.useLazyQuery<FetchGolfClubModelsQuery, FetchGolfClubModelsQueryVariables>(
    FetchGolfClubModelsDocument,
    baseOptions
  )
}
export type FetchGolfClubModelsQueryHookResult = ReturnType<typeof useFetchGolfClubModelsQuery>
export type FetchGolfClubModelsLazyQueryHookResult = ReturnType<typeof useFetchGolfClubModelsLazyQuery>
export type FetchGolfClubModelsQueryResult = Apollo.QueryResult<
  FetchGolfClubModelsQuery,
  FetchGolfClubModelsQueryVariables
>
export const FetchPaginatedGolfClubModelsDocument = gql`
  query FetchPaginatedGolfClubModels($pagination: PaginationArgs!) {
    res: paginateGolfClubModels(pagination: $pagination) {
      content {
        ...GolfClubModelAttrs
      }
      pagination {
        ...PaginationAttrs
      }
    }
  }
  ${GolfClubModelAttrsFragmentDoc}
  ${PaginationAttrsFragmentDoc}
`

/**
 * __useFetchPaginatedGolfClubModelsQuery__
 *
 * To run a query within a React component, call `useFetchPaginatedGolfClubModelsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchPaginatedGolfClubModelsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchPaginatedGolfClubModelsQuery({
 *   variables: {
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useFetchPaginatedGolfClubModelsQuery(
  baseOptions: Apollo.QueryHookOptions<FetchPaginatedGolfClubModelsQuery, FetchPaginatedGolfClubModelsQueryVariables>
) {
  return Apollo.useQuery<FetchPaginatedGolfClubModelsQuery, FetchPaginatedGolfClubModelsQueryVariables>(
    FetchPaginatedGolfClubModelsDocument,
    baseOptions
  )
}
export function useFetchPaginatedGolfClubModelsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FetchPaginatedGolfClubModelsQuery,
    FetchPaginatedGolfClubModelsQueryVariables
  >
) {
  return Apollo.useLazyQuery<FetchPaginatedGolfClubModelsQuery, FetchPaginatedGolfClubModelsQueryVariables>(
    FetchPaginatedGolfClubModelsDocument,
    baseOptions
  )
}
export type FetchPaginatedGolfClubModelsQueryHookResult = ReturnType<typeof useFetchPaginatedGolfClubModelsQuery>
export type FetchPaginatedGolfClubModelsLazyQueryHookResult = ReturnType<
  typeof useFetchPaginatedGolfClubModelsLazyQuery
>
export type FetchPaginatedGolfClubModelsQueryResult = Apollo.QueryResult<
  FetchPaginatedGolfClubModelsQuery,
  FetchPaginatedGolfClubModelsQueryVariables
>
export const FetchGolfClubModelDocument = gql`
  query FetchGolfClubModel($id: String!) {
    res: golfClubModel(id: $id) {
      ...GolfClubModelAttrs
    }
  }
  ${GolfClubModelAttrsFragmentDoc}
`

/**
 * __useFetchGolfClubModelQuery__
 *
 * To run a query within a React component, call `useFetchGolfClubModelQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchGolfClubModelQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchGolfClubModelQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useFetchGolfClubModelQuery(
  baseOptions: Apollo.QueryHookOptions<FetchGolfClubModelQuery, FetchGolfClubModelQueryVariables>
) {
  return Apollo.useQuery<FetchGolfClubModelQuery, FetchGolfClubModelQueryVariables>(
    FetchGolfClubModelDocument,
    baseOptions
  )
}
export function useFetchGolfClubModelLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<FetchGolfClubModelQuery, FetchGolfClubModelQueryVariables>
) {
  return Apollo.useLazyQuery<FetchGolfClubModelQuery, FetchGolfClubModelQueryVariables>(
    FetchGolfClubModelDocument,
    baseOptions
  )
}
export type FetchGolfClubModelQueryHookResult = ReturnType<typeof useFetchGolfClubModelQuery>
export type FetchGolfClubModelLazyQueryHookResult = ReturnType<typeof useFetchGolfClubModelLazyQuery>
export type FetchGolfClubModelQueryResult = Apollo.QueryResult<
  FetchGolfClubModelQuery,
  FetchGolfClubModelQueryVariables
>

export interface PossibleTypesResultData {
  possibleTypes: {
    [key: string]: string[]
  }
}
const result: PossibleTypesResultData = {
  possibleTypes: {}
}
export default result
