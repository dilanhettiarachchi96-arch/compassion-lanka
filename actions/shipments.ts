'use server';

import { createClient } from '@/lib/supabase/server';
import { sendEmail } from '@/lib/resend';

export async function submitShipment(formData: {
  senderName: string;
  senderEmail: string;
  senderCountry: string;
  contentsDescription: string;
  estimatedWeightKg: number;
  trackingNumber?: string;
  notes?: string;
}) {
  try {
    const supabase = await createClient();
    const { error } = await supabase.from('goods_shipments').insert({
      sender_name: formData.senderName,
      sender_email: formData.senderEmail,
      sender_country: formData.senderCountry,
      contents_description: formData.contentsDescription,
      estimated_weight_kg: formData.estimatedWeightKg,
      tracking_number: formData.trackingNumber || null,
      notes: formData.notes || null,
      status: 'registered',
    });

    if (error) throw error;

    // A failure to send the confirmation email should not hide a successful insert.
    try {
      await sendEmail({
        to: formData.senderEmail,
        subject: 'Shipment Registered — Compassion Lanka',
        html: `<p>Dear ${formData.senderName},</p><p>Thank you for registering your goods shipment. We will notify you when it is received.</p>`,
      });
    } catch (emailErr) {
      console.warn('[submitShipment] confirmation email failed:', emailErr);
    }

    return { success: true };
  } catch (err) {
    console.error('[submitShipment] insert failed:', err);
    return {
      success: false,
      message: 'We could not register your shipment. Please try again.',
    };
  }
}
