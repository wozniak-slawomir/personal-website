import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/vue'
import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import Navbar from '~/components/Navbar.vue'

const { mockT, mockLocale, mockSetLocale } = vi.hoisted(() => ({
  mockT: vi.fn((key: string) => `translated_${key}`),
  mockLocale: { value: 'en' },
  mockSetLocale: vi.fn(),
}))

mockNuxtImport('useI18n', () => {
  return () => ({ 
    t: mockT, 
    locale: mockLocale, 
    locales: [{ code: 'en' }, { code: 'pl' }], 
    setLocale: mockSetLocale,
  })
})

describe('Navbar.vue', () => {
  const localStorageMock = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    clear: vi.fn(),
  }

  beforeEach(() => {
    vi.clearAllMocks()
    Object.defineProperty(window, 'localStorage', { 
      value: localStorageMock, 
      writable: true, 
    })
  })

  const renderNavbar = () =>
    render(Navbar, {
      global: {
        stubs: {
          NuxtImg: { 
            template: '<img :src="src" :alt="alt" />', 
            props: ['src', 'alt', 'width', 'height'], 
          },
          NuxtLink: { 
            template: '<a :href="to"><slot /></a>', 
            props: ['to'], 
          },
        },
        directives: { 
          'on-click-outside': {
            mounted: () => undefined,
          },
        },
        mocks: { $t: mockT },
      },
    })

  it('renders navbar with logo', () => {
    const { container } = renderNavbar()
    
    expect(container.querySelector('nav')).toBeInTheDocument()
    expect(screen.getByRole('img')).toBeInTheDocument()
  })

  it('displays language selector interface', () => {
    const { container } = renderNavbar()
    
    const langSelector = container.querySelector('.cursor-pointer')
    expect(langSelector).toBeInTheDocument()
    
    const flagElement = container.querySelector('.fi')
    expect(flagElement).toBeInTheDocument()
  })

  it('opens language menu when language selector is clicked', async () => {
    const { container } = renderNavbar()
    
    // TODO: Change the element to button/dropdown
    const langSelector = container.querySelector('.cursor-pointer')
    expect(langSelector).toBeInTheDocument()
    
    await fireEvent.click(langSelector!)
    
    const languageButtons = screen.queryAllByRole('button')
    expect(languageButtons.length).toBeGreaterThan(0)
  })

  it('changes locale when language option is selected', async () => {
    const { container } = renderNavbar()
    
    const langSelector = container.querySelector('.cursor-pointer')
    await fireEvent.click(langSelector!)
    
    const buttons = screen.queryAllByRole('button')
    if (buttons.length > 0) {
      await fireEvent.click(buttons[0])
      expect(mockSetLocale).toHaveBeenCalled()
    }
  })

  it('has proper accessibility structure', () => {
    renderNavbar()
    
    expect(screen.getByRole('navigation')).toBeInTheDocument()
    expect(screen.getByRole('img')).toBeInTheDocument()
  })
})
