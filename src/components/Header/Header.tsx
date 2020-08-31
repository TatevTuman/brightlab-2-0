import React, { memo, useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'
import { Row, Col } from 'react-flexbox-grid'
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
        <Row middle={'xs'} between={'xs'}>
          <Col xs={8}>
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
          </Col>
          <Col xs={4}>
            {user ? (
              <Button type={'danger'} size={'lg'} onClick={handleSignOut}>
                Sign Out
              </Button>
            ) : (
              <Row end={'xs'}>
                <Col xs={6}>
                  <Button to={'/sign-in'} type={'sign-in'} size={'lg'}>
                    Sign In
                  </Button>
                </Col>
                <Col xs={6}>
                  <Button to={'/sign-up'} type={'sign-up'} size={'lg'}>
                    Sign Up
                  </Button>
                </Col>
              </Row>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default memo(Header)
