module.exports = {
  projects: ['<rootDir>/apps/*/jest.config.js'],
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
};
