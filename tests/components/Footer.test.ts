import { mount } from '@vue/test-utils'

const MockFooter = {
  template: `
    <footer class="container py-10 !mt-32 text-gray-300">
      <div class="flex justify-between items-center flex-col lg:flex-row gap-5">
        <img
          src="/logo.png"
          alt="Slawomir logo"
          class="max-w-[400px] w-full lg:h-[30px]"
          width="400"
          height="30"
        />
        <div class="flex gap-5 text-white">
          <a
            href="https://www.linkedin.com/in/slawek-wozniak/"
            aria-label="Linkedin link"
            target="_blank"
          >
            <div class="ph-linkedin-logo h-12" />
          </a>
          <a
            href="https://github.com/wozniak-slawomir"
            aria-label="Github link"
            target="_blank"
          >
            <div class="ph-github-logo h-12" />
          </a>
          <a
            href="mailto:contact@slawomir-wozniak.pl"
            aria-label="Mail link"
            target="_blank"
          >
            <div class="ph-envelope-simple h-12" />
          </a>
          <a
            href="https://www.instagram.com/slawomirwozniakofficial/"
            aria-label="Instagram link"
            target="_blank"
          >
            <div class="ph-instagram-logo h-12" />
          </a>
        </div>
      </div>
    </footer>
  `
}

describe('Footer.vue', () => {
  let wrapper: any
  let mockT: jest.Mock

  beforeEach(() => {
    mockT = jest.fn((key: string) => key)

    wrapper = mount(MockFooter, {
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
    expect(wrapper.find('footer').exists()).toBe(true)
  })

  it('should display logo', () => {
    const logo = wrapper.find('img')
    expect(logo.exists()).toBe(true)
    expect(logo.attributes('src')).toBe('/logo.png')
  })

  it('should have social media links', () => {
    const links = wrapper.findAll('a')
    expect(links.length).toBe(4)
    
    const linkedinLink = links.find(link => link.attributes('href')?.includes('linkedin'))
    const githubLink = links.find(link => link.attributes('href')?.includes('github'))
    const emailLink = links.find(link => link.attributes('href')?.includes('mailto'))
    const instagramLink = links.find(link => link.attributes('href')?.includes('instagram'))
    
    expect(linkedinLink).toBeTruthy()
    expect(githubLink).toBeTruthy()
    expect(emailLink).toBeTruthy()
    expect(instagramLink).toBeTruthy()
  })

  it('should have correct aria labels for accessibility', () => {
    const links = wrapper.findAll('a')
    
    links.forEach(link => {
      expect(link.attributes('aria-label')).toBeDefined()
      expect(link.attributes('target')).toBe('_blank')
    })
  })

  it('should display social media icons', () => {
    expect(wrapper.find('.ph-linkedin-logo').exists()).toBe(true)
    expect(wrapper.find('.ph-github-logo').exists()).toBe(true)
    expect(wrapper.find('.ph-envelope-simple').exists()).toBe(true)
    expect(wrapper.find('.ph-instagram-logo').exists()).toBe(true)
  })

  it('should have responsive layout classes', () => {
    const container = wrapper.find('.flex.justify-between')
    expect(container.classes()).toContain('flex-col')
    expect(container.classes()).toContain('lg:flex-row')
  })
})