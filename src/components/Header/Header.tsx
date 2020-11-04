import React, { memo } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { Row, Col } from 'react-flexbox-grid'
import { Site } from '@types'
import { Container } from '@components'
import { Button, Link } from '@elements'
import './Header.scss'

export const GetSiteNavigation = graphql`
  query {
    site {
      siteMetadata {
        navigation {
          path
          label
        }
      }
    }
  }
`

interface HeaderProps {}

const Header: React.FC<HeaderProps> = props => {
  const { navigation } = useStaticQuery<Site>(GetSiteNavigation).site.siteMetadata

  const handleSignOut = async () => {
    // Need to compile gatbsy server side
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token')
    }
  }

  return (
    <div className="header">
      <Container>
        <Row middle={'xs'} between={'xs'}>
          <Col xs={8}>
            <nav role={'navigation'} data-direction="horizontal">
              {navigation.map(item => {
                const { path, label } = item

                return (
                  <li key={path}>
                    <Link to={path}>{label}</Link>
                  </li>
                )
              })}
            </nav>
          </Col>
          {/*<Col xs={4}>*/}
          {/*  {user ? (*/}
          {/*    <Button type={'danger'} size={'lg'} onClick={handleSignOut}>*/}
          {/*      Sign Out*/}
          {/*    </Button>*/}
          {/*  ) : (*/}
          {/*    <Row end={'xs'}>*/}
          {/*      <Col xs={6}>*/}
          {/*        <Button to={'/sign-in'} type={'sign-in'} size={'lg'}>*/}
          {/*          Sign In*/}
          {/*        </Button>*/}
          {/*      </Col>*/}
          {/*      <Col xs={6}>*/}
          {/*        <Button to={'/sign-up'} type={'sign-up'} size={'lg'}>*/}
          {/*          Sign Up*/}
          {/*        </Button>*/}
          {/*      </Col>*/}
          {/*    </Row>*/}
          {/*  )}*/}
          {/*</Col>*/}
        </Row>
      </Container>
    </div>
  )
}

export default memo(Header)
