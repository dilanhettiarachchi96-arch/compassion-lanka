'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { formatCurrency } from '@/lib/format';
import { cn } from '@/lib/utils';
import { submitDonation } from '@/actions/donations';

const PRESET_AMOUNTS = [500, 1000, 2500, 5000] as const;

interface DonationFormProps {
  campaignTitle: string;
  campaignId?: string;
  className?: string;
}

export function DonationForm({ campaignTitle, campaignId, className }: DonationFormProps) {
  const [selectedAmount, setSelectedAmount] = useState<number>(1000);
  const [customAmount, setCustomAmount] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const amount = customAmount ? Number(customAmount) : selectedAmount;

  async function handleDonate(e: React.FormEvent) {
    e.preventDefault();

    if (!amount || amount < 100) {
      toast.error('Please enter a valid donation amount (minimum LKR 100).');
      return;
    }

    if (!isAnonymous && (!name.trim() || !email.trim())) {
      toast.error('Please enter your name and email, or donate anonymously.');
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await submitDonation({
        campaignId,
        donorName: name,
        donorEmail: email,
        amount,
        paymentMethod: 'card',
        isAnonymous,
        message,
      });

      if (result.success) {
        toast.success(
          `Thank you! Your donation of ${formatCurrency(amount)} to "${campaignTitle}" has been received.`
        );
        if (result.checkoutUrl) {
          window.open(result.checkoutUrl, '_blank');
        }
        // Reset form
        setSelectedAmount(1000);
        setCustomAmount('');
        setName('');
        setEmail('');
        setMessage('');
        setIsAnonymous(false);
      } else {
        toast.error(result.message ?? 'Something went wrong. Please try again.');
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card className={cn('shadow-lg', className)}>
      <CardHeader>
        <CardTitle className="font-[family-name:var(--font-dm-serif)] text-xl">
          Support This Campaign
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleDonate} className="space-y-5">
          <fieldset className="space-y-2">
            <legend className="text-sm font-medium">Select amount (LKR)</legend>
            <div className="grid grid-cols-2 gap-2">
              {PRESET_AMOUNTS.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => {
                    setSelectedAmount(preset);
                    setCustomAmount('');
                  }}
                  className={cn(
                    'rounded-lg border px-3 py-2 text-sm font-medium transition-colors',
                    selectedAmount === preset && !customAmount
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border hover:border-primary/50'
                  )}
                >
                  {formatCurrency(preset)}
                </button>
              ))}
            </div>
            <Input
              type="number"
              min={100}
              placeholder="Custom amount (LKR)"
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
              aria-label="Custom donation amount"
            />
          </fieldset>

          <div className="space-y-2">
            <Label htmlFor="donor-name">Your name</Label>
            <Input
              id="donor-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full name"
              disabled={isAnonymous || isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="donor-email">Email</Label>
            <Input
              id="donor-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              disabled={isAnonymous || isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="donor-message">Message (optional)</Label>
            <Textarea
              id="donor-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Leave a message of support..."
              rows={3}
              disabled={isSubmitting}
            />
          </div>

          <label className="flex cursor-pointer items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={isAnonymous}
              onChange={(e) => setIsAnonymous(e.target.checked)}
              className="size-4 rounded border-input accent-primary"
              disabled={isSubmitting}
            />
            Donate anonymously
          </label>

          <Button
            type="submit"
            size="lg"
            className="w-full bg-[var(--color-accent)] text-[var(--color-primary)] hover:bg-[var(--color-accent)]/90"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Processing...' : 'Donate Now'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
