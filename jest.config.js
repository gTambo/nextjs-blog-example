const nextJest = require('next/jest');
const tsconfig = require('./tsconfig.json');
const { dir } = require('console');
// const moduleNameMapper = require('tsconfig-paths-jest')(tsconfig);
const createJestConfig = nextJest({dir: './',});
 
// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const customJestConfig = {
  // Add more setup options before each test is run
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  // if using TypeScript with a baseUrl set to the root directory then you need the below for alias' to work
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
  // moduleNameMapper: {
  //   ...moduleNameMapper,
  //   '^lodash-es$': 'lodash',
  // },
  preset: 'ts-jest',
};

const config = {
  // Add more setup options before each test is run
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  preset: 'ts-jest',
}
 
// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = async () => ({
    ...await createJestConfig(customJestConfig)(),
    transformIgnorePatterns: [
    '^.+\\.module\\.(css|sass|scss)$',
  ]
});