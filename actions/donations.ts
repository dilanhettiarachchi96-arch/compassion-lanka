'use server';

import { createClient } from '@/lib/supabase/server';
import { getStripeCheckoutUrl } from '@/lib/stripe';
import type { PaymentMethod } from '@/types';

export async function submitDonation(formData: {
  campaignId?: string;
  donorName: string;
  donorEmail: string;
  amount: number;
  paymentMethod: PaymentMethod;
  isAnonymous: boolean;
  message?: string;
}) {
  try {
    const supabase = await createClient();
    const { error } = await supabase.from('donations').insert({
      campaign_id: formData.campaignId || null,
      donor_name: formData.donorName,
      donor_email: formData.donorEmail,
      amount: formData.amount,
      currency: 'LKR',
      payment_method: formData.paymentMethod,
      is_anonymous: formData.isAnonymous,
      message: formData.message || null,
      status: 'pending',
    });

    if (error) throw error;

    if (formData.paymentMethod === 'card') {
      return { success: true, checkoutUrl: getStripeCheckoutUrl(formData.amount) };
    }

    return { success: true };
  } catch (err) {
    console.error('[submitDonation] insert failed:', err);
    return {
      success: false,
      message: 'We could not record your donation. Please try again.',
    };
  }
}

export async function submitContact(formData: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  try {
    const { sendEmail } = await import('@/lib/resend');
    await sendEmail({
      to: 'contact@compassionlanka.org',
      subject: `[Contact] ${formData.subject}`,
      html: `<p>From: ${formData.name} (${formData.email})</p><p>${formData.message}</p>`,
    });
    return { success: true };
  } catch (err) {
    console.error('[submitContact] email send failed:', err);
    return {
      success: false,
      message: 'We could not send your message. Please try again.',
    };
  }
}
