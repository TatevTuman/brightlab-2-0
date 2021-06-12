import { Link } from 'gatsby'
import React, { memo } from 'react'
import { useSiteMetadata } from '~hooks'
import * as Icon from '~svg'

interface FooterProps {}

const FooterProps: React.FC<FooterProps> = props => {
  const {} = props

  const { navigation } = useSiteMetadata()

  return (
    <footer className="bg-white">
      <div className="container">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
          <div className="flex justify-center space-x-30 md:order-2">
            {navigation.map(item => {
              return (
                <Link key={item.label} to={item.path} className="flex items-center text-green-600 hover:text-green-200">
                  <Icon.Dynamic className="w-20 h-20 mr-8" icon={item.icon as Icon.IconType} />
                  <span className="">{item.label}</span>
                </Link>
              )
            })}
          </div>
          <div className="mt-8 md:mt-0 md:order-1">
            <p className="text-center text-base text-gray-400">&copy; 2020 Workflow, Inc. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default memo(FooterProps)
