const path = require('path')

// const { createFilePath } = require('gatsby-source-filesystem')

// exports.createPages = async ({ graphql, actions }) => {
//   const { createPage } = actions
//   const notFoundPage = path.resolve(`./src/pages/404.tsx`)
//
//   createPage({
//     path: '/404/:id',
//     component: notFoundPage
//   })
// }
//
// exports.onCreateNode = ({ node, actions, getNode }) => {
//   const { createNodeField } = actions
//
//   if (node.internal.type === 'MarkdownRemark') {
//     const value = createFilePath({ node, getNode })
//     createNodeField({
//       name: 'slug',
//       node,
//       value
//     })
//   }
// }

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
        '@layers': path.resolve(__dirname, 'src/layers/index.ts'),
        '@hooks': path.resolve(__dirname, 'src/hooks/index.ts')
      }
    }
  })
}
