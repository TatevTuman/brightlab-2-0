const path = require('path')

exports.createPages = async ({ page, actions }) => {
  const { createPage } = actions
  // const page = path.resolve(`src/pages/page`)
  //
  // createPage({
  //   path: '/page',
  //   component: Page
  // })
}

exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions

  // page.matchPath is a special key that's used for matching pages
  // only on the client.
  if (page.path.match(/^\/admin/)) {
    page.matchPath = '/admin/*'

    // Update the page.
    createPage(page)
  }
}

exports.onCreateWebpackConfig = function ({ stage, loaders, actions, plugins }) {
  const config = {
    module: {
      rules: []
    },
    resolve: {
      alias: {
        '@components': path.resolve(__dirname, 'src/components/index.tsx'),
        '@elements': path.resolve(__dirname, 'src/elements/index.tsx'),
        '@modules': path.resolve(__dirname, 'src/modules/index.tsx'),
        '@templates': path.resolve(__dirname, 'src/templates/index.tsx'),
        '@pages-components': path.resolve(__dirname, 'src/pages-components'),
        '@images': path.resolve(__dirname, 'static/assets/images'),
        '@styles': path.resolve(__dirname, 'static/assets/styles'),
        '@types': path.resolve(__dirname, 'src/types/index.ts'),
        '@graphql': path.resolve(__dirname, 'src/graphql/index.ts'),
        '@fragments': path.resolve(__dirname, 'src/graphql/fragments/index.ts'),
        '@utils': path.resolve(__dirname, 'src/utils/index.ts'),
        '@hooks': path.resolve(__dirname, 'src/hooks/index.ts'),
        '@hocs': path.resolve(__dirname, 'src/hocs/index.ts'),
        '@cache': path.resolve(__dirname, 'gatsby-apollo-cache.ts')
      }
    }
  }

  if (stage === 'build-html') {
    /* For libs that should be ensured that window and document exists */
    // config.module.rules.push({
    //   test: /bad-module/ /* Define your lib */,
    //   use: loaders.null()
    // })
  }

  actions.setWebpackConfig(config)
}
