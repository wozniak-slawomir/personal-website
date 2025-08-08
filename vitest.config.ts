import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  test: {
    environment: 'nuxt',
    globals: true,
    setupFiles: ['./tests/setup.ts'],
    environmentOptions: {
      nuxt: {
        domEnvironment: 'jsdom',
      },
    },
  },
})
