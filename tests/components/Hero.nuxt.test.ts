import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/vue'
import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import Hero from '~/components/Hero.vue'

const { mockT, mockEvent } = vi.hoisted(() => ({
  mockT: vi.fn((key: string) => `translated_${key}`),
  mockEvent: vi.fn(),
}))

mockNuxtImport('useNuxtApp', () => {
  return () => ({ $event: mockEvent })
})

mockNuxtImport('useI18n', () => {
  return () => ({ t: mockT, locale: { value: 'en' } })
})

vi.mock('@phosphor-icons/vue', () => ({
  PhCheckCircle: { name: 'PhCheckCircle', template: '<div class="ph-check-circle">✓</div>', props: ['size'] },
}))

describe('Hero.vue', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  const renderHero = () =>
    render(Hero, {
      global: {
        stubs: {
          NuxtLink: { template: '<a :href="to"><slot /></a>', props: ['to'] },
          NuxtImg: { template: '<img :src="src" :alt="alt" />', props: ['src', 'alt', 'width', 'height'] },
          PhCheckCircle: { template: '<div class="ph-check-circle">✓</div>' },
        },
        mocks: { $t: mockT },
      },
    })

  it('renders container and headings', () => {
    const { container } = renderHero()
    expect(container.querySelector('.container')).not.toBeNull()
    const headings = screen.getAllByRole('heading', { level: 2 }).map(h => h.textContent || '').join(' ')
    expect(headings).toMatch(/CODE|MIND/)
  })

  it('has navigation links to code and mind', () => {
    renderHero()
    const links = screen.getAllByRole('link')
    const hrefs = links.map(l => l.getAttribute('href'))
    expect(hrefs).toContain('/code')
    expect(hrefs).toContain('/mind')
  })

  it('emits contact event on button click', async () => {
    renderHero()
    const btns = screen.getAllByRole('button')
    expect(btns.length).toBeGreaterThan(0)
    await fireEvent.click(btns[0])
    expect(mockEvent).toHaveBeenCalledWith('ContactModal:Open')
  })

  it('uses translations', () => {
    renderHero()
    expect(mockT).toHaveBeenCalled()
  })
})
