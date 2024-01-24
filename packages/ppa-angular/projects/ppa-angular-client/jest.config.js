module.exports = {
  displayName: 'ppa-angular-client',
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  moduleNameMapper: {
    // 'libs/(.*)$': '<rootDir>/../../libs/$1',
  },
};