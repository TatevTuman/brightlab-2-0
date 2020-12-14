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
  golfClub?: Maybe<GolfClub>
  golfClubs?: Maybe<Array<Maybe<GolfClub>>>
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
  GripSize?: Maybe<Scalars['Int']>
  Height?: Maybe<Scalars['Int']>
}

export type UserArgs = {
  password?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['String']>
  firstName?: Maybe<Scalars['String']>
  lastName?: Maybe<Scalars['String']>
  userName?: Maybe<Scalars['String']>
  GripSize?: Maybe<Scalars['Int']>
  Height?: Maybe<Scalars['Int']>
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
  golfClubModel?: Maybe<GolfClubModel>
}

export type GolfClubArgs = {
  name?: Maybe<Scalars['String']>
  condition?: Maybe<Scalars['String']>
  loft?: Maybe<Scalars['Float']>
  price?: Maybe<Scalars['Float']>
  golfClubModelId?: Maybe<Scalars['String']>
}

export type GolfClubResponse = {
  __typename?: 'GolfClubResponse'
  status?: Maybe<Scalars['String']>
  error?: Maybe<ErrorResponse>
  result?: Maybe<GolfClub>
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
  categoryId?: Maybe<Scalars['String']>
  brandId?: Maybe<Scalars['String']>
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
  'id' | 'name' | 'description' | 'releaseYear' | 'retailPrice' | 'flex' | 'dexterity' | 'categoryId' | 'brandId'
> & {
    category?: Maybe<{ __typename?: 'Category' } & Pick<Category, 'id' | 'name'>>
    brand?: Maybe<{ __typename?: 'Brand' } & Pick<Brand, 'id' | 'name'>>
  }

export type Unnamed_1_QueryVariables = Exact<{ [key: string]: never }>

export type Unnamed_1_Query = { __typename?: 'Query' } & {
  golfClubModels?: Maybe<
    Array<
      Maybe<
        { __typename?: 'GolfClubModel' } & Pick<
          GolfClubModel,
          | 'id'
          | 'name'
          | 'description'
          | 'releaseYear'
          | 'retailPrice'
          | 'flex'
          | 'dexterity'
          | 'categoryId'
          | 'brandId'
        > & {
            category?: Maybe<{ __typename?: 'Category' } & Pick<Category, 'id' | 'name'>>
            brand?: Maybe<{ __typename?: 'Brand' } & Pick<Brand, 'id' | 'name'>>
          }
      >
    >
  >
}

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
      id
      name
    }
    brand {
      id
      name
    }
    categoryId
    brandId
  }
`
export const Document = gql`
  {
    golfClubModels {
      id
      name
      description
      releaseYear
      retailPrice
      flex
      dexterity
      category {
        id
        name
      }
      brand {
        id
        name
      }
      categoryId
      brandId
    }
  }
`

/**
 * __useQuery__
 *
 * To run a query within a React component, call `useQuery` and pass it any options that fit your needs.
 * When your component renders, `useQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQuery({
 *   variables: {
 *   },
 * });
 */
export function useQuery(baseOptions?: Apollo.QueryHookOptions<Query, QueryVariables>) {
  return Apollo.useQuery<Query, QueryVariables>(Document, baseOptions)
}
export function useLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Query, QueryVariables>) {
  return Apollo.useLazyQuery<Query, QueryVariables>(Document, baseOptions)
}
export type QueryHookResult = ReturnType<typeof useQuery>
export type LazyQueryHookResult = ReturnType<typeof useLazyQuery>
export type QueryResult = Apollo.QueryResult<Query, QueryVariables>

export interface PossibleTypesResultData {
  possibleTypes: {
    [key: string]: string[]
  }
}
const result: PossibleTypesResultData = {
  possibleTypes: {}
}
export default result
