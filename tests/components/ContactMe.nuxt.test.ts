import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/vue'
import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import ContactMe from '~/components/ContactMe.vue'

const { mockT, mockEvent } = vi.hoisted(() => ({
  mockT: vi.fn((key: string) => {
    const translations: Record<string, string> = {
      'services.interested': 'Interested in working together?',
      'common.contact': 'Contact me',
    }
    return translations[key] || key
  }),
  mockEvent: vi.fn(),
}))

mockNuxtImport('useNuxtApp', () => {
  return () => ({ $event: mockEvent })
})

describe('ContactMe.vue', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  const renderContactMe = () =>
    render(ContactMe, {
      global: {
        mocks: { $t: mockT },
      },
    })

  it('renders the call-to-action heading with correct text', () => {
    renderContactMe()
    
    const heading = screen.getByRole('heading', { level: 2 })
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveTextContent('Interested in working together?')
  })

  it('renders the contact button with accessible name', () => {
    renderContactMe()
    
    const contactButton = screen.getByRole('button', { name: 'Contact me' })
    expect(contactButton).toBeInTheDocument()
  })

  it('opens contact modal when contact button is clicked', async () => {
    renderContactMe()
    
    const contactButton = screen.getByRole('button', { name: 'Contact me' })
    await fireEvent.click(contactButton)
    
    expect(mockEvent).toHaveBeenCalledWith('ContactModal:Open')
    expect(mockEvent).toHaveBeenCalledTimes(1)
  })

  it('has proper accessibility structure', () => {
    renderContactMe()
    
    const heading = screen.getByRole('heading', { level: 2 })
    const button = screen.getByRole('button')
    
    expect(heading).toBeInTheDocument()
    expect(button).toBeInTheDocument()
    
    expect(button).toHaveAccessibleName('Contact me')
  })
})
