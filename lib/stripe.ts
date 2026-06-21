import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? 'sk_test_stub', {
  apiVersion: '2026-05-27.dahlia',
});

export function getStripeCheckoutUrl(amount: number): string {
  return `https://checkout.stripe.com/pay/stub?amount=${amount}`;
}
