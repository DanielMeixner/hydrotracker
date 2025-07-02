module.exports = {
  roots: ['<rootDir>/implementation/src'],
  testMatch: ['**/__tests__/**/*.+(ts|tsx|js)'],
  transform: {
    '^.+\\.(ts|tsx)$': 'babel-jest',
  },
  setupFilesAfterEnv: ['<rootDir>/node_modules/@testing-library/jest-dom/dist/index.js'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^react$': '<rootDir>/implementation/node_modules/react',
    '^react-dom$': '<rootDir>/implementation/node_modules/react-dom',
  },
};
