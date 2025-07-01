module.exports = {
  roots: ['<rootDir>/implementation/src'],
  testMatch: ['**/__tests__/**/*.+(ts|tsx|js)'],
  transform: {
    '^.+\\.(ts|tsx)$': 'babel-jest',
  },
  setupFilesAfterEnv: ['<rootDir>/implementation/src/jest.setup.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testEnvironment: 'jsdom',
};
