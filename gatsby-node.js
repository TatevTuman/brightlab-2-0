const path = require('path')
// const { createFilePath } = require('gatsby-source-filesystem')

// exports.createPages = async ({ graphql, actions }) => {
//   const { createPage } = actions
//   const notFoundPage = path.resolve(`./src/pages/404/index.tsx`)
//
//   createPage({
//     path: '/404',
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

exports.onCreateWebpackConfig = function ({ actions }) {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        '@components': path.resolve(__dirname, 'src/components/index.ts'),
        '@elements': path.resolve(__dirname, 'src/elements/index.ts'),
        '@images': path.resolve(__dirname, 'static/assets/images'),
        '@styles': path.resolve(__dirname, 'static/assets/styles'),
        '@typography': path.resolve(__dirname, 'src/utils/typography.ts'),
        '@hooks': path.resolve(__dirname, 'src/hooks/index.ts')
      }
    }
  })
}
