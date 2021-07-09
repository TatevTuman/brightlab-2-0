import { Link } from 'gatsby'
import React, { memo } from 'react'
import { useSiteMetadata } from '~hooks'
import { Button } from '~ui'
import * as Icon from '~svg'

export interface HeaderProps {
}

const Header: React.FC<HeaderProps> = props => {
  const {} = props

  const { navigation } = useSiteMetadata()

  return (
    <header className="pt-24">
      <div className="container">
        <nav className="mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
          <div className="w-full py-6 flex items-center justify-between">
            <div className="flex items-center">
              <Icon.Logo className="w-143 h-30 fill-black cursor-pointer"/>
            </div>
            <div className="text-26">
              <div className="flex space-x-62">
                {navigation.map(link => (
                  <Link key={link.label} to={link.path} className="text-26">
                    {link.label}
                  </Link>
                ))}

                {/*Refactor ===========>*/}

                <div className="space-x-20">
                  <button className="text-20 text-gray hover:text-black">RU</button>
                  <button className="text-20">ENG</button>
                </div>

              {/* =============/ */}

              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default memo(Header)
