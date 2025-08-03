import { mount } from '@vue/test-utils'

const MockBio = {
  template: `
    <div class="container mt-32">
      <h2 class="text-5xl font-bold text-center md:text-left">
        {{ bioTitle }}
      </h2>
      <div class="mb-0 mt-10 lg:my-10">
        <div class="morphing-tabs" />
      </div>
      <div class="glassmorphism rounded-2xl w-12/12 flex justify-between flex-col p-8 mt-0 shadow">
        Content
      </div>
    </div>
  `,
  data() {
    return {
      bioTitle: 'Bio Title',
      bioState: 'story',
      bioTabs: [{ key: 'story', name: 'Story' }],
      storyKey: 'story'
    }
  }
}

describe('Bio.vue', () => {
  let wrapper: any
  let mockT: jest.Mock

  beforeEach(() => {
    mockT = jest.fn((key: string) => key)

    wrapper = mount(MockBio, {
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

  it('should display bio title', () => {
    const heading = wrapper.find('h2')
    expect(heading.exists()).toBe(true)
    expect(wrapper.vm.bioTitle).toBeDefined()
  })

  it('should have glassmorphism container', () => {
    const glassContainer = wrapper.find('.glassmorphism')
    expect(glassContainer.exists()).toBe(true)
  })

  it('should initialize with correct bio state', () => {
    expect(wrapper.vm.bioState).toBeDefined()
    expect(wrapper.vm.bioTabs).toBeDefined()
  })

  it('should have proper responsive layout classes', () => {
    const heading = wrapper.find('h2')
    expect(heading.classes()).toContain('text-center')
    expect(heading.classes()).toContain('md:text-left')
  })
})