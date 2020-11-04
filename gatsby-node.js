const path = require('path')

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  // const page = path.resolve(`src/pages/page`)
  //
  // createPage({
  //   path: '/page',
  //   component: Page
  // })
}

exports.onCreateWebpackConfig = function ({ plugins, actions }) {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        '@components': path.resolve(__dirname, 'src/components/index.tsx'),
        '@elements': path.resolve(__dirname, 'src/elements/index.tsx'),
        '@images': path.resolve(__dirname, 'static/assets/images'),
        '@styles': path.resolve(__dirname, 'static/assets/styles'),
        '@types': path.resolve(__dirname, 'src/types/index.ts'),
        '@graphql': path.resolve(__dirname, 'src/graphql/index.ts'),
        '@fragments': path.resolve(__dirname, 'src/graphql/fragments/index.ts'),
        '@utils': path.resolve(__dirname, 'src/utils/index.ts'),
        '@hooks': path.resolve(__dirname, 'src/hooks/index.ts')
      }
    }
  })
}
