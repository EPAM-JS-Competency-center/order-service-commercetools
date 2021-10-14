module.exports = {
  resetMocks: true,
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,ts,tsx}',
    '!src/**/.temp/*.{js,ts,tsx}',
    '!src/**/*.test.ts',
    '!node_modules/',
  ],
  coverageThreshold: {
    global: {
      branches: 1,
      functions: 1,
      lines: 1,
      statements: 1,
    }
  },
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: [
    '/node_modules/',
    '/build/'
  ],
  testMatch: ['<rootDir>/src/**/*.test.(ts|tsx)'],
  roots: [
    '<rootDir>'
  ],
  moduleDirectories: [
    'node_modules',
    'src'
  ],
  reporters: ['jest-standard-reporter'],
  coverageReporters: ['lcov', 'text-summary'],
  coverageDirectory: 'reports/coverage',
};
