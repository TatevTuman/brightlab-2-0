import React, { memo, useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'
import { NavigationItem } from '@types'
import { Container } from '@components'
import { Button, Link } from '@elements'
import { navigation } from '@utils'
import { FetchCurrentUser } from '@graphql'
import './Header.scss'

const Header = () => {
  // TODO user
  const [fetchCurrentUser, { data }] = useLazyQuery<{ currentUser: any }>(FetchCurrentUser, {
    query: FetchCurrentUser,
    fetchPolicy: 'cache-and-network'
  })

  useEffect(() => fetchCurrentUser(), [])

  const user = data && data.currentUser

  const handleSignOut = () => {
    localStorage.removeItem('token')
    fetchCurrentUser()
  }

  return (
    <div className="header">
      <Container>
        <div className="header-content">
          <nav role={'navigation'} data-direction="horizontal">
            {navigation.map((item: NavigationItem) => {
              const { to, label } = item

              return (
                <li key={to}>
                  <Link to={to}>{label}</Link>
                </li>
              )
            })}
          </nav>
          {user ? (
            <Button type={'danger'} size={'md'} onClick={handleSignOut}>
              Sign Out
            </Button>
          ) : (
            <>
              <Button to={'/sign-in'} type={'sign-in'} size={'md'}>
                Sign In
              </Button>
              <Button to={'/sign-up'} type={'sign-up'} size={'md'}>
                Sign Up
              </Button>
            </>
          )}
        </div>
      </Container>
    </div>
  )
}

export default memo(Header)
