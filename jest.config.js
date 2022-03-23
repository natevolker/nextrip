const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  moduleNameMapper: {
    // Handle module aliases (this will be automatically configured for you soon)
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@pages/(.*)$': '<rootDir>/src/pages/$1',
    "@services/(.*)$": ['<rootDir>/src/services/$1',],
    "@utils/*": ['<rootDir>/src/utils/$1',],
    "@styles/global": ["public/globals.css"],
  },
  testEnvironment: 'jest-environment-jsdom',
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig)