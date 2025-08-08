// @vitest-environment nuxt
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen } from '@testing-library/vue'
import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import App from '~/app.vue'

const { mockT, mockSetLocale, mockLocale, mockUseHead, mockUseSeoMeta } = vi.hoisted(() => ({
  mockT: vi.fn((key: string) => `translated_${key}`),
  mockSetLocale: vi.fn(),
  mockLocale: { value: 'en' },
  mockUseHead: vi.fn(),
  mockUseSeoMeta: vi.fn(),
}))

mockNuxtImport('useI18n', () => {
  return () => ({
    t: mockT,
    locale: mockLocale,
    setLocale: mockSetLocale,
  })
})

mockNuxtImport('useHead', () => mockUseHead)
mockNuxtImport('useSeoMeta', () => mockUseSeoMeta)

describe('App.vue', () => {
  const localStorageMock = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    clear: vi.fn(),
  }

  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
      writable: true,
    })
    vi.clearAllMocks()
    localStorageMock.getItem.mockReturnValue(null)
    mockLocale.value = 'en'
  })

  const renderApp = () =>
    render(App, {
      global: {
        stubs: {
          NuxtPage: { template: '<div class="nuxt-page">Page Content</div>' },
          AuroraBackground: { template: '<div class="aurora-background" />' },
        },
        mocks: { $t: mockT },
      },
    })

  it('renders the main application structure', () => {
    const { container } = renderApp()
    
    expect(container.querySelector('.dark')).toBeInTheDocument()
    expect(container.querySelector('.z-1.relative')).toBeInTheDocument()
  })

  it('renders page content', () => {
    renderApp()
    
    expect(screen.getByText('Page Content')).toBeInTheDocument()
  })

  it('sets head metadata on mount', () => {
    renderApp()
    
    expect(mockUseHead).toHaveBeenCalledWith({
      title: 'Sławomir Woźniak - translated_hero.software.engineering',
      htmlAttrs: {
        lang: 'en',
      },
    })
  })

  it('sets SEO metadata on mount', () => {
    renderApp()
    
    expect(mockUseSeoMeta).toHaveBeenCalledWith({
      title: 'translated_seo.title',
      description: 'translated_seo.description',
      keywords: 'translated_seo.keywords',
      ogTitle: 'translated_seo.ogTitle',
      ogDescription: 'translated_seo.ogDescription',
      ogSiteName: 'translated_seo.ogSiteName',
    })
  })

  it('handles localStorage language setting', () => {
    localStorageMock.getItem.mockReturnValue('fr')
    
    renderApp()
    
    expect(localStorageMock.getItem).toHaveBeenCalledWith('language')
    expect(mockSetLocale).toHaveBeenCalledWith('fr')
  })
})