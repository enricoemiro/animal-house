import type { Config } from 'jest';

const config: Config = {
  rootDir: '.',
  clearMocks: true,
  resetMocks: true,
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
    '@mocks(.*)': '<rootDir>/test/__mocks__/$1',
  },
  moduleFileExtensions: ['js', 'ts'],
  testRegex: '.*\\.spec\\.ts$',
  transform: { '^.+\\.ts$': 'ts-jest' },
  collectCoverageFrom: ['**/*.ts'],
  coveragePathIgnorePatterns: ['jest.config.ts'],
  coverageDirectory: './coverage',
  testEnvironment: 'node',
};

export default config;
