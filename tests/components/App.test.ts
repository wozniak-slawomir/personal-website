import { mount } from '@vue/test-utils'
import App from '~/app.vue'

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
}
global.localStorage = localStorageMock

// Mock AuroraBackground component
jest.mock('@/components/ui/aurora-background', () => ({
  AuroraBackground: {
    name: 'AuroraBackground',
    template: '<div class="aurora-background"></div>'
  }
}))

describe('App.vue', () => {
  let wrapper: any
  let mockSetLocale: jest.Mock
  let mockT: jest.Mock
  let mockUseHead: jest.Mock
  let mockUseSeoMeta: jest.Mock

  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks()
    localStorageMock.getItem.mockClear()
    
    mockSetLocale = jest.fn()
    mockT = jest.fn((key: string) => `translated_${key}`)
    mockUseHead = jest.fn()
    mockUseSeoMeta = jest.fn()
    
    // Setup i18n mock
    global.useI18n = jest.fn(() => ({
      t: mockT,
      locale: { value: 'en' },
      setLocale: mockSetLocale
    }))
    
    global.useHead = mockUseHead
    global.useSeoMeta = mockUseSeoMeta
    global.watch = jest.fn((source, callback, options) => {
      // Simulate immediate execution if specified
      if (options?.immediate) {
        callback()
      }
    })

    wrapper = mount(App, {
      global: {
        stubs: {
          'AuroraBackground': { template: '<div class="aurora-background"></div>' },
          'Navbar': { template: '<nav class="navbar"></nav>' },
          'NuxtPage': { template: '<div class="nuxt-page"></div>' },
          'ContactModal': { template: '<div class="contact-modal"></div>' }
        }
      }
    })
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('should render the main app structure', () => {
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('.dark').exists()).toBe(true)
    expect(wrapper.find('.aurora-background').exists()).toBe(true)
    expect(wrapper.find('.navbar').exists()).toBe(true)
    expect(wrapper.find('.nuxt-page').exists()).toBe(true)
    expect(wrapper.find('.contact-modal').exists()).toBe(true)
  })

  it('should apply dark theme class', () => {
    expect(wrapper.classes()).toContain('dark')
  })

  it('should set initial page title with translated text', () => {
    expect(mockT).toHaveBeenCalledWith('hero.software.engineering')
    expect(mockUseHead).toHaveBeenCalled()
  })

  it('should check localStorage for stored language on mount', () => {
    // Verify localStorage was checked
    expect(localStorageMock.getItem).toHaveBeenCalledWith('language')
  })

  it('should set locale from localStorage if available', () => {
    localStorageMock.getItem.mockReturnValue('pl')
    
    // Remount component to trigger onBeforeMount
    wrapper.unmount()
    wrapper = mount(App, {
      global: {
        stubs: {
          'AuroraBackground': { template: '<div class="aurora-background"></div>' },
          'Navbar': { template: '<nav class="navbar"></nav>' },
          'NuxtPage': { template: '<div class="nuxt-page"></div>' },
          'ContactModal': { template: '<div class="contact-modal"></div>' }
        }
      }
    })
    
    expect(mockSetLocale).toHaveBeenCalledWith('pl')
  })

  it('should use default locale when localStorage is empty', () => {
    localStorageMock.getItem.mockReturnValue(null)
    
    // Remount component to trigger onBeforeMount
    wrapper.unmount()
    wrapper = mount(App, {
      global: {
        stubs: {
          'AuroraBackground': { template: '<div class="aurora-background"></div>' },
          'Navbar': { template: '<nav class="navbar"></nav>' },
          'NuxtPage': { template: '<div class="nuxt-page"></div>' },
          'ContactModal': { template: '<div class="contact-modal"></div>' }
        }
      }
    })
    
    expect(mockSetLocale).toHaveBeenCalledWith('en') // DEFAULT_LOCALE
  })

  it('should watch locale changes and update head metadata', () => {
    expect(global.watch).toHaveBeenCalledWith(
      expect.anything(), // locale ref
      expect.any(Function), // callback
      { immediate: true }
    )
  })

  it('should update SEO metadata when locale changes', () => {
    // The watch callback should be called immediately due to { immediate: true }
    expect(mockUseSeoMeta).toHaveBeenCalledWith({
      title: 'translated_seo.title',
      description: 'translated_seo.description', 
      keywords: 'translated_seo.keywords',
      ogTitle: 'translated_seo.ogTitle',
      ogDescription: 'translated_seo.ogDescription',
      ogSiteName: 'translated_seo.ogSiteName'
    })
  })

  it('should have proper z-index layering', () => {
    const relativeDiv = wrapper.find('.z-1.relative')
    expect(relativeDiv.exists()).toBe(true)
    expect(relativeDiv.classes()).toContain('z-1')
    expect(relativeDiv.classes()).toContain('relative')
  })

  it('should import and use CSS assets', () => {
    // The component imports '~/assets/index.css'
    // This is tested implicitly by the component mounting successfully
    expect(wrapper.exists()).toBe(true)
  })

  it('should handle translation function calls', () => {
    // Verify various translation keys are called
    expect(mockT).toHaveBeenCalledWith('hero.software.engineering')
    expect(mockT).toHaveBeenCalledWith('seo.title')
    expect(mockT).toHaveBeenCalledWith('seo.description')
    expect(mockT).toHaveBeenCalledWith('seo.keywords')
  })
})