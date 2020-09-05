import React, { memo } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { RouteComponentProps } from '@reach/router'
import { Container } from '@components'
import { useUsersLayer, useRolesLayer } from '@layers'
import { SitePage } from '@types'
import './Page.scss'

const GetSitePages = graphql`
  query {
    site {
      siteMetadata {
        pages {
          route
          roles
        }
      }
    }
  }
`

interface PageProps extends RouteComponentProps {
  children: JSX.Element | JSX.Element[]
}

const Page: React.FC<PageProps> = props => {
  const { children, path } = props
  const { pages } = useStaticQuery(GetSitePages).site.siteMetadata
  const { data: usersData } = useUsersLayer().usersData
  const { data: rolesData } = useRolesLayer().rolesData

  const user = usersData && usersData.user
  const roles = rolesData && rolesData.roles
  const page = pages.find((page: SitePage) => page.route === path)

  if (!page) {
    console.warn('Client: Couldn`t find a page with', path, 'route', 'please add this page info into gatsby-config.js')
  } else {
    // const isPageRoles = page.roles.length > 0
    //
    // if (isPageRoles) {
    //   const hasUserPageRoles =
    //     user &&
    //     user.roles.find((userRole) =>
    //       page.roles.find((pageRole: string) =>
    //         userRole === pageRole
    //       )
    //     )
    // }
  }

  console.log('user', user)
  console.log('roles', roles)

  return (
    <div className="page">
      <Container>{children}</Container>
    </div>
  )
}

export default memo(Page)
