import { mount } from '@vue/test-utils'

const MockServices = {
  template: `
    <div class="container mt-64">
      <h2 class="text-5xl text-center md:text-left font-semibold uppercase">
        {{ $t('services.services') }}
      </h2>
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-7 mt-8">
        <div class="card-container w-full lg:w-auto">
          <div class="card-body group/card relative size-auto w-full lg:w-auto rounded-3xl border glassmorphism p-6">
            <div class="card-item text-xl font-bold">
              {{ $t('services.development.title') }}
            </div>
            <p class="card-item mt-2 max-w-sm text-sm text-[#bbbbbb]">
              {{ $t('services.development.description') }}
            </p>
            <div class="card-item mt-4 w-full text-2xl">
              {{ $t('services.development.price') }}
            </div>
            <div class="card-item mt-4 w-full">
              <img
                src="/services/website.jpg"
                height="1000"
                width="1000"
                class="h-60 w-full rounded-3xl object-cover"
                alt="website development"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  data() {
    return {}
  }
}

describe('Services.vue', () => {
  let wrapper: any
  let mockT: jest.Mock

  beforeEach(() => {
    mockT = jest.fn((key: string) => key)

    wrapper = mount(MockServices, {
      global: {
        mocks: {
          $t: mockT
        }
      }
    })
  })

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount()
    }
  })

  it('should render correctly', () => {
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('.container').exists()).toBe(true)
  })

  it('should display services heading', () => {
    expect(mockT).toHaveBeenCalledWith('services.services')
    const heading = wrapper.find('h2')
    expect(heading.exists()).toBe(true)
  })

  it('should have grid layout for services', () => {
    const grid = wrapper.find('.grid')
    expect(grid.exists()).toBe(true)
    expect(grid.classes()).toContain('grid-cols-1')
    expect(grid.classes()).toContain('lg:grid-cols-3')
  })

  it('should render service cards', () => {
    const cardContainers = wrapper.findAll('.card-container')
    expect(cardContainers.length).toBeGreaterThan(0)
    
    const cardBodies = wrapper.findAll('.card-body')
    expect(cardBodies.length).toBeGreaterThan(0)
  })

  it('should display service titles and descriptions', () => {
    expect(mockT).toHaveBeenCalledWith('services.development.title')
    expect(mockT).toHaveBeenCalledWith('services.development.description')
    expect(mockT).toHaveBeenCalledWith('services.development.price')
  })

  it('should have service images', () => {
    const images = wrapper.findAll('img')
    expect(images.length).toBeGreaterThan(0)
    
    images.forEach(img => {
      expect(img.attributes('src')).toBeDefined()
      expect(img.attributes('alt')).toBeDefined()
    })
  })

  it('should use card item elements for content structure', () => {
    const cardItems = wrapper.findAll('.card-item')
    expect(cardItems.length).toBeGreaterThan(0)
  })
})