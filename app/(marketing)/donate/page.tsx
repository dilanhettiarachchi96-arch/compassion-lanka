'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { Info } from 'lucide-react';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { submitDonation } from '@/actions/donations';
import { convertAmount, formatCurrency, CURRENCY_RATES } from '@/lib/format';
import type { PaymentMethod } from '@/types';

const amounts = [500, 1000, 2500, 5000, 10000];
const currencies = Object.keys(CURRENCY_RATES);

const schema = z.object({
  donorName: z.string().min(2),
  donorEmail: z.string().email(),
  country: z.string().min(1),
  message: z.string().optional(),
  isAnonymous: z.boolean(),
});

type FormData = z.infer<typeof schema>;

export default function DonatePage() {
  const [currency, setCurrency] = useState('LKR');
  const [amount, setAmount] = useState(2500);
  const [customAmount, setCustomAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');

  const { register, handleSubmit, formState: { isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { isAnonymous: false, country: 'Sri Lanka' },
  });

  const displayAmount = customAmount ? Number(customAmount) : amount;
  const converted = convertAmount(displayAmount, currency);

  async function onSubmit(data: FormData) {
    const result = await submitDonation({
      ...data,
      amount: displayAmount,
      paymentMethod,
    });
    if (result.success) {
      toast.success('Thank you! Your donation has been recorded.');
      if (result.checkoutUrl) window.open(result.checkoutUrl, '_blank');
    } else {
      toast.error(result.message ?? 'Something went wrong. Please try again.');
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <SectionHeader
        eyebrow="Donate"
        title="Make a Difference Today"
        description="Your gift provides clothing, meals, medicine, and education to children who need it most."
      />

      <div className="mt-8 flex flex-wrap gap-2">
        {currencies.map((c) => (
          <Button
            key={c}
            type="button"
            variant={currency === c ? 'default' : 'outline'}
            size="sm"
            onClick={() => setCurrency(c)}
            className={currency === c ? 'bg-primary text-white' : ''}
          >
            {c}
          </Button>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {amounts.map((a) => (
          <Button
            key={a}
            type="button"
            variant={amount === a && !customAmount ? 'default' : 'outline'}
            onClick={() => { setAmount(a); setCustomAmount(''); }}
            className={amount === a && !customAmount ? 'bg-accent text-primary' : ''}
          >
            {formatCurrency(convertAmount(a, currency), currency)}
          </Button>
        ))}
        <Input
          type="number"
          placeholder="Custom"
          value={customAmount}
          onChange={(e) => setCustomAmount(e.target.value)}
          className="w-28"
        />
      </div>

      <p className="mt-2 text-sm text-muted-foreground">
        Payment processed in LKR · Display: {formatCurrency(converted, currency)}
      </p>

      <Tabs value={paymentMethod} onValueChange={(v) => setPaymentMethod(v as PaymentMethod)} className="mt-8">
        <TabsList>
          <TabsTrigger value="card">Card (Stripe)</TabsTrigger>
          <TabsTrigger value="payhere">PayHere</TabsTrigger>
          <TabsTrigger value="bank_transfer">Bank Transfer</TabsTrigger>
        </TabsList>
        <TabsContent value="card" className="mt-4">
          <p className="text-sm text-muted-foreground">Secure payment via Stripe.</p>
        </TabsContent>
        <TabsContent value="payhere" className="mt-4">
          <Card className="rounded-2xl">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-12 w-24 items-center justify-center rounded bg-primary text-sm font-bold text-white">
                PayHere
              </div>
              <p className="text-sm text-muted-foreground">Sri Lanka&apos;s trusted payment gateway.</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="bank_transfer" className="mt-4">
          <Card className="rounded-2xl">
            <CardContent className="p-6 text-sm">
              <p><strong>Bank:</strong> Bank of Ceylon</p>
              <p><strong>Account Name:</strong> Compassion Lanka Foundation</p>
              <p><strong>Account No:</strong> 1234567890</p>
              <p><strong>Branch:</strong> Colombo 07</p>
              <p><strong>Swift Code:</strong> BCEYLKLX</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="donorName">Name</Label>
            <Input id="donorName" {...register('donorName')} />
          </div>
          <div>
            <Label htmlFor="donorEmail">Email</Label>
            <Input id="donorEmail" type="email" {...register('donorEmail')} />
          </div>
        </div>
        <div>
          <Label htmlFor="country">Country</Label>
          <Input id="country" {...register('country')} />
        </div>
        <div>
          <Label htmlFor="message">Message (optional)</Label>
          <Textarea id="message" rows={3} {...register('message')} />
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" {...register('isAnonymous')} />
          Donate anonymously
        </label>

        <Badge variant="outline" className="flex w-fit items-center gap-1">
          <Info className="h-3 w-3" aria-hidden />
          Your donation is tax deductible under Section 32C
        </Badge>

        <Button type="submit" disabled={isSubmitting} className="w-full bg-accent text-primary hover:bg-accent/90">
          {paymentMethod === 'card' ? 'Proceed to Secure Payment' : 'Donate Now'}
        </Button>
      </form>
    </div>
  );
}
