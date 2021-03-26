import React from 'react'
const gatsby = jest.requireActual('gatsby')

const siteMetadata = {
  site: {
    siteMetadata: {
      title: 'Brightlab Gatsby boilerplate',
      author: {
        name: 'Adjutant',
        summary: 'DRY - make things once, make them fast'
      },
      description: 'Brightlab Gatsby project to start',
      siteUrl: 'https://url-to-site-deploy/',
      navigation: [
        {
          path: '/',
          label: 'Home'
        }
      ]
    }
  }
}

module.exports = {
  ...gatsby,
  graphql: jest.fn(),
  navigate: jest.fn(),
  Link: jest.fn().mockImplementation(
    // these props are invalid for an `a` tag
    ({ activeClassName, activeStyle, getProps, innerRef, partiallyActive, ref, replace, to, ...rest }) =>
      React.createElement('a', {
        ...rest,
        href: to
      })
  ),
  StaticQuery: jest.fn(() => siteMetadata),
  useStaticQuery: jest.fn(() => siteMetadata)
}
