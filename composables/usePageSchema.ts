import { DEFAULT_LOCALE } from '~/const/defaultLocale'
import { contentItems } from '~/const/contentItems'
import {
  OFFER_SERVICES,
  PAGE_FAQS,
  SCHEMA_ADDRESS,
  SCHEMA_AREA_SERVED,
  SCHEMA_EMAIL,
  SCHEMA_IMAGE,
  SCHEMA_TELEPHONE,
} from '~/const/schemaOrg'
import { PRICING_PACKAGES } from '~/const/pricing'

function unprefixedPath(path: string, localeCodes: string[]) {
  let normalized = path.endsWith('/') && path !== '/' ? path.slice(0, -1) : path
  for (const code of localeCodes) {
    if (code === DEFAULT_LOCALE) continue
    if (normalized === `/${code}`) return '/'
    if (normalized.startsWith(`/${code}/`)) {
      normalized = normalized.slice(code.length + 1)
      break
    }
  }
  return normalized
}

type SchemaWebPageType = 'AboutPage' | 'CollectionPage' | 'ProfilePage' | 'ItemPage' | 'FAQPage'

function webPageType(types: SchemaWebPageType[]) {
  if (types.length === 0) return undefined
  return types.length === 1 ? types[0] : types
}

export function usePageSchema() {
  const route = useRoute()
  const localePath = useLocalePath()
  const { t, locales } = useI18n()
  const localeCodes = (locales.value as Array<{ code: string }>).map(item => item.code)
  const path = unprefixedPath(route.path, localeCodes)

  const siteUrl = String(useSiteConfig().url || 'https://slawomir-wozniak.pl').replace(/\/$/, '')
  const identityId = `${siteUrl}/#identity`
  const personName = t('seo.ogSiteName')
  const personDescription = t('seo.homepage.description')
  const jobTitle = t('schema.jobTitle')
  const homeLabel = t('schema.home')
  const offerCopy = OFFER_SERVICES.map(service => ({
    ...service,
    name: t(service.titleKey),
    details: t(service.descriptionKey),
  }))

  const labels: Record<string, string> = {
    '/oferta': t('navbar.offer'),
    '/oferta/strona-internetowa': t('offer.website.title'),
    '/oferta/prywatna-chmura-nextcloud': t('offer.privateCloud.title'),
    '/oferta/sklep-internetowy': t('pricing.packages.commerce.title'),
    '/oferta/platforma-telemedyczna': t('offer.telemedicine.title'),
    '/oferta/pozyskiwanie-danych': t('offer.dataCollection.title'),
    '/oferta/seo-techniczne': t('offer.technicalSeo.title'),
    '/blog': t('navbar.blog'),
    '/bio': t('navbar.bio'),
    '/portfolio': t('navbar.portfolio'),
    '/wizja': t('navbar.vision'),
    '/contact': t('common.contact'),
    '/narzedzia': t('navbar.tools'),
    '/narzedzia/kalkulator': t('tools.calculator.title'),
    '/narzedzia/ankieta': t('schema.survey'),
    '/kalkulator-subskrypcji': t('schema.subscriptionCalculator'),
    '/audyt-subskrypcji': t('schema.subscriptionAudit'),
    '/feedback': t('schema.feedback'),
  }

  updateSiteConfig({
    name: personName,
  })

  const pageTypes: Record<string, 'AboutPage' | 'CollectionPage' | 'ProfilePage'> = {
    '/bio': 'ProfilePage',
    '/wizja': 'AboutPage',
    '/blog': 'CollectionPage',
    '/portfolio': 'CollectionPage',
    '/oferta': 'CollectionPage',
    '/narzedzia': 'CollectionPage',
  }

  const offer = offerCopy.find(service => service.path === path)
  const faqItems = offer?.faq ?? PAGE_FAQS[path]

  const nodes: any[] = [
    definePerson({
      name: personName,
      description: personDescription,
      jobTitle,
      email: SCHEMA_EMAIL,
      telephone: SCHEMA_TELEPHONE,
      address: SCHEMA_ADDRESS,
      areaServed: [...SCHEMA_AREA_SERVED],
    }),
  ]

  const types: SchemaWebPageType[] = []
  if (pageTypes[path]) types.push(pageTypes[path])
  if (offer) types.push('ItemPage')
  if (faqItems?.length) types.push('FAQPage')

  const schemaPageType = webPageType(types)
  if (schemaPageType) {
    nodes.push(defineWebPage({ '@type': schemaPageType }))
  }

  if (path !== '/') {
    const segments = path.split('/').filter(Boolean)
    const crumbs: Array<{ name: string, item?: string }> = [
      { name: homeLabel, item: localePath('/') },
    ]
    let builtPath = ''
    segments.forEach((segment, index) => {
      builtPath += `/${segment}`
      const isLast = index === segments.length - 1
      const blogItem = contentItems.find(item => item.link === builtPath)
      const blogName = blogItem
        ? (typeof blogItem.name === 'function' ? blogItem.name(t) : blogItem.name)
        : segment.replace(/-/g, ' ')
      crumbs.push({
        name: labels[builtPath] || String(blogName),
        ...(isLast ? {} : { item: localePath(builtPath) }),
      })
    })
    nodes.push(defineBreadcrumb({ itemListElement: crumbs }))
  }

  faqItems?.forEach((item) => {
    nodes.push(defineQuestion({
      name: t(item.question),
      acceptedAnswer: t(item.answer),
    }))
  })

  if (path.startsWith('/blog/') && path !== '/blog') {
    const post = contentItems.find(item => item.link === path)
    const headline = post
      ? (typeof post.name === 'function' ? post.name(t) : post.name)
      : undefined
    const description = post?.description
      ? (typeof post.description === 'function' ? post.description(t) : post.description)
      : undefined
    const image = post?.image
      ? (post.image.startsWith('/') ? post.image : `/${post.image}`)
      : SCHEMA_IMAGE

    nodes.push(defineArticle({
      '@type': 'BlogPosting',
      headline,
      description,
      datePublished: post?.lastmod,
      dateModified: post?.lastmod,
      image,
      author: { '@id': '#identity' },
      publisher: { '@id': '#identity' },
    }))
  }

  if (offer) {
    const price = 'pricePackage' in offer && offer.pricePackage
      ? PRICING_PACKAGES[offer.pricePackage]
      : undefined

    nodes.push({
      '@type': 'Service',
      name: offer.name,
      description: offer.details,
      image: offer.image,
      provider: { '@id': identityId },
      areaServed: [...SCHEMA_AREA_SERVED],
      ...(price
        ? {
            offers: defineOffer({
              price: price.price,
              priceCurrency: price.currency,
              availability: 'https://schema.org/InStock',
              priceSpecification: {
                '@type': 'UnitPriceSpecification',
                price: price.price,
                priceCurrency: price.currency,
                valueAddedTaxIncluded: false,
              },
            }),
          }
        : {}),
    })
  }

  if (path === '/oferta') {
    nodes.push(defineItemList({
      itemListElement: offerCopy.map((service, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: service.name,
        url: `${siteUrl}${localePath(service.path)}`,
      })),
    }))
  }

  useSchemaOrg(nodes)
}
