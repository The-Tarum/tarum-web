
module.exports = {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['@testing-library/jest-dom'],
    moduleNameMapper: {
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
      '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js'
    },
    testMatch: ['**/__tests__/**/*.test.[jt]s?(x)'],
    collectCoverageFrom: [
      'src/**/*.{js,jsx}',
      '!src/main.jsx',
      '!src/vite-env.d.ts'
    ]
  };
  