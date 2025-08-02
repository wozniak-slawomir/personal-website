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

// Mock Nuxt server functions
global.defineEventHandler = jest.fn((handler) => handler)
global.readBody = jest.fn()
global.createError = jest.fn()

// Mock Vue composables
global.watch = jest.fn()
global.computed = jest.fn((fn) => ({ value: fn() }))
global.onBeforeMount = jest.fn((callback) => callback())

// Mock Nuxt components
config.global.stubs = {
  'NuxtLink': { template: '<a><slot /></a>' },
  'NuxtImg': { template: '<img />' },
  'NuxtPage': { template: '<div />' },
  'AuroraBackground': { template: '<div class="aurora-background" />' }
}

// Mock console methods to reduce noise in tests
global.console = {
  ...console,
  warn: jest.fn(),
  error: jest.fn(),
  log: jest.fn()
}

// Mock DEFAULT_LOCALE
jest.mock('~/const/defaultLocale', () => ({
  DEFAULT_LOCALE: 'en'
}))

// Configure Vue Test Utils globally
config.global.plugins = []