module.exports = {
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
  },
  flags: {
    /*  PRESERVE_WEBPACK_CACHE: true,
    PRESERVE_FILE_DOWNLOAD_CACHE: true,
    PARALLEL_SOURCING: true,*/
    FAST_DEV: true
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/static/images`
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    /*{
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Brightlab Gatsby Boilerplate`,
        short_name: `Boilerplate`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },*/
    `gatsby-plugin-gatsby-cloud`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    'gatsby-plugin-postcss'
  ]
}
