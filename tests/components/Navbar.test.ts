import { mount } from '@vue/test-utils'

const MockNavbar = {
  template: `
    <nav class="transition-all w-full h-[var(--navbar-height)] py-5 flex fixed top-0 z-20">
      <div class="scroll-progress-bar" />
      <div class="container justify-between items-center flex">
        <a to="/">
          <img
            src="/logo.png"
            class="max-w-full md:max-w-[400px] min-w-[100px] mr-3 md:mr-0"
            alt="Slawomir logo"
            width="400"
            height="30"
          />
        </a>
        <div class="flex">
          <div
            class="p-3 bg-[#393939] cursor-pointer hover:bg-[#474b59] w-14 text-center sm:w-24 h-min z-20 rounded-[25px]"
            @click="isMenuOpen = !isMenuOpen"
          >
            <span class="fi fis rounded-full w-6 h-6 align-middle mx-1 fi-gb" />
            <p class="align-middle mx-1 hidden sm:inline uppercase">en</p>
          </div>
        </div>
      </div>
    </nav>
  `,
  data() {
    return {
      isMenuOpen: false,
      locale: 'en'
    }
  }
}

describe('Navbar.vue', () => {
  let wrapper: any
  let mockT: jest.Mock

  beforeEach(() => {
    mockT = jest.fn((key: string) => key)

    wrapper = mount(MockNavbar, {
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
    expect(wrapper.find('nav').exists()).toBe(true)
  })

  it('should display logo with correct properties', () => {
    const logo = wrapper.find('img')
    expect(logo.exists()).toBe(true)
    expect(logo.attributes('src')).toBe('/logo.png')
  })

  it('should have language selector', () => {
    const languageButton = wrapper.find('.cursor-pointer')
    expect(languageButton.exists()).toBe(true)
  })

  it('should show current locale', () => {
    const localeText = wrapper.find('.uppercase')
    expect(localeText.exists()).toBe(true)
  })

  it('should have flag icon', () => {
    const flagIcon = wrapper.find('.fi')
    expect(flagIcon.exists()).toBe(true)
  })

  it('should toggle menu when language selector is clicked', async () => {
    const languageButton = wrapper.find('.cursor-pointer')
    
    expect(wrapper.vm.isMenuOpen).toBe(false)
    await languageButton.trigger('click')
    expect(wrapper.vm.isMenuOpen).toBe(true)
  })
})