export interface PricingPackage {
  key: string
  price: number
  currency: string
  schemaType: string
  originalPrice?: number
  highlighted?: boolean
  period?: string
}

export const PRICING_PACKAGES: Record<'authority' | 'independence' | 'commerce' | 'partnership', PricingPackage> = {
  authority: {
    key: 'authority',
    price: 3500,
    currency: 'PLN',
    schemaType: 'Service',
  },
  independence: {
    key: 'independence',
    price: 5500,
    originalPrice: 9000,
    currency: 'PLN',
    schemaType: 'Product',
    highlighted: true,
  },
  commerce: {
    key: 'commerce',
    price: 6000,
    currency: 'PLN',
    schemaType: 'Service',
  },
  partnership: {
    key: 'partnership',
    price: 4500,
    currency: 'PLN',
    schemaType: 'Service',
    period: 'month',
  },
}
