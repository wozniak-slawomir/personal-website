export const CURRENCY_RATES = {
  USD: 4.00,
  EUR: 4.30,
  PLN: 1.00,
} as const;

export type Currency = keyof typeof CURRENCY_RATES;

export function convertToPLN(amount: number, currency: Currency | string): number {
  const rate = CURRENCY_RATES[currency as Currency] || 1.00;
  return amount * rate;
}

export function formatCurrency(amount: number, currency: Currency | string = 'PLN'): string {
  return new Intl.NumberFormat('pl-PL', { 
    style: 'currency', 
    currency: currency,
    maximumFractionDigits: 0 
  }).format(amount);
}
