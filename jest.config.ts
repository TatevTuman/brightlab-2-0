import { compilerOptions } from './tsconfig.json'
import { pathsToModuleNameMapper } from 'ts-jest/utils'
import type { Config } from '@jest/types'

const paths = pathsToModuleNameMapper(compilerOptions.paths, {
  prefix: '<rootDir>/'
})

// Sync object
const config: Config.InitialOptions = {
  roots: ['<rootDir>/__tests__'],
  testMatch: ['<rootDir>/__tests__/**/**/*.test.[jt]s?(x)'],
  transform: {
    '^.+\\.tsx?$': '<rootDir>/.jest/jest-preprocess.ts'
  },
  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss)$': 'identity-obj-proxy',
    '.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/file-mock.ts',
    ...paths
  },
  testPathIgnorePatterns: ['node_modules', '\\.cache', '<rootDir>.*/public'],
  transformIgnorePatterns: ['node_modules/(?!(gatsby)/)'],
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  /* @ts-ignore */
  globals: {
    __PATH_PREFIX__: ''
  },
  testURL: 'http://localhost',
  testEnvironment: 'jsdom',
  setupFiles: ['<rootDir>/.jest/setupFiles/EXPORT.ts'],
  setupFilesAfterEnv: ['<rootDir>/.jest/setupFilesAfterEnv/EXPORT.ts']
}

export default config
