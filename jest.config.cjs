module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['js', 'ts', 'vue'],
  transform: {
    '^.+\\.vue$': '@vue/vue3-jest',
    '^.+\\.ts$': ['ts-jest', {
      tsconfig: 'tests/tsconfig.json'
    }],
    '^.+\\.js$': 'babel-jest'
  },
  testMatch: [
    '**/tests/**/*.test.(js|ts)',
    '**/__tests__/**/*.(js|ts)',
    '**/*.(test|spec).(js|ts)'
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^~/(.*)$': '<rootDir>/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '@phosphor-icons/vue': '<rootDir>/tests/mocks/phosphor-icons.js'
  },
  collectCoverageFrom: [
    'components/**/*.{js,ts,vue}',
    'composables/**/*.{js,ts}',
    'lib/**/*.{js,ts}',
    'services/**/*.{js,ts}',
    'server/**/*.{js,ts}',
    '!**/*.d.ts',
    '!**/node_modules/**'
  ],
  setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'],
  extensionsToTreatAsEsm: ['.ts', '.vue'],
  testEnvironmentOptions: {
    customExportConditions: ['node', 'node-addons']
  },
  transformIgnorePatterns: [
    'node_modules/(?!(@phosphor-icons/vue|other-esm-module)/)'
  ]
}