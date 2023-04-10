// Fix the timezone for all tests.
process.env.TZ = 'UTC';

module.exports = {
  preset: 'jest-puppeteer',
  testMatch: ['**/?(*.)+(spec|test).[t]s'],
  testPathIgnorePatterns: ['/node_modules/', 'dist'], //
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  transform: {
    '^.+\\.ts?$': 'ts-jest'
  },
  'globals': {
    'window': {}
  },
  // globalSetup: './jest.global-setup.ts', // will be called once before all tests are executed
  // globalTeardown: './jest.global-teardown.ts' // will be called once after all tests are executed
};
