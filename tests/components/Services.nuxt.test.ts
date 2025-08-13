import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen } from '@testing-library/vue'
import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import Services from '~/components/Services.vue'

const { mockT } = vi.hoisted(() => ({
  mockT: vi.fn((key: string) => {
    const translations: Record<string, string> = {
      'services.services': 'SERVICES',
      'services.development.title': 'Website Development',
      'services.development.description': 'Professional website development services',
      'services.development.price': 'from 3000 PLN',
      'services.development.points1': 'Responsive design',
      'services.development.points2': 'SEO optimization',
      'services.development.points3': 'Fast performance',
      'services.coaching.title': 'Psychology Coaching', 
      'services.coaching.description': 'Professional coaching services',
      'services.coaching.price': 'from 200 PLN',
      'services.coaching.points1': 'Individual sessions',
      'services.coaching.points2': 'Goal achievement',
      'services.coaching.points3': 'Personal growth',
      'services.audits.title': 'Technical Audits',
      'services.audits.description': 'Code and performance audits',
      'services.audits.price': 'from 1000 PLN',
      'services.audits.points1': 'Code review',
      'services.audits.points2': 'Performance analysis',
      'services.audits.points3': 'Security assessment',
    }
    return translations[key] || key
  }),
}))

mockNuxtImport('useI18n', () => {
  return () => ({ t: mockT })
})

describe('Services.vue', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  const renderServices = () =>
    render(Services, {
      global: {
        stubs: {
          CardContainer: { 
            template: '<div class="card-container"><slot /></div>', 
          },
          CardBody: { 
            template: '<div class="card-body"><slot /></div>', 
          },
          CardItem: { 
            template: '<div class="card-item"><slot /></div>', 
          },
        },
        mocks: { $t: mockT },
      },
    })

  it('renders the services heading', () => {
    renderServices()
    
    const heading = screen.getByRole('heading', { level: 2 })
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveTextContent('SERVICES')
  })

  it('renders service cards in a grid layout', () => {
    const { container } = renderServices()
    
    expect(container.querySelector('.grid')).toBeInTheDocument()
    expect(container.querySelectorAll('.card-container')).toHaveLength(3)
  })

  it('displays website development service', () => {
    renderServices()
    
    expect(screen.getByText('Website Development')).toBeInTheDocument()
    expect(screen.getByText('Professional website development services')).toBeInTheDocument()
    expect(screen.getByText('from 3000 PLN')).toBeInTheDocument()
    expect(screen.getByText('Responsive design')).toBeInTheDocument()
    expect(screen.getByText('SEO optimization')).toBeInTheDocument()
    expect(screen.getByText('Fast performance')).toBeInTheDocument()
  })

  it('displays psychology coaching service', () => {
    renderServices()
    
    expect(screen.getByText('Psychology Coaching')).toBeInTheDocument()
    expect(screen.getByText('Professional coaching services')).toBeInTheDocument()
    expect(screen.getByText('from 200 PLN')).toBeInTheDocument()
    expect(screen.getByText('Individual sessions')).toBeInTheDocument()
    expect(screen.getByText('Goal achievement')).toBeInTheDocument()
    expect(screen.getByText('Personal growth')).toBeInTheDocument()
  })

  it('displays technical audits service', () => {
    renderServices()
    
    expect(screen.getByText('Technical Audits')).toBeInTheDocument()
    expect(screen.getByText('Code and performance audits')).toBeInTheDocument()
    expect(screen.getByText('from 1000 PLN')).toBeInTheDocument()
    expect(screen.getByText('Code review')).toBeInTheDocument()
    expect(screen.getByText('Performance analysis')).toBeInTheDocument()
    expect(screen.getByText('Security assessment')).toBeInTheDocument()
  })

  it('renders service images', () => {
    const { container } = renderServices()
    
    const images = container.querySelectorAll('img')
    expect(images.length).toBe(3)
    
    images.forEach(img => {
      expect(img).toHaveAttribute('alt', 'thumbnail')
    })
  })
})
