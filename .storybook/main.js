const path = require('path')

module.exports = {
  "stories": [
    "../__stories__/**/**/*.story.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    '@storybook/addon-links',
    '@storybook/addon-actions',
    '@storybook/addon-docs',
    '@storybook/addon-controls',
    '@storybook/addon-postcss'
  ],
  webpackFinal: async config => {
    // Transpile Gatsby module because Gatsby includes un-transpiled ES6 code.
    config.module.rules[0].exclude = [/node_modules\/(?!(gatsby)\/)/]
    // use installed babel-loader which is v8.0-beta (which is meant to work with @babel/core@7)
    config.module.rules[0].use[0].loader = require.resolve("babel-loader")
    // use @babel/preset-react for JSX and env (instead of staged presets)
    config.module.rules[0].use[0].options.presets = [
      require.resolve("@babel/preset-react"),
      require.resolve("@babel/preset-env"),
    ]
    config.module.rules[0].use[0].options.plugins = [
      // use @babel/plugin-proposal-class-properties for class arrow functions
      require.resolve("@babel/plugin-proposal-class-properties"),
      // use babel-plugin-remove-graphql-queries to remove static queries from components when rendering in storybook
      require.resolve("babel-plugin-remove-graphql-queries"),
    ]
    // Prefer Gatsby ES6 entrypoint (module) over commonjs (main) entrypoint
    config.resolve.mainFields = ["browser", "module", "main"]

    // Adds aliases to relative paths
    config.resolve.alias = {
      '~hooks': path.resolve(__dirname, '../src/hooks/EXPORT.ts'),
      '~hocs': path.resolve(__dirname, '../src/hocs/EXPORT.ts'),

      '~graphql': path.resolve(__dirname, '../src/graphql/EXPORT.ts'),
      '~fragments': path.resolve(__dirname, '../src/graphql/fragments/EXPORT.ts'),

      '~layouts': path.resolve(__dirname, '../src/components/layouts/EXPORT.ts'),
      '~sections': path.resolve(__dirname, '../src/components/sections/EXPORT.ts'),
      '~seo': path.resolve(__dirname, '../src/components/seo/EXPORT.ts'),

      '~svg': path.resolve(__dirname, '../src/elements/svg/EXPORT.tsx'),
      '~ui': path.resolve(__dirname, '../src/elements/ui/EXPORT.ts'),
      '~ux': path.resolve(__dirname, '../src/elements/ux/EXPORT.ts'),

      '~images/*': path.resolve(__dirname, 'static/images/*'),
      '~styles': path.resolve(__dirname, 'static/styles'),

      '~types': path.resolve(__dirname, '../src/types/EXPORT.ts'),
      '~utils': path.resolve(__dirname, '../src/utils/EXPORT.ts')
    }

    /* Manage typescript */
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      loader: require.resolve("babel-loader"),
      options: {
        presets: [["react-app", { flow: false, typescript: true }]],
        plugins: [
          require.resolve("@babel/plugin-proposal-class-properties"),
          // use babel-plugin-remove-graphql-queries to remove static queries from components when rendering in storybook
          require.resolve("babel-plugin-remove-graphql-queries"),
        ],
      },
    })

    config.resolve.extensions.push(".ts", ".tsx")
    return config
  },
}
