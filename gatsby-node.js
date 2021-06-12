/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

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
        '~hooks': path.resolve(__dirname, 'src/hooks/EXPORT.ts'),
        '~hocs': path.resolve(__dirname, 'src/hocs/EXPORT.ts'),

        '~graphql': path.resolve(__dirname, 'src/graphql/EXPORT.ts'),
        '~fragments': path.resolve(__dirname, 'src/graphql/fragments/EXPORT.ts'),

        '~layouts': path.resolve(__dirname, 'src/components/layouts/EXPORT.ts'),
        '~sections': path.resolve(__dirname, 'src/components/sections/EXPORT.ts'),
        '~seo': path.resolve(__dirname, 'src/components/seo/EXPORT.ts'),

        '~svg': path.resolve(__dirname, 'src/elements/svg/EXPORT.tsx'),
        '~ui': path.resolve(__dirname, 'src/elements/ui/EXPORT.ts'),
        '~ux': path.resolve(__dirname, 'src/elements/ux/EXPORT.ts'),

        '~images/*': path.resolve(__dirname, 'static/images/*'),
        '~styles': path.resolve(__dirname, 'static/styles'),

        '~types': path.resolve(__dirname, 'src/types/EXPORT.ts'),
        '~utils': path.resolve(__dirname, 'src/utils/EXPORT.ts')
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
