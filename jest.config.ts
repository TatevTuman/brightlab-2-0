// jest.config.ts
import type { Config } from '@jest/types'

// Sync object
const config: Config.InitialOptions = {
  transform: {
    '^.+\\.tsx?$': '<rootDir>/.jest/jest-preprocess.ts'
  },
  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss)$': 'identity-obj-proxy',
    '.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/file-mock.ts',
    '@components': '<rootDir>/src/components/index.tsx',
    '@elements': '<rootDir>/src/elements/index.tsx',
    '@images': '<rootDir>/static/assets/images',
    '@styles': '<rootDir>/static/assets/styles',
    '@types': '<rootDir>/src/types/index.ts',
    '@graphql': '<rootDir>/src/graphql/index.ts',
    '@fragments': '<rootDir>/src/graphql/fragments/index.ts',
    '@utils': '<rootDir>/src/utils/index.ts',
    '@hooks': '<rootDir>/src/hooks/index.ts',
    '@hocs': '<rootDir>/src/hocs/index.ts',
    '@cache': '<rootDir>/gatsby-apollo-cache.ts'
  },
  testPathIgnorePatterns: ['node_modules', '\\.cache', '<rootDir>.*/public'],
  transformIgnorePatterns: ['node_modules/(?!(gatsby)/)'],
  globals: {
    __PATH_PREFIX__: ''
  },
  testURL: 'http://localhost',
  setupFiles: ['<rootDir>/.jest/setupFiles/index.ts'],
  setupFilesAfterEnv: ['<rootDir>/.jest/setupFilesAfterEnv/index.ts']
}

export default config
