export function formatCurrency(amount: number, currency = 'LKR'): string {
  if (currency === 'LKR') {
    return `LKR ${amount.toLocaleString('en-LK')}`;
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
  }).format(amount);
}

export function formatCategory(category: string): string {
  return category
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export const CURRENCY_RATES: Record<string, number> = {
  LKR: 1,
  USD: 0.0031,
  GBP: 0.0024,
  AUD: 0.0047,
};

export function convertAmount(amountLKR: number, currency: string): number {
  const rate = CURRENCY_RATES[currency] ?? 1;
  if (currency === 'LKR') return amountLKR;
  return Math.round(amountLKR * rate * 100) / 100;
}
