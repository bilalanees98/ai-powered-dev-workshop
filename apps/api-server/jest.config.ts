import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  testMatch: ['<rootDir>/src/tests/**/*.test.ts'],
  roots: ['<rootDir>/'],
  modulePaths: ['<rootDir>/src/'],
  moduleDirectories: ['node_modules', 'src'],
  testPathIgnorePatterns: [
    '<rootDir>/src/tests/setup.ts',
    '<rootDir>/src/tests/teardown.ts',
    '<rootDir>/src/tests/cronJobs/',
    '<rootDir>/node_modules/',
  ],
  collectCoverage: true,
  coverageDirectory: '<rootDir>/coverage',
  globalSetup: '<rootDir>/src/tests/setup.ts',
  globalTeardown: '<rootDir>/src/tests/teardown.ts',
  testTimeout: 500000,
  transformIgnorePatterns: ['/node_modules/(?!(?:@stacks/wallet-sdk)/)'],
};

export default config;
