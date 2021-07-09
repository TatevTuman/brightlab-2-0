import { navigate } from 'gatsby'
import React, { memo, useEffect } from 'react'
// import { useQuery } from '@apollo/client'
// import { FetchUserData } from '~graphql'
import { Children } from '~types'
import { Loader } from '~ux'
import * as Icon from '~svg'
import { useDelayedState } from '~hooks'

export interface AuthLayoutProps {
  children: Children
}

const AuthLayout: React.FC<AuthLayoutProps> = props => {
  const { children } = props

  /*const { data, loading } = useQuery<{ currentUser: UserType; currentCompanies: CompanyType[] }>(FetchUserData, {
    onError: () => navigate('/logout')
  })*/

  /*const [layoutLoading, setLayoutLoading] = useDelayedState(true)

  useEffect(() => {
    if (!loading) {
      const user = data?.currentUser

      if (!user) {
        console.log('fetch current user', user);
        return;
        navigate('/logout')
      }
    }

    setLayoutLoading(loading, 1500)
  }, [loading])*/

  /*if (layoutLoading) {
    return (
      <div className={'flex flex-col items-center justify-center bg-neutral-14'}>
        <Icon.Logo className={'w-172 h-32 mb-42'} />
        <Loader />
      </div>
    )
  }*/

  return <>{children}</>
}

export default memo(AuthLayout)
