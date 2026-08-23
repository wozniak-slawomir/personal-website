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

function offerFaq(prefix: string, count = 6): FaqItem[] {
  return Array.from({ length: count }, (_, index) => ({
    question: `${prefix}.faq.q${index + 1}.question`,
    answer: `${prefix}.faq.q${index + 1}.answer`,
  }))
}

export const HOME_FAQ_ITEMS = [
  { question: 'faq.q1.question', answer: 'faq.q1.answer' },
  { question: 'faq.q2.question', answer: 'faq.q2.answer' },
  { question: 'faq.q3.question', answer: 'faq.q3.answer' },
] as const satisfies readonly FaqItem[]

export const WEBSITE_FAQ_ITEMS = offerFaq('offer.website')
export const PRIVATE_CLOUD_FAQ_ITEMS = offerFaq('offer.privateCloud')
export const COMMERCE_FAQ_ITEMS = offerFaq('offer.commerce')
export const TELEMEDICINE_FAQ_ITEMS = offerFaq('offer.telemedicine')
export const DATA_COLLECTION_FAQ_ITEMS = offerFaq('offer.dataCollection')
export const TECHNICAL_SEO_FAQ_ITEMS = offerFaq('offer.technicalSeo')

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
    descriptionKey: 'seo.privateCloud.description',
    image: '/services/nextcloud.webp',
    pricePackage: 'independence' as const,
    faq: PRIVATE_CLOUD_FAQ_ITEMS,
  },
  {
    path: '/oferta/sklep-internetowy',
    titleKey: 'pricing.packages.commerce.title',
    descriptionKey: 'seo.commerce.description',
    image: '/services/woocommerce.png',
    pricePackage: 'commerce' as const,
    faq: COMMERCE_FAQ_ITEMS,
  },
  {
    path: '/oferta/platforma-telemedyczna',
    titleKey: 'offer.telemedicine.title',
    descriptionKey: 'seo.telemedicine.description',
    image: '/projects/schnellrezeptlandscape.png',
    faq: TELEMEDICINE_FAQ_ITEMS,
  },
  {
    path: '/oferta/pozyskiwanie-danych',
    titleKey: 'offer.dataCollection.title',
    descriptionKey: 'seo.dataCollection.description',
    image: '/services/data-collection.svg',
    faq: DATA_COLLECTION_FAQ_ITEMS,
  },
  {
    path: '/oferta/seo-techniczne',
    titleKey: 'offer.technicalSeo.title',
    descriptionKey: 'seo.technicalSeo.description',
    image: '/services/technical-seo.jpg',
    faq: TECHNICAL_SEO_FAQ_ITEMS,
  },
]
