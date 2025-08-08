// @vitest-environment nuxt
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/vue'
import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import Navbar from '~/components/Navbar.vue'

// Hoisted mocks
const { mockT, mockLocale, mockSetLocale } = vi.hoisted(() => ({
  mockT: vi.fn((key: string) => `translated_${key}`),
  mockLocale: { value: 'en' as string },
  mockSetLocale: vi.fn(),
}))

mockNuxtImport('useI18n', () => {
  return () => ({ t: mockT, locale: mockLocale, locales: [{ code: 'en' }, { code: 'pl' }], setLocale: mockSetLocale })
})

// Mock flag-icons CSS import to avoid issues
vi.mock('/node_modules/flag-icons/css/flag-icons.min.css', () => ({}))

// Stub v-on-click-outside directive
const vOnClickOutside: Record<string, (el: HTMLElement, binding?: unknown) => void> = {
  mounted: () => undefined,
}


describe('Navbar.vue', () => {
  const localStorageMock = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    clear: vi.fn(),
  }

  beforeEach(() => {
    vi.clearAllMocks()
    Object.defineProperty(window, 'localStorage', { value: localStorageMock, writable: true })
  })

  const renderNavbar = () =>
    render(Navbar, {
      global: {
        stubs: {
          NuxtImg: { template: '<img :src="src" :alt="alt" />', props: ['src', 'alt', 'width', 'height'] },
          NuxtLink: { template: '<a :href="to"><slot /></a>', props: ['to'] },
        },
        directives: { 'on-click-outside': vOnClickOutside },
        mocks: { $t: mockT },
      },
    })

  it('renders navbar with logo', () => {
    const { container } = renderNavbar()
    expect(container.querySelector('nav')).not.toBeNull()
    expect(container.querySelector('img')).not.toBeNull()
  })

  it('toggles language menu on click and sets locale', async () => {
    renderNavbar()
    // Find the language selector by its classes
    const langBtn = document.querySelector('.cursor-pointer') as HTMLElement | null
    expect(langBtn).not.toBeNull()
    if (!langBtn) return

    await fireEvent.click(langBtn)

    // After opening, there should be language option buttons; click the first
    const buttons = screen.queryAllByRole('button')
    if (buttons.length) {
      await fireEvent.click(buttons[0])
    }

    expect(mockSetLocale).toHaveBeenCalled()
  })
})
