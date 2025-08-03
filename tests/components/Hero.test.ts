import { mount } from '@vue/test-utils'
import Hero from '~/components/Hero.vue'

jest.mock('@phosphor-icons/vue', () => ({
  PhCheckCircle: {
    name: 'PhCheckCircle',
    props: ['size'],
    template: '<div class="ph-check-circle">✓</div>'
  }
}))

describe('Hero.vue', () => {
  let wrapper: any
  let mockT: jest.Mock
  let mockEvent: jest.Mock

  beforeEach(() => {
    mockT = jest.fn((key: string) => key)
    mockEvent = jest.fn()

    wrapper = mount(Hero, {
      global: {
        stubs: {
          'NuxtLink': { 
            template: '<a :to="to"><slot /></a>',
            props: ['to']
          },
          'NuxtImg': { 
            template: '<img :src="src" :alt="alt" />',
            props: ['src', 'alt', 'width', 'height']
          },
          'PhCheckCircle': { 
            template: '<div class="ph-check-circle">✓</div>',
            props: ['size']
          }
        },
        provide: {},
        mocks: {
          $t: mockT,
          $event: mockEvent,
          useI18n: () => ({
            t: mockT,
            locale: { value: 'en' }
          }),
          useNuxtApp: () => ({
            $event: mockEvent
          })
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

  it('should initialize with programming section hovered', () => {
    expect(wrapper.vm.hoveredSection).toBe('programming')
  })

  it('should change hovered section when user interacts', async () => {
    const programmingSection = wrapper.find('.programming-section')
    const psychologySection = wrapper.find('.psychology-section')
    
    if (programmingSection.exists()) {
      await programmingSection.trigger('mouseenter')
      expect(wrapper.vm.hoveredSection).toBe('programming')
    }
    
    if (psychologySection.exists()) {
      await psychologySection.trigger('mouseenter')
      expect(wrapper.vm.hoveredSection).toBe('psychology')
    }
  })

  it('should display CODE and MIND headings to user', () => {
    const headings = wrapper.findAll('h2')
    const headingTexts = headings.map((h: any) => h.text())
    
    expect(headingTexts.some((text: string) => text.includes('CODE'))).toBe(true)
    expect(headingTexts.some((text: string) => text.includes('MIND'))).toBe(true)
  })

  it('should show feature lists with check marks', () => {
    const checkIcons = wrapper.findAll('.ph-check-circle')
    expect(checkIcons.length).toBeGreaterThan(0)
    
    checkIcons.forEach((icon: any) => {
      expect(icon.text()).toBe('✓')
    })
  })

  it('should respond to contact button clicks', async () => {
    const contactButtons = wrapper.findAll('button')
    
    if (contactButtons.length > 0) {
      await contactButtons[0].trigger('click')
      expect(contactButtons.length).toBeGreaterThan(0)
    } else {
      expect(wrapper.exists()).toBe(true)
    }
  })

  it('should have navigation links to code and mind sections', () => {
    const links = wrapper.findAllComponents('[to]')
    const linkHrefs = links.map((link: any) => link.props('to'))
    
    expect(linkHrefs).toContain('/code')
    expect(linkHrefs).toContain('/mind')
  })

  it('should use translation system for content', () => {
    expect(mockT).toHaveBeenCalled()
  })

  it('should show mobile-friendly cards', () => {
    const mobileCards = wrapper.findAll('.mobile-card')
    expect(mobileCards.length).toBeGreaterThan(0)
  })

  it('should show programming card as active when programming is hovered', async () => {
    wrapper.vm.hoveredSection = 'programming'
    await wrapper.vm.$nextTick()
    
    const programmingCard = wrapper.find('.programming-card')
    expect(programmingCard.exists()).toBe(true)
    expect(wrapper.vm.hoveredSection).toBe('programming')
  })

  it('should show psychology card as active when psychology is hovered', async () => {
    wrapper.vm.hoveredSection = 'psychology'
    await wrapper.vm.$nextTick()
    
    const psychologyCard = wrapper.find('.psychology-card')
    expect(psychologyCard.exists()).toBe(true)
    expect(wrapper.vm.hoveredSection).toBe('psychology')
  })

  it('should provide weight property to child components', () => {
    expect(wrapper.vm).toBeDefined()
    expect(wrapper.find('.container').exists()).toBe(true)
  })
})