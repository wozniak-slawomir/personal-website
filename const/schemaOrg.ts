export const SCHEMA_EMAIL = 'contact@slawomir-wozniak.pl'
export const SCHEMA_TELEPHONE = '+48571205570'
export const SCHEMA_IMAGE = '/bio/me-bio.png'
export const SCHEMA_NIP = '7011029927'
export const SCHEMA_LOCALITY = 'Poznań'
export const SCHEMA_COUNTRY = 'PL'

export const SCHEMA_SAME_AS = [
  'https://www.linkedin.com/in/wozniak-slawomir',
  'https://www.facebook.com/profile.php?id=61582978407745',
  'https://www.instagram.com/slawomirwozniakofficial/',
  'https://tiktok.com/@slawomirwozniakofficial',
  'https://youtube.com/@SlawomirWozniakOfficial',
] as const

export type FaqItem = {
  question: string
  answer: string
}

export const HOME_FAQ_ITEMS = [
  { question: 'faq.q1.question', answer: 'faq.q1.answer' },
  { question: 'faq.q2.question', answer: 'faq.q2.answer' },
  { question: 'faq.q3.question', answer: 'faq.q3.answer' },
] as const satisfies readonly FaqItem[]

export const WEBSITE_FAQ_ITEMS = [
  { question: 'offer.website.faq.q1.question', answer: 'offer.website.faq.q1.answer' },
  { question: 'offer.website.faq.q2.question', answer: 'offer.website.faq.q2.answer' },
  { question: 'offer.website.faq.q3.question', answer: 'offer.website.faq.q3.answer' },
  { question: 'offer.website.faq.q4.question', answer: 'offer.website.faq.q4.answer' },
  { question: 'offer.website.faq.q5.question', answer: 'offer.website.faq.q5.answer' },
  { question: 'offer.website.faq.q6.question', answer: 'offer.website.faq.q6.answer' },
] as const satisfies readonly FaqItem[]

export type OfferService = {
  path: string
  titleKey: string
  descriptionKey: string
  image: string
  pricePackage?: 'authority' | 'independence' | 'commerce'
  faq?: readonly FaqItem[]
}

export const PAGE_FAQS: Record<string, readonly FaqItem[]> = {
  '/': HOME_FAQ_ITEMS,
}

export const OFFER_SERVICES: readonly OfferService[] = [
  {
    path: '/oferta/strona-internetowa',
    titleKey: 'offer.website.title',
    descriptionKey: 'seo.website.description',
    image: '/services/website.jpg',
    pricePackage: 'authority' as const,
    faq: WEBSITE_FAQ_ITEMS,
  },
  {
    path: '/oferta/prywatna-chmura-nextcloud',
    titleKey: 'offer.privateCloud.title',
    descriptionKey: 'offer.privateCloud.subtitle',
    image: '/services/nextcloud.webp',
    pricePackage: 'independence' as const,
  },
  {
    path: '/oferta/suwerenny-handel',
    titleKey: 'pricing.packages.commerce.title',
    descriptionKey: 'pricing.packages.commerce.subtitle',
    image: '/services/woocommerce.png',
    pricePackage: 'commerce' as const,
  },
  {
    path: '/oferta/platforma-telemedyczna',
    titleKey: 'offer.telemedicine.title',
    descriptionKey: 'seo.telemedicine.description',
    image: '/projects/schnellrezeptlandscape.png',
  },
  {
    path: '/oferta/pozyskiwanie-danych',
    titleKey: 'offer.dataCollection.title',
    descriptionKey: 'seo.dataCollection.description',
    image: '/services/data-collection.svg',
  },
  {
    path: '/oferta/seo-techniczne',
    titleKey: 'offer.technicalSeo.title',
    descriptionKey: 'seo.technicalSeo.description',
    image: '/services/technical-seo.jpg',
  },
]
