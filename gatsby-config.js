module.exports = {
  // If you change this please sync it with @hooks/useSiteMetadata.js
  // and __mocks__/gatsby.ts for static queries mocking
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
      },
      {
        path: '/typography',
        label: 'Typography'
      },
      {
        path: '/sign-in',
        label: 'Sign in'
      },
      {
        path: '/sign-up',
        label: 'Sign up'
      }
    ]
  },
  plugins: [
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 590
            }
          },
          {
            resolve: 'gatsby-remark-responsive-iframe',
            options: {
              wrapperStyle: 'margin-bottom: 1.0725rem'
            }
          },
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants'
        ]
      }
    },
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        includePaths: [`${__dirname}/static/assets/styles`],
        useResolveUrlLoader: true
        // Override the file regex for SASS
        // sassRuleTest: /\.global\.s(a|c)ss$/,
        // Override the file regex for CSS modules
        // sassRuleModulesTest: /\.mod\.s(a|c)ss$/
      }
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/static/assets/images`
      }
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        //trackingId: `ADD YOUR TRACKING ID HERE`,
      }
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /\.svg$/
        }
      }
    },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-typescript',
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/utils/typography',
        omitGoogleFont: false
      }
    }
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // {
    //   resolve: `gatsby-plugin-offline`,
    //   options: {
    //     precachePages: [`/index`, '/404']
    //   }
    // }
  ]
}
