/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: './src/tests',
  modulePathIgnorePatterns: [
    '<rootDir>/unit/utils',
    '<rootDir>/integration/utils',
  ],
  testTimeout: 60000,
};