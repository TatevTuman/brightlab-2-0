const path = require('path');

module.exports = {
  stories: [
    '../src/**/**/*.story.tsx',
    '../__stories__/**/*.story.tsx',
    '../__stories__/*.story.tsx',
  ],
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-docs',
    '@storybook/addon-controls'
  ],
  webpackFinal: async config => {
    // Transpile Gatsby module because Gatsby includes un-transpiled ES6 code.
    config.module.rules[0].exclude = [/node_modules\/(?!(gatsby)\/)/]
    // use installed babel-loader which is v8.0-beta (which is meant to work with @babel/core@7)
    config.module.rules[0].use[0].loader = require.resolve("babel-loader")
    // use @babel/preset-react for JSX and env (instead of staged presets)
    config.module.rules[0].use[0].options.presets = [
      require.resolve("@babel/preset-react"),
      require.resolve("@babel/preset-env")
    ]
    config.module.rules[0].use[0].options.plugins = [
      // use @babel/plugin-proposal-class-properties for class arrow functions
      require.resolve("@babel/plugin-proposal-class-properties"),
      // use babel-plugin-remove-graphql-queries to remove static queries from components when rendering in storybook
      require.resolve("babel-plugin-remove-graphql-queries"),
    ]
    // Prefer Gatsby ES6 entrypoint (module) over commonjs (main) entrypoint
    config.resolve.mainFields = ["browser", "module", "main"];

    // Adds aliases to relative paths
    config.resolve.alias = {
      '@components': path.resolve(__dirname, '../src/components/index.tsx'),
      '@elements': path.resolve(__dirname, '../src/elements/index.tsx'),
      '@modules': path.resolve(__dirname, '../src/modules/index.tsx'),
      '@templates': path.resolve(__dirname, '../src/templates/index.tsx'),
      '@pages-components': path.resolve(__dirname, '../src/pages-components/index.tsx'),
      '@images': path.resolve(__dirname, '../static/assets/images'),
      '@styles': path.resolve(__dirname, '../static/assets/styles'),
      '@types': path.resolve(__dirname, '../src/types/index.ts'),
      '@graphql': path.resolve(__dirname, '../src/graphql/index.ts'),
      '@fragments': path.resolve(__dirname, '../src/graphql/fragments/index.ts'),
      '@utils': path.resolve(__dirname, '../src/utils/index.ts'),
      '@hooks': path.resolve(__dirname, '../src/hooks/index.ts'),
      '@hocs': path.resolve(__dirname, '../src/hocs/index.ts'),
      '@cache': path.resolve(__dirname, '../gatsby-apollo-cache.ts')
    }

    // Adds typescript loader
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

    // SCSS handling
    config.module.rules.push({
      test: /\.scss$/,
      use: [
        'style-loader',
        'css-loader',
        {
          loader: 'resolve-url-loader',
          options: {
            sourceMap: true,
            root: path.resolve(__dirname, '../static/assets/images')
          }
        },
        {
          loader: 'sass-loader',
          options: {
            sourceMap: true
          }
        }
      ],
      include: [path.resolve(__dirname, '../'), path.resolve('../node_modules')]
    })

    // SVG handling
    const fileLoaderRule = config.module.rules.find(rule => rule.test.test('.svg'));
    fileLoaderRule.exclude = /\.svg$/;

    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.s?css$/,
      loader: 'file-loader',
    })

    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.tsx?$/,
      use: ["svg-react-loader"],
    });

    return config;
  },
};
