import React from 'react'
const gatsby = jest.requireActual('gatsby')

const siteMetadata = {
  site: {
    siteMetadata: {
      title: `Brightlab Gatsby Boilerplate`,
      description: `Gatsby boilerplate for Brightlab team`,
      author: `https://brightlab.me`,
      navigation: [
        {
          path: '/',
          label: 'Solutions',
          icon: 'AcademicCap'
        },
        {
          path: '/',
          label: 'Pricing',
          icon: 'CurrencyDollar'
        },
        {
          path: '/',
          label: 'Docs',
          icon: 'BookOpen'
        },
        {
          path: '/',
          label: 'Company',
          icon: 'BriefCase'
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
