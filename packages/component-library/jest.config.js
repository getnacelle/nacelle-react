module.exports = {
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.(tsx|ts)?$': 'babel-jest'
  },
  setupFilesAfterEnv: ['./jest.setup.ts'],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(ts|tsx)?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname'
  ]
};
