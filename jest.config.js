module.exports = {
  testEnvironment: 'jsdom',
  roots: ['./src'],
  testRegex: 'spec\\.(j|t)sx?$',
  collectCoverage : true,
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!**/node_modules/**',
    '!**/vendor/**'
  ],
  coverageReporters: ['text-summary'],
};
