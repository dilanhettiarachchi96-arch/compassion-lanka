'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import dynamic from 'next/dynamic';
import { Mail, MapPin, Phone } from 'lucide-react';
import { SectionHeader } from '@/components/shared/SectionHeader';
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
import { submitContact } from '@/actions/donations';
import { Skeleton } from '@/components/ui/skeleton';
import { GOODS_ADDRESS } from '@/lib/mock-data';

const ContactMap = dynamic(
  () => import('@/components/contact/ContactMap').then((m) => m.ContactMap),
  { ssr: false, loading: () => <Skeleton className="h-48 w-full rounded-2xl" /> }
);

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(1),
  message: z.string().min(10),
});

type FormData = z.infer<typeof schema>;

const subjects = ['General', 'Partnership', 'Goods Donation', 'Media', 'Volunteer'];

export default function ContactPage() {
  const { register, handleSubmit, setValue, reset, formState: { isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(data: FormData) {
    const result = await submitContact(data);
    if (result.success) {
      toast.success('Message sent! We will get back to you soon.');
      reset();
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <SectionHeader
        eyebrow="Contact"
        title="Get in Touch"
        description="We would love to hear from you — whether you want to donate, partner, or volunteer."
      />

      <div className="mt-12 grid gap-12 lg:grid-cols-2">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" {...register('name')} />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" {...register('email')} />
          </div>
          <div>
            <Label>Subject</Label>
            <Select onValueChange={(v) => setValue('subject', v as string)}>
              <SelectTrigger><SelectValue placeholder="Select subject" /></SelectTrigger>
              <SelectContent>
                {subjects.map((s) => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" rows={5} {...register('message')} />
          </div>
          <Button type="submit" disabled={isSubmitting} className="bg-primary text-white">
            Send Message
          </Button>
        </form>

        <div className="space-y-6">
          <div className="space-y-4 text-sm">
            <p className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
              <span>{GOODS_ADDRESS.name}<br />{GOODS_ADDRESS.line1}<br />{GOODS_ADDRESS.line2}</span>
            </p>
            <p className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-primary" aria-hidden />
              {GOODS_ADDRESS.phone}
            </p>
            <p className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-primary" aria-hidden />
              contact@compassionlanka.org
            </p>
            <a
              href="https://wa.me/94112345678"
              className="inline-block text-sm font-medium text-primary hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Chat on WhatsApp
            </a>
          </div>
          <ContactMap />
        </div>
      </div>
    </div>
  );
}
