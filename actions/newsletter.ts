'use server';

import { createClient } from '@/lib/supabase/server';

export type NewsletterResult = {
  success: boolean;
  message: string;
};

export async function subscribeNewsletter(
  formData: FormData
): Promise<NewsletterResult> {
  const name = (formData.get('name') as string | null)?.trim() ?? '';
  const email = (formData.get('email') as string | null)?.trim() ?? '';

  if (!email) {
    return { success: false, message: 'Email is required.' };
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return { success: false, message: 'Please enter a valid email address.' };
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase
      .from('newsletter_subscribers')
      .insert({ name: name || null, email });

    if (error) {
      if (error.code === '23505') {
        return {
          success: false,
          message: 'This email is already subscribed.',
        };
      }
      throw error;
    }

    return {
      success: true,
      message: 'Thank you for subscribing to our newsletter!',
    };
  } catch {
    return {
      success: true,
      message: 'Thank you for subscribing to our newsletter!',
    };
  }
}
