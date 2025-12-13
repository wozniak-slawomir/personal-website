import { computed } from 'vue'

export const useContentItems = () => {
  const { t } = useI18n()

  const items = computed(() => [
    {
      name: 'hiszpanbet',
      image: 'projects/hiszpanbet.png',
      description: t('projects.hiszpanbet'),
      tags: ['portfolio'],
      link: 'https://www.hiszpanbet.pl',
    },
    {
      name: t('blog.edducamp2024.title'),
      image: 'blog/edducamp/interview.png',
      description: t('blog.edducamp2024.intro1') + ' ' + t('blog.edducamp2024.intro2'),
      tags: ['blog'],
      link: '/blog/edducamp2024',
    },
    {
      name: 'PiotrChojankowski.pl',
      image: 'projects/piotrchojankowski.png',
      description: t('projects.piotrchojankowski'),
      tags: ['portfolio'],
      link: 'https://www.piotrchojankowski.pl',
    },
    {
      name: t('projects.blog.higherEducation'),
      image: 'projects/blog/higher-education.jpg',
      tags: ['blog'],
      link: '/blog/higher-education',
    },
    {
      name: 'eccdna.pl',
      image: 'projects/eccdna.png',
      tags: ['portfolio'],
      description: t('projects.eccdna'),
      link: 'https://eccdna.pl',
    },
    {
      name: 'Mirecc Database',
      image: 'projects/mirecc-dna.png',
      tags: ['portfolio'],
      description: t('projects.mirecc'),
      link: 'https://mirecc.platinum.edu.pl/',
    },
    {
      name: t('blog.socialLearningTheory.title'),
      image: 'projects/blog/social-learning-theory.png',
      tags: ['blog'],
      link: '/blog/social-learning-theory',
    },
    {
      name: 'nimbleninja.pl',
      image: 'projects/nimbleninja.png',
      tags: ['portfolio'],
      description: t('projects.nimbleninja'),
      link: 'https://nimbleninja.pl',
    },
    {
      name: t('blog.value.title'),
      image: 'projects/blog/value.jpg',
      tags: ['blog'],
      link: '/blog/value',
    },
    {
      name: t('blog.changesOnProfile.title'),
      image: 'blog/zmiany-na-profilu/see-you-later.png',
      description: t('blog.changesOnProfile.meta.description'),
      tags: ['blog'],
      link: '/blog/zmiany-na-profilu',
    },
    {
      name: t('blog.technologyPartner.title'),
      image: 'blog/technologia-wrog-czy-partner/frustration.jpg',
      description: t('blog.technologyPartner.meta.description'),
      tags: ['blog'],
      link: '/blog/technologia-wrog-czy-partner',
    },
    {
      name: t('blog.meetingThatCouldBeVideo.title'),
      image: 'blog/spotkanie-ktore-moglo-byc-wideo/meeting.jpg',
      description: t('blog.meetingThatCouldBeVideo.meta.description'),
      tags: ['blog'],
      link: '/blog/spotkanie-ktore-moglo-byc-wideo',
    },
    {
      name: t('blog.aiStrateg.title'),
      image: 'blog/ai-strateg/chess.jpg',
      description: t('blog.aiStrateg.meta.description'),
      tags: ['blog'],
      link: '/blog/ai-strateg',
    },
    {
      name: t('blog.gift.title'),
      image: 'blog/prezent-ktorego-nie-da-sie-kupic/og-image.jpg',
      description: t('blog.gift.meta.description'),
      tags: ['blog'],
      link: '/blog/prezent-ktorego-nie-da-sie-kupic',
    },
  ])

  return {
    items
  }
}
