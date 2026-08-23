export type ServiceLinkVariant = 'website' | 'seo' | 'cloud'

export interface BlogServiceLink {
  path: string
  variant: ServiceLinkVariant
}

export const DEFAULT_BLOG_SERVICE_LINK: BlogServiceLink = {
  path: '/oferta/strona-internetowa',
  variant: 'website',
}

export const BLOG_SERVICE_LINK_EXCEPTIONS: Record<string, BlogServiceLink> = {
  '/blog/google-search-console': {
    path: '/oferta/seo-techniczne',
    variant: 'seo',
  },
  '/blog/pulapka-vendor-lock-in': {
    path: '/oferta/prywatna-chmura-nextcloud',
    variant: 'cloud',
  },
  '/blog/niestabilne-usa-niestabilna-technologia': {
    path: '/oferta/prywatna-chmura-nextcloud',
    variant: 'cloud',
  },
}

export const SERVICE_LINK_I18N: Record<ServiceLinkVariant, { before: string, label: string, after: string }> = {
  website: {
    before: 'blog.serviceLink.website.before',
    label: 'blog.serviceLink.website.label',
    after: 'blog.serviceLink.website.after',
  },
  seo: {
    before: 'blog.serviceLink.seo.before',
    label: 'blog.serviceLink.seo.label',
    after: 'blog.serviceLink.seo.after',
  },
  cloud: {
    before: 'blog.serviceLink.cloud.before',
    label: 'blog.serviceLink.cloud.label',
    after: 'blog.serviceLink.cloud.after',
  },
}

export function unprefixedContentPath(path: string) {
  let normalized = path.endsWith('/') && path !== '/' ? path.slice(0, -1) : path
  if (normalized === '/en') return '/'
  if (normalized.startsWith('/en/')) normalized = normalized.slice(3)
  return normalized
}

export function getBlogServiceLink(path: string): BlogServiceLink {
  const unprefixed = unprefixedContentPath(path)
  return BLOG_SERVICE_LINK_EXCEPTIONS[unprefixed] ?? DEFAULT_BLOG_SERVICE_LINK
}
