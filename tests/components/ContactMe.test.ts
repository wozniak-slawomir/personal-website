import { mount } from '@vue/test-utils'
import ContactMe from '~/components/ContactMe.vue'

describe('ContactMe.vue', () => {
  let wrapper: any
  let mockT: jest.Mock
  let mockEvent: jest.Mock

  beforeEach(() => {
    mockT = jest.fn((key: string) => key)
    mockEvent = jest.fn()

    wrapper = mount(ContactMe, {
      global: {
        mocks: {
          $t: mockT,
          useNuxtApp: () => ({
            $event: mockEvent
          })
        },
        provide: {
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

  it('should display heading text', () => {
    expect(mockT).toHaveBeenCalledWith('services.interested')
    const heading = wrapper.find('h2')
    expect(heading.exists()).toBe(true)
  })

  it('should have contact button', () => {
    const button = wrapper.find('button')
    expect(button.exists()).toBe(true)
    expect(mockT).toHaveBeenCalledWith('common.contact')
  })

  it('should have proper button styling', () => {
    const button = wrapper.find('button')
    expect(button.classes()).toContain('px-8')
    expect(button.classes()).toContain('py-5')
    expect(button.classes()).toContain('rounded-full')
  })
})