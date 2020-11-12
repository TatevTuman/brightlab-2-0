import React, { memo } from 'react'
import { Row, Col } from 'react-flexbox-grid'
import { Container } from '@components'
import { Link } from '@elements'
import { useSiteMetadata } from '@hooks'
import styles from './Header.module.scss'

interface HeaderProps {}

const Header: React.FC<HeaderProps> = props => {
  const { navigation } = useSiteMetadata()

  return (
    <div className={styles.header}>
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
        </Row>
      </Container>
    </div>
  )
}

export default memo(Header)
