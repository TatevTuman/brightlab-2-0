module.exports = {
  transform: {
    '^.+\\.tsx?$': '<rootDir>/.jest/jest-preprocess.js'
  },
  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss)$': 'identity-obj-proxy',
    '.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/file-mock.ts',
    '@components': '<rootDir>/src/components/index.ts',
    '@elements': '<rootDir>/src/elements/index.ts',
    '@layers': '<rootDir>/src/layers/index.ts',
    '@images': '<rootDir>/static/assets/images',
    '@styles': '<rootDir>/static/assets/styles',
    '@types': '<rootDir>/src/types/index.ts',
    '@graphql': '<rootDir>/src/graphql/index.ts',
    '@fragments': '<rootDir>/src/graphql/fragments/index.ts',
    '@utils': '<rootDir>/src/utils',
    '@hooks': '<rootDir>/src/hooks/index.ts'
  },
  testPathIgnorePatterns: ['node_modules', '\\.cache', '<rootDir>.*/public'],
  transformIgnorePatterns: ['node_modules/(?!(gatsby)/)'],
  globals: {
    __PATH_PREFIX__: ''
  },
  testURL: 'http://localhost',
  setupFiles: ['<rootDir>/.jest/loadershim.js']
}
