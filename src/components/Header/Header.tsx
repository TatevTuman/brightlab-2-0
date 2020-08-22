import React, { memo } from 'react'
import { NavigationItem } from '@types'
import { Container } from '@components'
import { Link, SignInButton } from '@elements'
import navigation from '@utils/navigation'
import './Header.scss'

const Header = () => {
  return (
    <div className="header">
      <Container>
        <div className="header-content">
          <nav data-direction="horizontal">
            {navigation.map((item: NavigationItem) => {
              const { to, label } = item

              return (
                <li key={to}>
                  <Link to={to}>{label}</Link>
                </li>
              )
            })}
          </nav>
          <SignInButton size={'md'} />
        </div>
      </Container>
    </div>
  )
}

export default memo(Header)
