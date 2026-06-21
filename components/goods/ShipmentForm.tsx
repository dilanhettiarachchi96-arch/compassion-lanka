'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { submitShipment } from '@/actions/shipments';

const schema = z.object({
  senderName: z.string().min(2, 'Name is required'),
  senderEmail: z.string().email('Valid email required'),
  senderCountry: z.string().min(1, 'Country is required'),
  contentsDescription: z.string().min(10, 'Please describe contents'),
  estimatedWeightKg: z.number().min(0.1).max(25),
  trackingNumber: z.string().optional(),
  notes: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const countries = [
  'Australia', 'Canada', 'Germany', 'India', 'Japan', 'Malaysia',
  'New Zealand', 'Singapore', 'Sri Lanka', 'United Kingdom', 'United States',
];

export function ShipmentForm() {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormData) {
    const result = await submitShipment(data);
    if (result.success) {
      toast.success('Shipment registered! We will email you a confirmation.');
      reset();
    } else {
      toast.error('Something went wrong. Please try again.');
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="senderName">Sender Name</Label>
          <Input id="senderName" {...register('senderName')} />
          {errors.senderName && (
            <p className="mt-1 text-sm text-destructive">{errors.senderName.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="senderEmail">Email</Label>
          <Input id="senderEmail" type="email" {...register('senderEmail')} />
          {errors.senderEmail && (
            <p className="mt-1 text-sm text-destructive">{errors.senderEmail.message}</p>
          )}
        </div>
      </div>
      <div>
        <Label>Country</Label>
        <Select onValueChange={(v) => setValue('senderCountry', v as string)}>
          <SelectTrigger>
            <SelectValue placeholder="Select country" />
          </SelectTrigger>
          <SelectContent>
            {countries.map((c) => (
              <SelectItem key={c} value={c}>{c}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.senderCountry && (
          <p className="mt-1 text-sm text-destructive">{errors.senderCountry.message}</p>
        )}
      </div>
      <div>
        <Label htmlFor="contentsDescription">Estimated Contents</Label>
        <Textarea id="contentsDescription" rows={3} {...register('contentsDescription')} />
        {errors.contentsDescription && (
          <p className="mt-1 text-sm text-destructive">{errors.contentsDescription.message}</p>
        )}
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="estimatedWeightKg">Estimated Weight (kg)</Label>
          <Input id="estimatedWeightKg" type="number" step="0.1" {...register('estimatedWeightKg', { valueAsNumber: true })} />
          {errors.estimatedWeightKg && (
            <p className="mt-1 text-sm text-destructive">{errors.estimatedWeightKg.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="trackingNumber">Tracking Number (optional)</Label>
          <Input id="trackingNumber" {...register('trackingNumber')} />
        </div>
      </div>
      <div>
        <Label htmlFor="notes">Notes (optional)</Label>
        <Textarea id="notes" rows={2} {...register('notes')} />
      </div>
      <Button type="submit" disabled={isSubmitting} className="bg-primary text-white">
        {isSubmitting ? 'Registering…' : 'Register Shipment'}
      </Button>
    </form>
  );
}
