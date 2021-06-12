import { Link } from 'gatsby'
import React, { memo } from 'react'
import { useSiteMetadata } from '~hooks'
import * as Icon from '~svg'

interface HeaderProps {}

const Header: React.FC<HeaderProps> = props => {
  const {} = props

  const { navigation } = useSiteMetadata()

  return (
    <header className="bg-green-600 py-16">
      <div className="container">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
          <div className="w-full py-6 flex items-center justify-between border-b border-green-500 lg:border-none">
            <div className="flex items-center">
              <Icon.Logo className="text-white -mt-9 mr-30" />
              <div className="space-x-32 lg:block">
                {navigation.map(link => (
                  <Link
                    key={link.label}
                    to={link.path}
                    className="text-base font-medium text-white hover:text-green-200"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
            <div className="ml-10 space-x-4">
              <button className="btn btn-green">Sign In</button>
              <button className="btn btn-green-white">Sign up</button>
            </div>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default memo(Header)
