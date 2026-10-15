import { normalizeEmail, normalizeName, normalizePhone } from '@/utils/tracking'

type PixelQueue = {
  (...args: unknown[]): void
  q: IArguments[]
}

type Gtag = (...args: unknown[]) => void

declare global {
  interface Window {
    oaiq?: PixelQueue
    gtag?: Gtag
  }
}

interface PageView {
  id: string
  name: string
}

interface LeadIdentifiers {
  email: string
  phone?: string
  firstName: string
  lastName: string
}

function consentApi() {
  return useNuxtApp().$CC as {
    acceptedCategory?: (category: string) => boolean
    validConsent?: () => boolean
  } | undefined
}

function categoryAllowed(category: string) {
  if (!import.meta.client) return false
  return consentApi()?.acceptedCategory?.(category) === true
}

function adsAllowed() {
  return categoryAllowed('ads')
}

function analyticsAllowed() {
  return categoryAllowed('analytics')
}

const GOOGLE_ADS_LEAD_CONVERSION_SEND_TO = 'AW-4487478866/ixNgCPuqxJsdEOCVo-JE'

function trackAnalyticsEvent(eventName: string, params?: Record<string, unknown>) {
  if (!analyticsAllowed() || typeof window.gtag !== 'function') return false
  window.gtag('event', eventName, params)
  return true
}

function trackGoogleAdsLeadConversion() {
  if (!analyticsAllowed() || typeof window.gtag !== 'function') return false
  window.gtag('event', 'conversion', { send_to: GOOGLE_ADS_LEAD_CONVERSION_SEND_TO })
  return true
}

function sync() {
  if (!import.meta.client || !window.oaiq) return
  if (!consentApi()?.validConsent?.()) return
  window.oaiq('consent', adsAllowed())
}

function measure(eventName: string, data: Record<string, unknown>, options?: Record<string, unknown>) {
  if (!adsAllowed() || !window.oaiq) return false
  if (options) window.oaiq('measure', eventName, data, options)
  else window.oaiq('measure', eventName, data)
  return true
}

async function sha256Hex(value: string): Promise<string> {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value))
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('')
}

async function hashedUser(input: LeadIdentifiers) {
  const user: Record<string, string> = {}
  const email = normalizeEmail(input.email)
  const phone = input.phone ? normalizePhone(input.phone) : null
  const firstName = normalizeName(input.firstName)
  const lastName = normalizeName(input.lastName)

  if (email) user.email_sha256 = await sha256Hex(email)
  if (phone) user.phone_number_sha256 = await sha256Hex(phone)
  if (firstName) user.first_name_sha256 = await sha256Hex(firstName)
  if (lastName) user.last_name_sha256 = await sha256Hex(lastName)
  return user
}

export function useTracking() {
  const config = useRuntimeConfig()

  function trackPageView(page: PageView) {
    return measure('page_viewed', {
      type: 'contents',
      contents: [
        {
          id: page.id,
          name: page.name,
          content_type: 'page',
        },
      ],
    })
  }

  async function trackLead(input: LeadIdentifiers) {
    trackAnalyticsEvent('form_submit', {
      form_id: 'contact',
      form_name: 'contact',
    })
    trackGoogleAdsLeadConversion()

    if (!adsAllowed()) return
    const pixelId = config.public.chatgptAdsPixelId
    const user = await hashedUser(input)
    if (pixelId && window.oaiq && Object.keys(user).length > 0) {
      window.oaiq('init', { pixelId, user })
    }
    measure('lead_created', { type: 'customer_action' })
  }

  return {
    allowed: adsAllowed,
    sync,
    trackPageView,
    trackLead,
  }
}
