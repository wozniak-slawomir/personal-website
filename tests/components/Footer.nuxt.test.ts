import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen } from '@testing-library/vue'
import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import Footer from '~/components/Footer.vue'

const { mockT } = vi.hoisted(() => ({
  mockT: vi.fn((key: string) => {
    const translations: Record<string, string> = {
      'alt.slawomir': 'Slawomir',
      'footer.poland': 'Poland',
      'footer.partners': 'Partners',
    }
    return translations[key] || key
  }),
}))

mockNuxtImport('useNuxtApp', () => {
  return () => ({})
})

describe('Footer.vue', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  const renderFooter = () =>
    render(Footer, {
      global: {
        mocks: { $t: mockT },
        stubs: {
          // Provide minimal stubs to keep accessibility semantics for queries
          NuxtImg: {
            template: '<img :src="src" :alt="alt" />',
            props: ['src', 'alt'],
          },
          NuxtLink: {
            template: '<a :href="to" :target="target"><slot /></a>',
            props: ['to', 'target'],
          },
        },
      },
    })

  it('renders the logo image with translated alt text', () => {
    renderFooter()

    const logo = screen.getByRole('img', { name: 'Slawomir' })
    expect(logo).toBeInTheDocument()
  })

  it('renders social links with correct accessible names and hrefs', () => {
    renderFooter()

    expect(screen.getByRole('link', { name: 'Linkedin link' })).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/slawek-wozniak/',
    )
    expect(screen.getByRole('link', { name: 'Github link' })).toHaveAttribute(
      'href',
      'https://github.com/wozniak-slawomir',
    )
    expect(screen.getByRole('link', { name: 'Mail link' })).toHaveAttribute(
      'href',
      'mailto:contact@slawomir-wozniak.pl',
    )
    expect(screen.getByRole('link', { name: 'Instagram link' })).toHaveAttribute(
      'href',
      'https://www.instagram.com/slawomirwozniakofficial/',
    )
    expect(screen.getByRole('link', { name: 'Phone link' })).toHaveAttribute(
      'href',
      'tel:+48571205570',
    )
  })

  it('shows location with translated country', () => {
    renderFooter()

    expect(screen.getByText('Swarzędz 62-020 Poland')).toBeInTheDocument()
  })

  it('renders partners section and partner link', () => {
    renderFooter()

    expect(screen.getByText('Partners')).toBeInTheDocument()

    const partnerLink = screen.getByRole('link', { name: /piotr chojankowski/i })
    expect(partnerLink).toBeInTheDocument()
    expect(partnerLink).toHaveAttribute('href', 'https://www.piotrchojankowski.pl')
  })

  it('displays the current year', () => {
    renderFooter()

    const year = new Date().getFullYear()
    expect(screen.getByText(new RegExp(`©\\s*${year}`))).toBeInTheDocument()
  })
})
