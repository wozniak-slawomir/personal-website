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

export const OFFER_SERVICES = [
  {
    path: '/oferta/strona-internetowa',
    titleKey: 'offer.website.title',
    descriptionKey: 'seo.website.description',
    image: '/services/website.jpg',
    pricePackage: 'authority' as const,
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
] as const
