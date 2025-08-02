import { config } from '@vue/test-utils'

// Mock Nuxt composables
global.useI18n = jest.fn(() => ({
  t: jest.fn((key: string) => key),
  locale: { value: 'en' },
  setLocale: jest.fn()
}))

global.useHead = jest.fn()
global.useSeoMeta = jest.fn()
global.useNuxtApp = jest.fn(() => ({
  $event: jest.fn()
}))
global.useRuntimeConfig = jest.fn(() => ({
  VITE_SMTP_HOST: 'test-host',
  VITE_SMTP_PORT: '587',
  VITE_SMTP_USER: 'test@example.com',
  VITE_SMTP_PASS: 'test-pass',
  VITE_MAIL_RECEIVER: 'receiver@example.com',
  VITE_SENDER_MAIL: 'sender@example.com'
}))

// Mock Nuxt components
config.global.stubs = {
  'NuxtLink': { template: '<a><slot /></a>' },
  'NuxtImg': { template: '<img />' },
  'NuxtPage': { template: '<div />' }
}

// Mock console methods to reduce noise in tests
global.console = {
  ...console,
  warn: jest.fn(),
  error: jest.fn(),
  log: jest.fn()
}