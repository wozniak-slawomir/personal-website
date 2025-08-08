// @vitest-environment nuxt
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/vue'
import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import Bio from '~/components/Bio.vue'

const { mockT } = vi.hoisted(() => ({
  mockT: vi.fn((key: string) => {
    const translations: Record<string, string> = {
      'bio.title.programming': 'BIO',
      'bio.title.psychology': 'BIO',
      'bio.menu.story': 'STORY',
      'bio.menu.career': 'CAREER',
      'bio.menu.achievements': 'ACHIEVEMENTS',
      'bio.menu.personal.life': 'PERSONAL LIFE',
      'bio.menu.skills': 'SKILLS',
      'bio.achievements.programming1': 'Achievement 1',
      'bio.achievements.programming2': 'Achievement 2',
      'bio.achievements.programming3': 'Achievement 3',
      'bio.achievements.programming4': 'Achievement 4',
      'bio.achievements.programming5': 'Achievement 5',
      'bio.achievements.psychology1': 'Psychology Achievement 1',
      'bio.achievements.psychology2': 'Psychology Achievement 2',
      'bio.achievements.psychology3': 'Psychology Achievement 3',
      'alt.spain': 'Spain photo',
      'alt.book': 'Book photo',
      'alt.dog': 'Photo with dog',
      'alt.friends': 'Photo with friends',
      'alt.bodybuilding': 'Bodybuilding photo',
      'alt.boxing': 'Boxing photo',
      'alt.workstation': 'Workstation photo',
      'alt.travel': 'Travel photo',
    }
    return translations[key] || key
  }),
}))

mockNuxtImport('useI18n', () => {
  return () => ({
    t: mockT,
  })
})

describe('Bio.vue', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  const renderBio = (props?: Record<string, unknown>) =>
    render(Bio, {
      props,
      global: {
        stubs: {
          // Stub heavy/nuxt components
          NuxtImg: {
            template: '<img :src="src" :alt="alt" />',
            props: ['src', 'alt', 'width', 'height'],
          },
          MorphingTabs: {
            name: 'MorphingTabs',
            props: ['tabs', 'activeTab'],
            emits: ['update:active-tab'],
            template: '<div data-testid="morphing-tabs" class="morphing-tabs" @click="$emit(\'update:active-tab\', tabs?.[1]?.key)" />',
          },
          CareerTimeline: { template: '<div data-testid="career-timeline" class="career-timeline" />' },
        },
        mocks: { $t: mockT },
      },
    })

  it('renders the bio heading with correct title', () => {
    renderBio({ mode: 'programming' })
    
    const heading = screen.getByRole('heading', { level: 2 })
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveTextContent('BIO')
    expect(mockT).toHaveBeenCalledWith('bio.title.programming')
  })

  it('renders different title for psychology mode', () => {
    renderBio({ mode: 'psychology' })
    
    const heading = screen.getByRole('heading', { level: 2 })
    expect(heading).toHaveTextContent('BIO')
    expect(mockT).toHaveBeenCalledWith('bio.title.psychology')
  })

  it('renders MorphingTabs component with correct props', () => {
    renderBio({ mode: 'programming' })
    
    const morphingTabs = screen.getByTestId('morphing-tabs')
    expect(morphingTabs).toBeInTheDocument()
  })

  it('switches to achievements section when MorphingTabs emits update', async () => {
    const { container } = renderBio({ mode: 'programming' })
    
    // Initially achievements list should not be visible
    expect(container.querySelector('ul.list-disc')).toBeNull()

    // Simulate tab change to achievements
    await fireEvent.click(screen.getByTestId('morphing-tabs'))

    // Now achievements list should be visible
    expect(container.querySelector('ul.list-disc')).toBeInTheDocument()
  })

  it('renders psychology-specific tabs without career and skills', () => {
    renderBio({ mode: 'psychology' })
    
    // Should call basic tabs
    expect(mockT).toHaveBeenCalledWith('bio.menu.story')
    expect(mockT).toHaveBeenCalledWith('bio.menu.achievements')
    expect(mockT).toHaveBeenCalledWith('bio.menu.personal.life')
    
    // Should not call programming-specific tabs
    expect(mockT).not.toHaveBeenCalledWith('bio.menu.career')
    expect(mockT).not.toHaveBeenCalledWith('bio.menu.skills')
  })

  it('renders proper image alt texts for accessibility', () => {
    const { container } = renderBio({ mode: 'programming' })
    
    const spainImg = container.querySelector('img[alt="Spain photo"]')
    const bookImg = container.querySelector('img[alt="Book photo"]')
    
    expect(spainImg).toBeInTheDocument()
    expect(bookImg).toBeInTheDocument()
  })
})