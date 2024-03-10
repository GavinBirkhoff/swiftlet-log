import type { Config } from 'jest'

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom', // jsdom or node
  verbose: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  transform: {
    '^.+\\.(t|j)sx?$': 'ts-jest'
  },
  testMatch: ['**/__tests__/**/*.+(ts|tsx|js)', '**/?(*.)+(spec|test).+(ts|tsx|js)']
}

export default config
