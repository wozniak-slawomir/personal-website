// @vitest-environment nuxt
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderSuspended, mockNuxtImport } from '@nuxt/test-utils/runtime'
import App from '~/app.vue'

// Use vi.hoisted for mocks that are referenced in mockNuxtImport
const { mockT, mockSetLocale, mockLocale, mockUseHead, mockUseSeoMeta } = vi.hoisted(() => {
  const mockT = vi.fn((key: string) => `translated_${key}`)
  const mockSetLocale = vi.fn()
  const mockLocale = { value: 'en' } // Simple object instead of ref to avoid import issues
  const mockUseHead = vi.fn()
  const mockUseSeoMeta = vi.fn()
  
  return { mockT, mockSetLocale, mockLocale, mockUseHead, mockUseSeoMeta }
})

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

  it('should render the main application structure', async () => {
    const component = await renderSuspended(App)
    
    expect(component.html()).toContain('class="dark"')
    expect(component.html()).toContain('z-1 relative')
  })

  it('should render Nuxt components', async () => {
    const component = await renderSuspended(App)
    
    expect(component.html()).toBeTruthy()
    expect(component.html().length).toBeGreaterThan(0)
  })

  it('should set initial head title correctly', async () => {
    await renderSuspended(App)
    
    expect(mockUseHead).toHaveBeenCalledWith({
      title: 'Sławomir Woźniak - translated_hero.software.engineering',
    })
  })

  it('should set head title and lang attribute when locale changes', async () => {
    await renderSuspended(App)
    
    expect(mockUseHead).toHaveBeenCalledWith({
      title: 'Sławomir Woźniak - translated_hero.software.engineering',
      htmlAttrs: {
        lang: 'en',
      },
    })
  })

  it('should set SEO metadata correctly', async () => {
    await renderSuspended(App)
    
    expect(mockUseSeoMeta).toHaveBeenCalledWith({
      title: 'translated_seo.title',
      description: 'translated_seo.description',
      keywords: 'translated_seo.keywords',
      ogTitle: 'translated_seo.ogTitle',
      ogDescription: 'translated_seo.ogDescription',
      ogSiteName: 'translated_seo.ogSiteName',
    })
  })

  it('should call translation functions for SEO metadata', async () => {
    await renderSuspended(App)
    
    expect(mockT).toHaveBeenCalledWith('seo.title')
    expect(mockT).toHaveBeenCalledWith('seo.description')
    expect(mockT).toHaveBeenCalledWith('seo.keywords')
    expect(mockT).toHaveBeenCalledWith('seo.ogTitle')
    expect(mockT).toHaveBeenCalledWith('seo.ogDescription')
    expect(mockT).toHaveBeenCalledWith('seo.ogSiteName')
  })

  it('should handle localStorage language setting', async () => {
    localStorageMock.getItem.mockReturnValue('fr')
    
    await renderSuspended(App)
    
    expect(localStorageMock.getItem).toHaveBeenCalledWith('language')
    expect(mockSetLocale).toHaveBeenCalledWith('fr')
  })

  it('should not set locale if no language stored', async () => {
    localStorageMock.getItem.mockReturnValue(null)
    
    await renderSuspended(App)
    
    expect(localStorageMock.getItem).toHaveBeenCalledWith('language')
    expect(mockSetLocale).not.toHaveBeenCalled()
  })
})