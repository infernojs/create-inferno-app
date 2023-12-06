export default {
  testEnvironment: 'node',
  testMatch: ['**/integration/*.test.js'],
  transform: { '^.+\\.js$': './jest.transform.js' },
};
