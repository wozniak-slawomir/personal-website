export interface ContentItem {
  name: string | ((t: (key: string) => string) => string);
  image: string;
  description?: string | ((t: (key: string) => string) => string);
  tags: string[];
  link: string;
  lastmod?: string;
}

export const contentItems: ContentItem[] = [
  {
    name: 'hiszpanbet',
    image: 'projects/hiszpanbet.png',
    description: (t) => t('projects.hiszpanbet'),
    tags: ['portfolio'],
    link: 'https://www.hiszpanbet.pl',
  },
  {
    name: 'nimbleninja.pl',
    image: 'projects/nimbleninja.png',
    tags: ['portfolio'],
    description: (t) => t('projects.nimbleninja'),
    link: 'https://nimbleninja.pl',
  },
  {
    name: 'PiotrChojankowski.pl',
    image: 'projects/piotrchojankowski.png',
    description: (t) => t('projects.piotrchojankowski'),
    tags: ['portfolio'],
    link: 'https://www.piotrchojankowski.pl',
  },
  {
    name: (t) => t('blog.edducamp2024.title'),
    image: 'blog/edducamp/interview.png',
    description: (t) => t('blog.edducamp2024.intro1') + ' ' + t('blog.edducamp2024.intro2'),
    tags: ['blog'],
    link: '/blog/edducamp2024',
    lastmod: '2025-11-09T12:45:47+01:00'
  },
  {
    name: (t) => t('projects.blog.higherEducation'),
    image: 'projects/blog/higher-education.jpg',
    tags: ['blog'],
    link: '/blog/higher-education',
    lastmod: '2025-11-09T12:45:47+01:00'
  },
  {
    name: 'eccdna.pl',
    image: 'projects/eccdna.png',
    tags: ['portfolio'],
    description: (t) => t('projects.eccdna'),
    link: 'https://eccdna.pl',
  },
  {
    name: 'Mirecc Database',
    image: 'projects/mirecc-dna.png',
    tags: ['portfolio'],
    description: (t) => t('projects.mirecc'),
    link: 'https://mirecc.platinum.edu.pl/',
  },
  {
    name: (t) => t('blog.socialLearningTheory.title'),
    image: 'projects/blog/social-learning-theory.png',
    tags: ['blog'],
    link: '/blog/social-learning-theory',
    lastmod: '2025-08-22T11:39:22+02:00'
  },
  {
    name: 'eduspotpro.pl',
    image: 'projects/eduspotpro.png',
    tags: ['portfolio'],
    description: (t) => t('projects.eduspotpro'),
    link: 'https://eduspotpro.pl',
  },
  {
    name: 'nkowalczyk-coaching.com',
    image: 'projects/nkowalczyk.png',
    tags: ['portfolio'],
    description: (t) => t('projects.nkowalczyk'),
    link: 'https://nkowalczyk-coaching.com',
  },
  {
    name: (t) => t('blog.value.title'),
    image: 'projects/blog/value.jpg',
    tags: ['blog'],
    link: '/blog/value',
    lastmod: '2025-08-22T13:54:52+02:00'
  },
  {
    name: (t) => t('blog.changesOnProfile.title'),
    image: 'blog/zmiany-na-profilu/see-you-later.png',
    description: (t) => t('blog.changesOnProfile.meta.description'),
    tags: ['blog'],
    link: '/blog/zmiany-na-profilu',
    lastmod: '2025-11-09T13:03:31+01:00'
  },
  {
    name: (t) => t('blog.technologyPartner.title'),
    image: 'blog/technologia-wrog-czy-partner/frustration.jpg',
    description: (t) => t('blog.technologyPartner.meta.description'),
    tags: ['blog'],
    link: '/blog/technologia-wrog-czy-partner',
    lastmod: '2025-11-15T23:08:52+01:00'
  },
  {
    name: (t) => t('blog.meetingThatCouldBeVideo.title'),
    image: 'blog/spotkanie-ktore-moglo-byc-wideo/meeting.jpg',
    description: (t) => t('blog.meetingThatCouldBeVideo.meta.description'),
    tags: ['blog'],
    link: '/blog/spotkanie-ktore-moglo-byc-wideo',
    lastmod: '2025-11-23T15:12:57+01:00'
  },
  {
    name: (t) => t('blog.aiStrateg.title'),
    image: 'blog/ai-strateg/chess.jpg',
    description: (t) => t('blog.aiStrateg.meta.description'),
    tags: ['blog'],
    link: '/blog/ai-strateg',
    lastmod: '2025-11-29T21:56:02+01:00'
  },
  {
    name: (t) => t('blog.gift.title'),
    image: 'blog/prezent-ktorego-nie-da-sie-kupic/og-image.jpg',
    description: (t) => t('blog.gift.meta.description'),
    tags: ['blog'],
    link: '/blog/prezent-ktorego-nie-da-sie-kupic',
    lastmod: '2025-12-07T19:07:10+01:00'
  },
  {
    name: (t) => t('blog.professionalWebsite.title'),
    image: 'blog/profesjonalna-strona-www/og-image.jpg',
    description: (t) => t('blog.professionalWebsite.meta.description'),
    tags: ['blog'],
    link: '/blog/profesjonalna-strona-www',
    lastmod: '2025-12-28T17:55:00+01:00'
  },
  {
    name: (t) => t('blog.vendorLockIn.title'),
    image: 'blog/pulapka-vendor-lock-in/og-image.jpg',
    description: (t) => t('blog.vendorLockIn.meta.description'),
    tags: ['blog'],
    link: '/blog/pulapka-vendor-lock-in',
    lastmod: '2025-12-28T18:34:00+01:00'
  },
  {
    name: (t) => t('blog.needWebsite.title'),
    image: 'blog/czy-potrzebujesz-strony/og-image.jpg',
    description: (t) => t('blog.needWebsite.meta.description'),
    tags: ['blog'],
    link: '/blog/czy-potrzebujesz-strony',
    lastmod: '2026-01-03T13:08:00+01:00'
  },
  {
    name: (t) => t('blog.googleSearchConsole.title'),
    image: 'blog/google-search-console/og-image.jpg',
    description: (t) => t('blog.googleSearchConsole.meta.description'),
    tags: ['blog'],
    link: '/blog/google-search-console',
    lastmod: '2026-01-11T12:00:00+01:00'
  },
  {
    name: (t) => t('blog.unstableUSA.title'),
    image: 'blog/niestabilne-usa-niestabilna-technologia/libre_office.png',
    description: (t) => t('blog.unstableUSA.meta.description'),
    tags: ['blog'],
    link: '/blog/niestabilne-usa-niestabilna-technologia',
    lastmod: '2026-01-19T23:54:00+01:00'
  },
  {
    name: 'MyDr',
    image: 'projects/mydr.png',
    description: (t) => t('projects.mydr'),
    tags: ['portfolio'],
    link: 'https://mydr.pl',
  },
  {
    name: 'Tebra Care Connect',
    image: 'projects/tebra care connect freemium.png',
    description: (t) => t('projects.tebra'),
    tags: ['portfolio'],
    link: 'https://www.tebra.com/care/join',
  },
  {
    name: (t) => t('blog.persuasionPsychology.title'),
    image: 'blog/psychologia-perswazji/og-image.png',
    description: (t) => t('blog.persuasionPsychology.meta.description'),
    tags: ['blog'],
    link: '/blog/psychologia-perswazji',
    lastmod: '2026-02-01T17:10:00+01:00'
  },
  {
    name: (t) => t('blog.openclaw.title'),
    image: 'blog/openclaw/openclaw.png',
    description: (t) => t('blog.openclaw.meta.description'),
    tags: ['blog'],
    link: '/blog/openclaw',
    lastmod: '2026-02-26T16:18:00+01:00'
  }
]
