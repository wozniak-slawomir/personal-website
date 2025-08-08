// @vitest-environment nuxt
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen } from '@testing-library/vue'
import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import Services from '~/components/Services.vue'

// Hoisted mocks
const { mockT } = vi.hoisted(() => ({
  mockT: vi.fn((key: string) => `translated_${key}`),
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
          // 3D card components are visual only; stub to avoid transitions
          CardContainer: { template: '<div class="card-container"><slot /></div>' },
          CardBody: { template: '<div class="card-body"><slot /></div>' },
          CardItem: { template: '<div class="card-item"><slot /></div>' },
        },
        mocks: { $t: mockT },
      },
    })

  it('renders container and heading', () => {
    const { container } = renderServices()
    expect(container.querySelector('.container')).not.toBeNull()
    const h2 = screen.getByRole('heading', { level: 2 })
    expect(h2).toBeTruthy()
    expect(mockT).toHaveBeenCalledWith('services.services')
  })

  it('renders grid of service cards', () => {
    const { container } = renderServices()
    expect(container.querySelector('.grid')).not.toBeNull()
    expect(container.querySelectorAll('.card-container').length).toBeGreaterThan(0)
  })

  it('uses translations for service details', () => {
    renderServices()
    expect(mockT).toHaveBeenCalledWith('services.development.title')
    expect(mockT).toHaveBeenCalledWith('services.development.description')
    expect(mockT).toHaveBeenCalledWith('services.development.price')
  })
})
