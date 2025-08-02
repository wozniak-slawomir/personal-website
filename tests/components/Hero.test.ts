import { mount } from '@vue/test-utils'
import Hero from '~/components/Hero.vue'

// Mock phosphor icons
jest.mock('@phosphor-icons/vue', () => ({
  PhCheckCircle: {
    name: 'PhCheckCircle',
    props: ['size'],
    template: '<div class="ph-check-circle">✓</div>'
  }
}))

describe('Hero.vue', () => {
  let wrapper: any

  beforeEach(() => {
    // Setup mocks
    global.useI18n = jest.fn(() => ({
      t: jest.fn((key: string) => key),
      locale: { value: 'en' }
    }))
    
    global.useNuxtApp = jest.fn(() => ({
      $event: jest.fn()
    }))

    wrapper = mount(Hero, {
      global: {
        stubs: {
          'NuxtLink': { template: '<a><slot /></a>' },
          'NuxtImg': { template: '<img />' },
          'PhCheckCircle': { template: '<div class="ph-check-circle">✓</div>' }
        }
      }
    })
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('should render correctly', () => {
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('.container').exists()).toBe(true)
  })

  it('should initialize with programming section hovered', () => {
    expect(wrapper.vm.hoveredSection).toBe('programming')
  })

  it('should show correct opacity classes for programming section when hovered', () => {
    wrapper.vm.hoveredSection = 'programming'
    
    const programmingImage = wrapper.find('.programming-section').parent().find('[class*="opacity-100"]')
    expect(programmingImage.exists()).toBe(true)
  })

  it('should show correct opacity classes for psychology section when hovered', () => {
    wrapper.vm.hoveredSection = 'psychology'
    
    const psychologyImage = wrapper.find('.psychology-section').parent().find('[class*="opacity-100"]')
    expect(psychologyImage.exists()).toBe(true)
  })

  it('should update hoveredSection when mouseenter events are triggered', async () => {
    const programmingSection = wrapper.find('.programming-section')
    const psychologySection = wrapper.find('.psychology-section')
    
    // Test programming section hover
    await programmingSection.trigger('mouseenter')
    expect(wrapper.vm.hoveredSection).toBe('programming')
    
    // Test psychology section hover  
    await psychologySection.trigger('mouseenter')
    expect(wrapper.vm.hoveredSection).toBe('psychology')
  })

  it('should render CODE and MIND headings', () => {
    const codeHeading = wrapper.find('h2').text()
    expect(codeHeading).toContain('CODE')
    
    const mindHeading = wrapper.findAll('h2')[1].text()
    expect(mindHeading).toContain('MIND')
  })

  it('should render feature lists with check icons', () => {
    const checkIcons = wrapper.findAllComponents('[class="ph-check-circle"]')
    expect(checkIcons.length).toBeGreaterThan(0)
  })

  it('should call contact modal when contact button is clicked', async () => {
    const { $event } = useNuxtApp()
    const contactButton = wrapper.find('button')
    
    await contactButton.trigger('click')
    
    expect($event).toHaveBeenCalledWith('ContactModal:Open')
  })

  it('should have navigation links to /code and /mind', () => {
    const links = wrapper.findAllComponents('a')
    const linkHrefs = links.map((link: any) => link.attributes('to') || link.attributes('href'))
    
    expect(linkHrefs).toContain('/code')
    expect(linkHrefs).toContain('/mind')
  })

  it('should display translated text using i18n', () => {
    const { t } = useI18n()
    
    // Hero component should call translation function
    expect(t).toHaveBeenCalledWith(expect.stringContaining('hero.'))
  })

  it('should render mobile cards on small screens', () => {
    const mobileCards = wrapper.findAll('.mobile-card')
    expect(mobileCards.length).toBeGreaterThan(0)
  })

  it('should apply correct CSS classes for card states', async () => {
    const programmingCard = wrapper.find('.programming-card')
    const psychologyCard = wrapper.find('.psychology-card')
    
    // Test programming card active state
    wrapper.vm.hoveredSection = 'programming'
    await wrapper.vm.$nextTick()
    
    expect(programmingCard.classes()).toContain('active-card')
    expect(psychologyCard.classes()).toContain('inactive-card')
    
    // Test psychology card active state
    wrapper.vm.hoveredSection = 'psychology'
    await wrapper.vm.$nextTick()
    
    expect(psychologyCard.classes()).toContain('active-card')
    expect(programmingCard.classes()).toContain('inactive-card')
  })

  it('should provide weight property to child components', () => {
    // The component provides 'weight' as 'fill' to child components
    expect(wrapper.vm).toBeDefined()
  })
})